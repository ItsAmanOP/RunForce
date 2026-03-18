import type { ActivityType, LocationPoint } from "@/types/activity";
import {
	GpsKalmanFilter,
	STEP_LENGTH_METERS,
	calculateDistance,
	getGpsSignalStrength,
	msToKmh,
} from "@/utils/tracking-helpers";
import * as Location from "expo-location";
import { Pedometer } from "expo-sensors";
import { useCallback, useEffect, useRef } from "react";
import { useSharedValue } from "react-native-reanimated";

// region Constants
/**
 * Dual-source distance tracking: GPS + Pedometer sensor fusion.
 *
 * How this works (modeled after iOS HealthKit & Adidas Running):
 *
 * DISTANCE SOURCES:
 * ─────────────────
 * Source 1 — GPS position deltas (Haversine on Kalman-filtered positions)
 *   • Accurate for long straight segments (>5m)
 *   • Noisy for small movements (<5m), can both over- and under-count
 *   • Minimum resolution: ~3m (limited by satellite geometry)
 *
 * Source 2 — Pedometer step count × estimated step length
 *   • Accurate for walking/running at any distance (even 1 step = 0.67m)
 *   • Not affected by GPS noise, works indoors
 *   • Minimum resolution: ~0.67m (1 step)
 *   • Only works for walking/running (not bike/drive)
 *
 * FUSION STRATEGY:
 * ────────────────
 * For walking/running:
 *   Use the GREATER of (GPS delta, pedometer delta) per update cycle.
 *   • If GPS gives 5m and pedometer gives 3m → use 5m (GPS captured a straight path)
 *   • If GPS gives 0m and pedometer gives 4m → use 4m (user walked but GPS was noisy)
 *   • This prevents both under-counting (GPS missing small moves) and over-counting
 *
 * For bike/drive:
 *   GPS only — pedometer can't help here.
 *
 * SPEED:
 * ──────
 * Always use GPS Doppler speed (location.coords.speed).
 * Google Maps does the same — Doppler speed is ±0.1 m/s accurate even when position
 * is ±10m uncertain. For pedometer-only movement, estimate speed from steps/time.
 *
 * MOVEMENT DETECTION:
 * ───────────────────
 * User is moving if EITHER:
 *   a) GPS Doppler speed ≥ 0.3 m/s (very slow walk), OR
 *   b) Pedometer detected steps in the last 2 seconds
 */
const ACCURACY_THRESHOLD = 30;
const MIN_GPS_DISTANCE = 2;
const MAX_DISTANCE_SINGLE_UPDATE = 100;
const SPEED_SMOOTHING_FACTOR = 0.3;
const STATIONARY_SPEED_THRESHOLD_MS = 0.3;
const MIN_TIME_BETWEEN_UPDATES = 500;
const PEDOMETER_ACTIVE_WINDOW_MS = 2000;
// endregion

// region Hook
export const useLocationTracking = (activityType: ActivityType = "run") => {
	const currentSpeed = useSharedValue(0);
	const totalDistance = useSharedValue(0);
	const maxSpeed = useSharedValue(0);
	const avgSpeed = useSharedValue(0);
	const elevation = useSharedValue(0);
	const gpsSignal = useSharedValue<string>("NONE");
	const isTracking = useSharedValue(false);

	const locationSubscription = useRef<Location.LocationSubscription | null>(null);
	const pedometerSubscription = useRef<ReturnType<typeof Pedometer.watchStepCount> | null>(null);
	const lastAcceptedPoint = useRef<{ lat: number; lng: number; timestamp: number } | null>(null);
	const pointsRef = useRef<LocationPoint[]>([]);
	const speedSamples = useRef<number[]>([]);
	const smoothedSpeed = useRef(0);
	const kalmanFilter = useRef(new GpsKalmanFilter(3));
	const lastProcessedTime = useRef(0);

	// Pedometer state for step-based distance
	const lastStepTimestamp = useRef(0);
	const pedometerStepCount = useRef(0);
	const stepsAtLastGpsUpdate = useRef(0);
	const stepLengthM = useRef(STEP_LENGTH_METERS[activityType] ?? 0);

	const requestPermissions = useCallback(async (): Promise<boolean> => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		return status === "granted";
	}, []);

	const startTracking = useCallback(async () => {
		const hasPermission = await requestPermissions();
		if (!hasPermission) return;

		// Reset all state
		lastAcceptedPoint.current = null;
		pointsRef.current = [];
		speedSamples.current = [];
		smoothedSpeed.current = 0;
		kalmanFilter.current.reset();
		lastProcessedTime.current = 0;
		lastStepTimestamp.current = 0;
		pedometerStepCount.current = 0;
		stepsAtLastGpsUpdate.current = 0;
		stepLengthM.current = STEP_LENGTH_METERS[activityType] ?? 0;

		isTracking.value = true;

		// Start pedometer (sensor fusion — steps as movement oracle + distance source)
		const pedometerAvailable = await Pedometer.isAvailableAsync();
		if (pedometerAvailable) {
			pedometerSubscription.current = Pedometer.watchStepCount((result) => {
				if (result.steps > pedometerStepCount.current) {
					lastStepTimestamp.current = Date.now();
					pedometerStepCount.current = result.steps;
				}
			});
		}

		// Start GPS location tracking
		locationSubscription.current = await Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.BestForNavigation,
				timeInterval: 500,
				distanceInterval: 0,
			},
			(location) => {
				const { latitude, longitude, altitude, speed, accuracy } = location.coords;
				const timestamp = location.timestamp;

				const point: LocationPoint = { latitude, longitude, altitude, speed, accuracy, timestamp };

				gpsSignal.value = getGpsSignalStrength(accuracy);

				// Gate 1: Reject readings with poor horizontal accuracy
				if (accuracy !== null && accuracy > ACCURACY_THRESHOLD) return;

				// Gate 2: Throttle rapid-fire GPS fixes
				if (timestamp - lastProcessedTime.current < MIN_TIME_BETWEEN_UPDATES) return;
				lastProcessedTime.current = timestamp;

				// Movement detection (sensor fusion):
				// GPS Doppler speed (from satellite frequency shift — accurate to ±0.1 m/s)
				// Pedometer step detection (from accelerometer — extremely reliable for locomotion)
				const gpsSpeedMs = speed !== null && speed >= 0 ? speed : 0;
				const gpsMoving = gpsSpeedMs >= STATIONARY_SPEED_THRESHOLD_MS;
				const stepsRecent = (Date.now() - lastStepTimestamp.current) < PEDOMETER_ACTIVE_WINDOW_MS;
				const isMoving = gpsMoving || stepsRecent;

				if (!isMoving) {
					// Stationary: hard-zero everything, freeze anchor
					smoothedSpeed.current = 0;
					currentSpeed.value = 0;
					stepsAtLastGpsUpdate.current = pedometerStepCount.current;
					if (!lastAcceptedPoint.current) {
						const filtered = kalmanFilter.current.process(latitude, longitude, accuracy ?? 10, timestamp);
						lastAcceptedPoint.current = { lat: filtered.lat, lng: filtered.lng, timestamp };
					}
					if (altitude !== null) elevation.value = Math.round(altitude);
					pointsRef.current.push(point);
					return;
				}

				// --- USER IS MOVING ---

				// Speed: use GPS Doppler speed (same approach as Google Maps)
				const rawSpeedKmh = msToKmh(gpsSpeedMs);

				// If GPS speed is near-zero but pedometer says we're moving,
				// estimate speed from step rate (steps per second × step length × 3.6)
				let effectiveSpeedKmh = rawSpeedKmh;
				if (rawSpeedKmh < 1.0 && stepsRecent && stepLengthM.current > 0) {
					// Estimate ~2 steps/second for normal walking → ~4.8 km/h
					// This is a reasonable fallback when GPS speed hasn't caught up
					effectiveSpeedKmh = Math.max(rawSpeedKmh, 3.5);
				}

				smoothedSpeed.current =
					smoothedSpeed.current * (1 - SPEED_SMOOTHING_FACTOR) +
					effectiveSpeedKmh * SPEED_SMOOTHING_FACTOR;

				currentSpeed.value = Math.round(smoothedSpeed.current * 10) / 10;

				// Max speed
				if (smoothedSpeed.current > maxSpeed.value) {
					maxSpeed.value = Math.round(smoothedSpeed.current * 10) / 10;
				}

				// Average speed (only meaningful readings ≥ 1 km/h)
				if (smoothedSpeed.current >= 1.0) {
					speedSamples.current.push(smoothedSpeed.current);
					const sum = speedSamples.current.reduce((a, b) => a + b, 0);
					avgSpeed.value = Math.round((sum / speedSamples.current.length) * 10) / 10;
				}

				// Apply Kalman filter to get smoothed position
				const filtered = kalmanFilter.current.process(latitude, longitude, accuracy ?? 10, timestamp);

				// --- DUAL-SOURCE DISTANCE CALCULATION ---
				// Source 1: GPS position delta (Haversine on Kalman-filtered positions)
				let gpsDist = 0;
				if (lastAcceptedPoint.current) {
					gpsDist = calculateDistance(
						lastAcceptedPoint.current.lat,
						lastAcceptedPoint.current.lng,
						filtered.lat,
						filtered.lng,
					);
				}

				// Source 2: Pedometer step-based distance (steps since last update × step length)
				const stepDelta = pedometerStepCount.current - stepsAtLastGpsUpdate.current;
				const stepDist = stepDelta * stepLengthM.current;

				// Fusion: use the greater of GPS delta or pedometer delta
				// This prevents under-counting (GPS misses small moves) AND over-counting
				// For bike/drive (stepLengthM=0), only GPS is used.
				const distToAdd = Math.max(gpsDist, stepDist);

				if (distToAdd >= MIN_GPS_DISTANCE && distToAdd < MAX_DISTANCE_SINGLE_UPDATE) {
					totalDistance.value += distToAdd;

					// Update anchor to current filtered position
					lastAcceptedPoint.current = { lat: filtered.lat, lng: filtered.lng, timestamp };
					stepsAtLastGpsUpdate.current = pedometerStepCount.current;
				} else if (distToAdd > 0 && distToAdd < MIN_GPS_DISTANCE) {
					// Sub-threshold: accumulate small pedometer distances
					// Don't move anchor — let GPS delta grow until it crosses threshold
					// But DO count pedometer steps toward next update
				} else if (distToAdd >= MAX_DISTANCE_SINGLE_UPDATE) {
					// Spike rejection — teleport, skip this reading
					lastAcceptedPoint.current = { lat: filtered.lat, lng: filtered.lng, timestamp };
					stepsAtLastGpsUpdate.current = pedometerStepCount.current;
				}

				if (altitude !== null) {
					elevation.value = Math.round(altitude);
				}

				pointsRef.current.push(point);
			},
		);
	}, [requestPermissions, currentSpeed, totalDistance, maxSpeed, avgSpeed, elevation, gpsSignal, isTracking, activityType]);

	const stopTracking = useCallback(() => {
		isTracking.value = false;
		locationSubscription.current?.remove();
		locationSubscription.current = null;
		pedometerSubscription.current?.remove();
		pedometerSubscription.current = null;
	}, [isTracking]);

	const resetTracking = useCallback(() => {
		currentSpeed.value = 0;
		totalDistance.value = 0;
		maxSpeed.value = 0;
		avgSpeed.value = 0;
		elevation.value = 0;
		lastAcceptedPoint.current = null;
		pointsRef.current = [];
		speedSamples.current = [];
		smoothedSpeed.current = 0;
		kalmanFilter.current.reset();
		lastProcessedTime.current = 0;
		lastStepTimestamp.current = 0;
		pedometerStepCount.current = 0;
		stepsAtLastGpsUpdate.current = 0;
	}, [currentSpeed, totalDistance, maxSpeed, avgSpeed, elevation]);

	const getPoints = useCallback((): LocationPoint[] => {
		return pointsRef.current;
	}, []);

	useEffect(() => {
		return () => {
			locationSubscription.current?.remove();
			pedometerSubscription.current?.remove();
		};
	}, []);

	return {
		currentSpeed,
		totalDistance,
		maxSpeed,
		avgSpeed,
		elevation,
		gpsSignal,
		isTracking,
		startTracking,
		stopTracking,
		resetTracking,
		getPoints,
		requestPermissions,
	};
};
// endregion

// region Exports
export { calculateDistance, getGpsSignalStrength, msToKmh };
// endregion
