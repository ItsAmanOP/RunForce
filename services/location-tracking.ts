import type { LocationPoint } from "@/types/activity";
import {
    calculateDistance,
    getGpsSignalStrength,
    msToKmh,
} from "@/utils/tracking-helpers";
import * as Location from "expo-location";
import { useCallback, useEffect, useRef } from "react";
import { useSharedValue } from "react-native-reanimated";

// region Constants
const SPEED_SMOOTHING_FACTOR = 0.3;
const MIN_ACCURACY_THRESHOLD = 50;
const MIN_DISTANCE_THRESHOLD = 2;
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
	const lastPoint = useRef<LocationPoint | null>(null);
	const pointsRef = useRef<LocationPoint[]>([]);
	const speedSamples = useRef<number[]>([]);
	const smoothedSpeed = useRef(0);

	const requestPermissions = useCallback(async (): Promise<boolean> => {
		const { status: foreground } =
			await Location.requestForegroundPermissionsAsync();
		if (foreground !== "granted") return false;
		const { status: background } =
			await Location.requestBackgroundPermissionsAsync();
		return background === "granted" || foreground === "granted";
	}, []);

	const startTracking = useCallback(async () => {
		const hasPermission = await requestPermissions();
		if (!hasPermission) return;

		lastPoint.current = null;
		pointsRef.current = [];
		speedSamples.current = [];
		smoothedSpeed.current = 0;

		isTracking.value = true;

		locationSubscription.current = await Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.BestForNavigation,
				timeInterval: 1000,
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

				if (accuracy !== null && accuracy > MIN_ACCURACY_THRESHOLD) return;

				const rawSpeedKmh = speed !== null && speed >= 0 ? msToKmh(speed) : 0;

				smoothedSpeed.current =
					smoothedSpeed.current * (1 - SPEED_SMOOTHING_FACTOR) +
					rawSpeedKmh * SPEED_SMOOTHING_FACTOR;
				currentSpeed.value = Math.round(smoothedSpeed.current * 10) / 10;

				if (smoothedSpeed.current > maxSpeed.value) {
					maxSpeed.value = Math.round(smoothedSpeed.current * 10) / 10;
				}

				speedSamples.current.push(smoothedSpeed.current);
				const avgSpeedVal =
					speedSamples.current.reduce((a, b) => a + b, 0) /
					speedSamples.current.length;
				avgSpeed.value = Math.round(avgSpeedVal * 10) / 10;

				if (lastPoint.current) {
					const dist = calculateDistance(
						lastPoint.current.latitude,
						lastPoint.current.longitude,
						latitude,
						longitude,
					);
					if (dist > MIN_DISTANCE_THRESHOLD && dist < 100) {
						totalDistance.value =
							Math.round((totalDistance.value + dist) * 10) / 10;
					}
				}

				if (altitude !== null) {
					elevation.value = Math.round(altitude);
				}

				lastPoint.current = point;
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
	}, [isTracking]);

	const resetTracking = useCallback(() => {
		currentSpeed.value = 0;
		totalDistance.value = 0;
		maxSpeed.value = 0;
		avgSpeed.value = 0;
		elevation.value = 0;
		lastPoint.current = null;
		pointsRef.current = [];
		speedSamples.current = [];
		smoothedSpeed.current = 0;
	}, [currentSpeed, totalDistance, maxSpeed, avgSpeed, elevation]);

	const getPoints = useCallback((): LocationPoint[] => {
		return pointsRef.current;
	}, []);

	useEffect(() => {
		return () => {
			locationSubscription.current?.remove();
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
