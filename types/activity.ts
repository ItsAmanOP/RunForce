// region Types
export type ActivityType = "run" | "walk" | "bike" | "drive";

export interface LocationPoint {
	latitude: number;
	longitude: number;
	altitude: number | null;
	speed: number | null;
	accuracy: number | null;
	timestamp: number;
}

export interface RunSession {
	id: string;
	activityType: ActivityType;
	title: string;
	startTime: number;
	endTime: number | null;
	duration: number;
	distance: number;
	avgSpeed: number;
	maxSpeed: number;
	avgPace: string;
	calories: number;
	elevation: number;
	points: LocationPoint[];
	status: "active" | "paused" | "completed";
}

export interface RunTarget {
	name: string;
	distance: number;
	targetTime: number;
}

export type GpsSignalStrength = "STRONG" | "MODERATE" | "WEAK" | "NONE";
// endregion
