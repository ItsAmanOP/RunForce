import { useCallback, useEffect, useRef } from "react";
import { useSharedValue } from "react-native-reanimated";

// region Hook
export const useStopwatch = () => {
	const elapsed = useSharedValue(0);
	const isRunning = useSharedValue(false);

	const startTimeRef = useRef<number>(0);
	const accumulatedRef = useRef<number>(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const start = useCallback(() => {
		if (isRunning.value) return;
		isRunning.value = true;
		startTimeRef.current = Date.now();

		intervalRef.current = setInterval(() => {
			const now = Date.now();
			elapsed.value = accumulatedRef.current + (now - startTimeRef.current);
		}, 100);
	}, [elapsed, isRunning]);

	const pause = useCallback(() => {
		if (!isRunning.value) return;
		isRunning.value = false;
		accumulatedRef.current = elapsed.value;

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, [elapsed, isRunning]);

	const reset = useCallback(() => {
		isRunning.value = false;
		elapsed.value = 0;
		accumulatedRef.current = 0;
		startTimeRef.current = 0;

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, [elapsed, isRunning]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return { elapsed, isRunning, start, pause, reset };
};
// endregion

// region Helpers
export const formatTime = (ms: number): string => {
	"worklet";
	const totalSeconds = Math.floor(ms / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const formatTimeCompact = (
	ms: number,
): { main: string; fraction: string } => {
	"worklet";
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const centiseconds = Math.floor((ms % 1000) / 10);
	return {
		main: `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
		fraction: `.${centiseconds.toString().padStart(2, "0")}`,
	};
};
// endregion
