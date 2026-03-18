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

export const calculateDistance = (
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
): number => {
	"worklet";
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
