// region Pace & Speed Helpers
export const formatPace = (speedKmh: number): string => {
	"worklet";
	if (speedKmh <= 0) return "--'--\"";
	const paceMinPerKm = 60 / speedKmh;
	const minutes = Math.floor(paceMinPerKm);
	const seconds = Math.round((paceMinPerKm - minutes) * 60);
	return `${minutes}'${seconds.toString().padStart(2, "0")}"`;
};

export const msToKmh = (ms: number): number => {
	"worklet";
	return ms * 3.6;
};

/**
 * Estimated step length in meters per activity type.
 *
 * How native health apps (iOS HealthKit / Android Health Connect) estimate distance:
 * - iOS M-series coprocessor calibrates step length using height + GPS over weeks
 * - Android Health Connect uses TYPE_STEP_COUNTER + stride length estimation
 * - Industry average step lengths (peer-reviewed sports science):
 *   Walking: 0.65–0.75m (avg 0.70m) for average adult
 *   Running: 0.80–1.10m (avg 0.85m) varies with speed
 *   These are conservative — they slightly under-count rather than over-count
 *
 * We use the conservative lower end to avoid inflating distance.
 */
export const STEP_LENGTH_METERS: Record<string, number> = {
	run: 0.82,
	walk: 0.67,
	bike: 0,
	drive: 0,
};

export const calculateDistance = (
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
): number => {
	const R = 6371000;
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLon = ((lon2 - lon1) * Math.PI) / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
};

export const getGpsSignalStrength = (accuracy: number | null): string => {
	"worklet";
	if (accuracy === null) return "NONE";
	if (accuracy <= 10) return "STRONG";
	if (accuracy <= 30) return "MODERATE";
	if (accuracy <= 50) return "WEAK";
	return "NONE";
};
// endregion

// region Kalman Filter
/**
 * GPS Kalman filter for smoothing latitude/longitude positions.
 * Based on the industry-standard approach described in:
 * https://stackoverflow.com/a/15657798
 *
 * The key insight: GPS positions have an "accuracy" (horizontal uncertainty in meters).
 * The Kalman filter uses this accuracy to weight new measurements against the
 * current estimate. High-accuracy readings shift the estimate more; low-accuracy
 * readings shift it less.
 *
 * Q_metres_per_second controls how fast uncertainty grows over time.
 * For walking: Q=3 works well. For running: Q=5. For driving: Q=10+.
 */
export class GpsKalmanFilter {
	private lat = 0;
	private lng = 0;
	private variance = -1;
	private timestampMs = 0;
	private readonly qMetresPerSecond: number;
	private static readonly MIN_ACCURACY = 1;

	constructor(qMetresPerSecond = 3) {
		this.qMetresPerSecond = qMetresPerSecond;
	}

	process(
		latMeasurement: number,
		lngMeasurement: number,
		accuracy: number,
		timestampMs: number,
	): { lat: number; lng: number; accuracy: number } {
		const acc = Math.max(accuracy, GpsKalmanFilter.MIN_ACCURACY);

		if (this.variance < 0) {
			this.timestampMs = timestampMs;
			this.lat = latMeasurement;
			this.lng = lngMeasurement;
			this.variance = acc * acc;
		} else {
			const timeIncMs = timestampMs - this.timestampMs;

			if (timeIncMs > 0) {
				this.variance +=
					(timeIncMs * this.qMetresPerSecond * this.qMetresPerSecond) / 1000;
				this.timestampMs = timestampMs;
			}

			const K = this.variance / (this.variance + acc * acc);
			this.lat += K * (latMeasurement - this.lat);
			this.lng += K * (lngMeasurement - this.lng);
			this.variance = (1 - K) * this.variance;
		}

		return {
			lat: this.lat,
			lng: this.lng,
			accuracy: Math.sqrt(Math.abs(this.variance)),
		};
	}

	reset(): void {
		this.variance = -1;
		this.lat = 0;
		this.lng = 0;
		this.timestampMs = 0;
	}
}
// endregion
