import type { LocationPoint } from "@/types/activity";
import {
	GpsKalmanFilter,
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
 * Sensor-fusion GPS tracking with Pedometer movement confirmation.
 *
 * Strategy (how Adidas Running / Strava / OpenTracks work):
 *
 * 1. GPS provides position. Pedometer provides movement truth.
 * 2. Movement is confirmed by EITHER:
 *    a) GPS Doppler speed ≥ 0.5 m/s (1.8 km/h — slow walk), OR
 *    b) Pedometer detects steps in the last 3 seconds (sensor fusion)
 * 3. When NOT moving: zero speed, freeze distance, freeze anchor.
 * 4. When moving: apply Kalman filter, accumulate distance, update speed.
 * 5. Kalman filter smooths GPS position noise; Haversine calculates distance.
 *
 * The pedometer is the key improvement — it uses the phone's accelerometer
 * (hardware-level) to detect walking/running steps. GPS speed can be noisy
 * at low speeds, but the pedometer is extremely reliable for detecting
 * human locomotion. This is exactly what professional apps do.
 */
const ACCURACY_THRESHOLD = 25;
const MIN_DISTANCE_THRESHOLD = 2;
const MAX_DISTANCE_SINGLE_UPDATE = 50;
const SPEED_SMOOTHING_FACTOR = 0.3;
const STATIONARY_SPEED_THRESHOLD_MS = 0.5;
const MIN_TIME_BETWEEN_UPDATES = 500;
const PEDOMETER_ACTIVE_WINDOW_MS = 3000;
// endregion

// region Hook
export const useLocationTracking = () => {
	const currentSpeed = useSharedValue(0);
	const totalDistance = useSharedValue(0);
	const maxSpeed = useSharedValue(0);
	const avgSpeed = useSharedValue(0);
	const elevation = useSharedValue(0);
	const gpsSignal = useSharedValue<string>("NONE");
	const isTracking = useSharedValue(false);

	const locationSubscription = useRef<Location.LocationSubscription | null>(
		null,
	);
	const pedometerSubscription = useRef<ReturnType<
		typeof Pedometer.watchStepCount
	> | null>(null);
	const lastAcceptedPoint = useRef<{
		lat: number;
		lng: number;
		timestamp: number;
	} | null>(null);
	const pointsRef = useRef<LocationPoint[]>([]);
	const speedSamples = useRef<number[]>([]);
	const smoothedSpeed = useRef(0);
	const kalmanFilter = useRef(new GpsKalmanFilter(3));
	const lastProcessedTime = useRef(0);
	const lastStepTimestamp = useRef(0);
	const pedometerStepCount = useRef(0);

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

		isTracking.value = true;

		// Start pedometer (sensor fusion — step detection as movement oracle)
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
				distanceInterval: 1,
			},
			(location) => {
				const { latitude, longitude, altitude, speed, accuracy } =
					location.coords;
				const timestamp = location.timestamp;

				const point: LocationPoint = {
					latitude,
					longitude,
					altitude,
					speed,
					accuracy,
					timestamp,
				};

				gpsSignal.value = getGpsSignalStrength(accuracy);

				// Gate 1: Reject readings with poor horizontal accuracy
				if (accuracy !== null && accuracy > ACCURACY_THRESHOLD) return;

				// Gate 2: Throttle rapid-fire GPS fixes
				if (timestamp - lastProcessedTime.current < MIN_TIME_BETWEEN_UPDATES)
					return;
				lastProcessedTime.current = timestamp;

				// Movement detection via sensor fusion:
				// Source A: GPS Doppler speed (reliable above ~0.5 m/s for walking)
				// Source B: Pedometer steps detected in last 3 seconds
				// If EITHER source says "moving", we trust it.
				const gpsSpeedMs = speed !== null && speed >= 0 ? speed : 0;
				const gpsMoving = gpsSpeedMs >= STATIONARY_SPEED_THRESHOLD_MS;
				const stepsRecent =
					Date.now() - lastStepTimestamp.current < PEDOMETER_ACTIVE_WINDOW_MS;
				const isMoving = gpsMoving || stepsRecent;

				// Speed processing
				if (isMoving) {
					const rawSpeedKmh = msToKmh(gpsSpeedMs);
					smoothedSpeed.current =
						smoothedSpeed.current * (1 - SPEED_SMOOTHING_FACTOR) +
						rawSpeedKmh * SPEED_SMOOTHING_FACTOR;

					// Floor very small residual speed from smoothing when pedometer-only
					if (smoothedSpeed.current < 0.5 && !gpsMoving) {
						smoothedSpeed.current = stepsRecent ? 3.5 : 0;
					}
				} else {
					smoothedSpeed.current = 0;
				}

				currentSpeed.value = Math.round(smoothedSpeed.current * 10) / 10;

				// Max speed — only from confirmed movement
				if (isMoving && smoothedSpeed.current > maxSpeed.value) {
					maxSpeed.value = Math.round(smoothedSpeed.current * 10) / 10;
				}

				// Average speed — only from confirmed movement with meaningful speed
				if (isMoving && smoothedSpeed.current >= 1.0) {
					speedSamples.current.push(smoothedSpeed.current);
					const sum = speedSamples.current.reduce((a, b) => a + b, 0);
					avgSpeed.value =
						Math.round((sum / speedSamples.current.length) * 10) / 10;
				}

				// Apply Kalman filter to get smoothed position
				const filtered = kalmanFilter.current.process(
					latitude,
					longitude,
					accuracy ?? 10,
					timestamp,
				);

				// Distance calculation — ONLY when moving
				if (isMoving && lastAcceptedPoint.current) {
					const dist = calculateDistance(
						lastAcceptedPoint.current.lat,
						lastAcceptedPoint.current.lng,
						filtered.lat,
						filtered.lng,
					);

					if (
						dist >= MIN_DISTANCE_THRESHOLD &&
						dist < MAX_DISTANCE_SINGLE_UPDATE
					) {
						totalDistance.value += dist;
					}
				}

				// Anchor point management:
				// Shift anchor when moving. Freeze when stationary.
				if (isMoving) {
					lastAcceptedPoint.current = {
						lat: filtered.lat,
						lng: filtered.lng,
						timestamp,
					};
				} else if (!lastAcceptedPoint.current) {
					// Set initial anchor from first accurate reading
					lastAcceptedPoint.current = {
						lat: filtered.lat,
						lng: filtered.lng,
						timestamp,
					};
				}

				if (altitude !== null) {
					elevation.value = Math.round(altitude);
				}

				pointsRef.current.push(point);
			},
		);
	}, [
		requestPermissions,
		currentSpeed,
		totalDistance,
		maxSpeed,
		avgSpeed,
		elevation,
		gpsSignal,
		isTracking,
	]);

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
