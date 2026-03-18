================================================================================
RECOVERED COPILOT CHAT SESSION
================================================================================
Session ID: 203b44e1-bdd7-470f-80c6-caacf3caf3c1
Date: March 18, 2026 (approximately 02:23 AM - 12:35 PM IST)
Model: copilot/claude-opus-4.6
Mode: Agent (Chat Editing)

NOTE: VS Code stores chat editing sessions (agent mode) differently
from regular chat sessions. The actual Copilot responses (markdown text)
were NOT persisted to disk - only the user prompts and the file
changes/snapshots were saved. Below is everything recoverable.

--------------------------------------------------------------------------------
USER PROMPTS (in order)
--------------------------------------------------------------------------------

### Prompt 1:
Attachments: ['RunForce App Design']
Mode: agent

Act as a Principal Expert React Native Software Engineer and Architect RunForce Tracker app.

# Context: 

The main focus of the app:

- Mainly we are creating this app for competitive runners, like people who are preparing for police running exams, or marathon runners, or athletes want to track there accurate speed and distance.

- A fun user can just open the app and see his current speed sitting in a train or bus or inside a flight while offline.

# Requirements:

- This is a React Native app created using Expo framework.
- The app should show real-time highly accurate speed and distance travelled and the app should be accessible offline and should be able to produce accurate data.
- Consume sensors data and impelement the require functionalities with industry standard and modern best React Native coding practices and best performance practices.
- The functionalities are similar to Adidas Running app, take refrence from it.
- The app should be performant as native apps, and should produce constant 60fps performance.
- The design provided is self explainatory and implement pixel perfect UI from the design (RunForce App Design Folder)

# Tech:

- Use perfect typescript for creating components and writing code.
- Create generalized components in pure React Native and StyleSheet.
- Use Reanimated for animations, and timers or realtime data should be written with Reanimated instead of using useState, because useSharedValue gives 60fps performance.
- Use best library for consuming sensors in expo environment.
- For Coding best practices in Expo, like file based routing, ts alias, component structure etc, follow: https://github.com/GSTJ/pegada/tree/main/apps/mobile It is a best open source project in React Native Expo.

Architect the RaceForce app as a Principal Expert React Native Software Engineer and implement all the functionalities with pixel perfect UI as provided.

Properly run the project, also confirm everything is working fine after successfull running the project and nothing breaks.


### Prompt 2:
Mode: agent

Add the project architecture in a github instruction so that the copilot keep reference in future.


### Prompt 3:
Mode: agent

The app is crashing on Pressing Start Button with the following error:

TypeError: formatPace is not a function (it is Object)
at trackingScreenTsx7: (:1:99)
at reactNativeReanimated_useDerivedValueTs1 (:1:121)

Thoroughly check the issue, fix it properly.


### Prompt 4:
Mode: agent

I had a copilot chat yersterday in the current workspace, but on yersterday when I closed this workspace vs code asked me to save this as workspace and I selected that.
Today when I opened this RunForce app folder, my last copilot chat history is not showing, it is really important as it created this project with proper prompt and all cases.

Currently I am able to find that session in the vs code workspaceStorage, but in the chatEditingSessions not in chatSessions.

Carefully recover the chat history, thoroughly leverage knowledge if similar issue happened with other users.
I you have enough knowledge to recover the yesterday's copilot chat then move ahead.

The location where I found the chat session is:
/Users/aman/Library/Application Support/Code/User/workspaceStorage/901436cb3dda20cb9a11b2ecaa3ea8c7/chatEditingSessions/203b44e1-bdd7-470f-80c6-caacf3caf3c1

--------------------------------------------------------------------------------
FILE CHANGES PER REQUEST
--------------------------------------------------------------------------------

### Request 1: request_e8b4e1be-6437-4455-a8bd-bc5fa659124c
Prompt: Act as a Principal Expert React Native Software Engineer and Architect RunForce Tracker app.

# Cont...
Files modified: 22
  - app.json (before: 38fda3f, after: 16b09d2)
  - app/%28tabs%29/_layout.tsx (before: 4d57da7, after: a2cda46)
  - app/%28tabs%29/index.tsx (before: dcb1d9a, after: 36440ca)
  - app/%28tabs%29/records.tsx (before: 02ad4d9, after: fe85b32)
  - app/_layout.tsx (before: bfe2cdb, after: 3ecb725)
  - app/tracking.tsx (before: da39a3e, after: f46f96c)
  - components/activity-selector.tsx (before: da39a3e, after: 7a0f45b)
  - components/app-header.tsx (before: da39a3e, after: 0c0fdf6)
  - components/metric-card.tsx (before: da39a3e, after: 4107d45)
  - components/record-card.tsx (before: da39a3e, after: 42b011e)
  - components/small-metric-card.tsx (before: da39a3e, after: 48bf31b)
  - components/speed-gauge.tsx (before: da39a3e, after: 9cb3f19)
  - components/ui/reanimated-text.tsx (before: da39a3e, after: 96bbe0b)
  - constants/theme.ts (before: 33b07be, after: 0c7a4e9)
  - hooks/use-stopwatch.ts (before: da39a3e, after: a00489d)
  - hooks/use-theme-colors.ts (before: da39a3e, after: 8e2c00b)
  - services/location-tracking.ts (before: da39a3e, after: 385943a)
  - services/session-storage.ts (before: da39a3e, after: cdce550)
  - types/activity.ts (before: da39a3e, after: 5137711)
  - views/home-screen.tsx (before: da39a3e, after: c988833)
  - views/records-screen.tsx (before: da39a3e, after: f7c0289)
  - views/tracking-screen.tsx (before: da39a3e, after: 23df2d6)


### Request 2: request_d8b6b4a1-c26f-4ec6-9ca8-bc02d0cdad11
Prompt: Add the project architecture in a github instruction so that the copilot keep reference in future....
Files modified: 23
  - .github/copilot-instructions.md (before: 798b598, after: 90f242d)
  - app.json (before: abf67b0, after: abf67b0)
  - app/%28tabs%29/_layout.tsx (before: b6c4770, after: b6c4770)
  - app/%28tabs%29/index.tsx (before: b41c4a7, after: b41c4a7)
  - app/%28tabs%29/records.tsx (before: 4b4333e, after: 4b4333e)
  - app/_layout.tsx (before: ad30a3b, after: ad30a3b)
  - app/tracking.tsx (before: 9f36d12, after: 9f36d12)
  - components/activity-selector.tsx (before: 8c9cbaa, after: 8c9cbaa)
  - components/app-header.tsx (before: bc3217a, after: bc3217a)
  - components/metric-card.tsx (before: 4c7c50b, after: 4c7c50b)
  - components/record-card.tsx (before: 8fc91b3, after: 8fc91b3)
  - components/small-metric-card.tsx (before: 4870795, after: 4870795)
  - components/speed-gauge.tsx (before: cb047bd, after: cb047bd)
  - components/ui/reanimated-text.tsx (before: 38dc6f1, after: 38dc6f1)
  - constants/theme.ts (before: 4e2a6df, after: 4e2a6df)
  - hooks/use-stopwatch.ts (before: e29c21e, after: e29c21e)
  - hooks/use-theme-colors.ts (before: 2d46d74, after: 2d46d74)
  - services/location-tracking.ts (before: 367f0da, after: 367f0da)
  - services/session-storage.ts (before: 362468c, after: 362468c)
  - types/activity.ts (before: 1758237, after: 1758237)
  - views/home-screen.tsx (before: b80a2a0, after: b80a2a0)
  - views/records-screen.tsx (before: 5b9ec54, after: 5b9ec54)
  - views/tracking-screen.tsx (before: 4236588, after: 4236588)


### Request 3: request_d316bf6a-1ec0-40c6-94dd-301a22f73215
Prompt: The app is crashing on Pressing Start Button with the following error:

TypeError: formatPace is not...
Files modified: 24
  - .github/copilot-instructions.md (before: 640db83, after: 640db83)
  - app.json (before: abf67b0, after: abf67b0)
  - app/%28tabs%29/_layout.tsx (before: b6c4770, after: b6c4770)
  - app/%28tabs%29/index.tsx (before: b41c4a7, after: b41c4a7)
  - app/%28tabs%29/records.tsx (before: 4b4333e, after: 4b4333e)
  - app/_layout.tsx (before: ad30a3b, after: ad30a3b)
  - app/tracking.tsx (before: 9f36d12, after: 9f36d12)
  - components/activity-selector.tsx (before: 8c9cbaa, after: 8c9cbaa)
  - components/app-header.tsx (before: bc3217a, after: bc3217a)
  - components/metric-card.tsx (before: 4c7c50b, after: 4c7c50b)
  - components/record-card.tsx (before: 8fc91b3, after: 8fc91b3)
  - components/small-metric-card.tsx (before: 4870795, after: 4870795)
  - components/speed-gauge.tsx (before: cb047bd, after: cb047bd)
  - components/ui/reanimated-text.tsx (before: 38dc6f1, after: 38dc6f1)
  - constants/theme.ts (before: 4e2a6df, after: 4e2a6df)
  - hooks/use-stopwatch.ts (before: e29c21e, after: e29c21e)
  - hooks/use-theme-colors.ts (before: 2d46d74, after: 2d46d74)
  - services/location-tracking.ts (before: 367f0da, after: 27d78d7)
  - services/session-storage.ts (before: 362468c, after: 362468c)
  - types/activity.ts (before: 1758237, after: 1758237)
  - utils/tracking-helpers.ts (before: da39a3e, after: 9a7774f)
  - views/home-screen.tsx (before: b80a2a0, after: b80a2a0)
  - views/records-screen.tsx (before: 5b9ec54, after: 5b9ec54)
  - views/tracking-screen.tsx (before: 4236588, after: 86725b1)

--------------------------------------------------------------------------------
FINAL FILE CONTENTS (as created/modified by the session)
--------------------------------------------------------------------------------

============================================================
FILE: app.json
Hash: abf67b0
============================================================
{
	"expo": {
		"name": "RunForce",
		"slug": "RunForce",
		"version": "1.0.0",
		"orientation": "portrait",
		"icon": "./assets/images/icon.png",
		"scheme": "runforce",
		"userInterfaceStyle": "automatic",
		"newArchEnabled": true,
		"ios": {
			"supportsTablet": true,
			"infoPlist": {
				"NSLocationWhenInUseUsageDescription": "RunForce needs your location to track speed and distance during your runs.",
				"NSLocationAlwaysAndWhenInUseUsageDescription": "RunForce needs background location access to continue tracking your runs.",
				"NSMotionUsageDescription": "RunForce uses motion sensors for accurate step counting and cadence tracking.",
				"UIBackgroundModes": ["location"]
			}
		},
		"android": {
			"adaptiveIcon": {
				"backgroundColor": "#0a0a0a",
				"foregroundImage": "./assets/images/android-icon-foreground.png",
				"backgroundImage": "./assets/images/android-icon-background.png",
				"monochromeImage": "./assets/images/android-icon-monochrome.png"
			},
			"edgeToEdgeEnabled": true,
			"predictiveBackGestureEnabled": false,
			"permissions": [
				"ACCESS_FINE_LOCATION",
				"ACCESS_COARSE_LOCATION",
				"ACCESS_BACKGROUND_LOCATION",
				"ACTIVITY_RECOGNITION",
				"FOREGROUND_SERVICE",
				"FOREGROUND_SERVICE_LOCATION"
			]
		},
		"web": {
			"output": "static",
			"favicon": "./assets/images/favicon.png"
		},
		"plugins": [
			"expo-router",
			[
				"expo-location",
				{
					"locationAlwaysAndWhenInUsePermission": "RunForce needs your location to track speed and distance during your runs.",
					"isIosBackgroundLocationEnabled": true,
					"isAndroidBackgroundLocationEnabled": true,
					"isAndroidForegroundServiceEnabled": true
				}
			],
			[
				"expo-sensors",
				{
					"motionPermission": "RunForce uses motion sensors for accurate step counting and cadence."
				}
			],
			[
				"expo-splash-screen",
				{
					"image": "./assets/images/splash-icon.png",
					"imageWidth": 200,
					"resizeMode": "contain",
					"backgroundColor": "#0a0a0a",
					"dark": {
						"backgroundColor": "#0a0a0a"
					}
				}
			]
		],
		"experiments": {
			"typedRoutes": true,
			"reactCompiler": true
		}
	}
}



============================================================
FILE: constants/theme.ts
Hash: 4e2a6df
============================================================
import { Platform } from "react-native";

// region Brand Colors
export const BRAND = "#80f20d";
export const BRAND_RGB = "128, 242, 13";
// endregion

// region Color Tokens
export const Colors = {
	light: {
		background: "#ffffff",
		surface: "#f4f4f5",
		surfaceSecondary: "#e4e4e7",
		surfaceTertiary: "#d4d4d8",
		text: "#09090b",
		textSecondary: "#71717a",
		textTertiary: "#a1a1aa",
		border: "rgba(0, 0, 0, 0.08)",
		borderLight: "rgba(0, 0, 0, 0.05)",
		brand: BRAND,
		tint: BRAND,
		icon: "#71717a",
		tabIconDefault: "#a1a1aa",
		tabIconSelected: BRAND,
		cardBackground: "rgba(255, 255, 255, 0.8)",
		gaugeTrack: "rgba(0, 0, 0, 0.05)",
		headerGradientFrom: "#ffffff",
		footerGradientFrom: "#ffffff",
		shadow: "rgba(0, 0, 0, 0.03)",
		statusBarStyle: "dark" as const,
		dangerBackground: "rgba(239, 68, 68, 0)",
		dangerBorder: "#ef4444",
		dangerText: "#ef4444",
	},
	dark: {
		background: "#0a0a0a",
		surface: "#121212",
		surfaceSecondary: "#1c1c1c",
		surfaceTertiary: "#2a2a2a",
		text: "#ffffff",
		textSecondary: "rgba(255, 255, 255, 0.6)",
		textTertiary: "rgba(255, 255, 255, 0.4)",
		border: "rgba(255, 255, 255, 0.08)",
		borderLight: "rgba(255, 255, 255, 0.05)",
		brand: BRAND,
		tint: BRAND,
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: BRAND,
		cardBackground: "rgba(255, 255, 255, 0.03)",
		gaugeTrack: "rgba(255, 255, 255, 0.05)",
		headerGradientFrom: "#0a0a0a",
		footerGradientFrom: "#0a0a0a",
		shadow: "rgba(0, 0, 0, 0.5)",
		statusBarStyle: "light" as const,
		dangerBackground: "rgba(239, 68, 68, 0.2)",
		dangerBorder: "#ef4444",
		dangerText: "#ef4444",
	},
} as const;
// endregion

// region Typography
export const Fonts = Platform.select({
	ios: {
		sans: "System" as const,
		mono: "Menlo" as const,
		rounded: "System" as const,
	},
	default: {
		sans: "normal" as const,
		mono: "monospace" as const,
		rounded: "normal" as const,
	},
});
// endregion

// region Spacing
export const Spacing = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	"2xl": 24,
	"3xl": 32,
	"4xl": 40,
	"5xl": 48,
} as const;
// endregion

// region Border Radius
export const Radii = {
	sm: 4,
	md: 8,
	lg: 12,
	xl: 16,
	full: 9999,
} as const;
// endregion

// region Shadows
export const Shadows = {
	neon: {
		shadowColor: BRAND,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.4,
		shadowRadius: 15,
		elevation: 8,
	},
	neonStrong: {
		shadowColor: BRAND,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.6,
		shadowRadius: 25,
		elevation: 12,
	},
	card: {
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.03,
		shadowRadius: 12,
		elevation: 2,
	},
} as const;
// endregion

// region Theme Type
export type ThemeColors = typeof Colors.dark;
export type ColorScheme = "light" | "dark";
// endregion



============================================================
FILE: types/activity.ts
Hash: 1758237
============================================================
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



============================================================
FILE: hooks/use-theme-colors.ts
Hash: 2d46d74
============================================================
import { Colors, type ColorScheme } from "@/constants/theme";
import { useColorScheme as useRNColorScheme } from "react-native";

// region Types
export type AppThemeColors = (typeof Colors)["dark"] | (typeof Colors)["light"];
// endregion

// region Hook
export const useThemeColors = (): AppThemeColors => {
	const colorScheme = (useRNColorScheme() ?? "dark") as ColorScheme;
	return Colors[colorScheme];
};
// endregion



============================================================
FILE: services/location-tracking.ts
Hash: 196112f
============================================================
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



============================================================
FILE: hooks/use-stopwatch.ts
Hash: e29c21e
============================================================
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



============================================================
FILE: services/session-storage.ts
Hash: 362468c
============================================================
import type { RunSession } from "@/types/activity";
import AsyncStorage from "@react-native-async-storage/async-storage";

// region Constants
const STORAGE_KEY = "@runforce_sessions";
// endregion

// region Storage Functions
export const saveSessions = async (sessions: RunSession[]): Promise<void> => {
	try {
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
	} catch (error) {
		console.error("Failed to save sessions:", error);
	}
};

export const loadSessions = async (): Promise<RunSession[]> => {
	try {
		const data = await AsyncStorage.getItem(STORAGE_KEY);
		return data ? JSON.parse(data) : [];
	} catch (error) {
		console.error("Failed to load sessions:", error);
		return [];
	}
};

export const addSession = async (session: RunSession): Promise<void> => {
	const sessions = await loadSessions();
	sessions.unshift(session);
	await saveSessions(sessions);
};

export const deleteSession = async (id: string): Promise<void> => {
	const sessions = await loadSessions();
	const filtered = sessions.filter((s) => s.id !== id);
	await saveSessions(filtered);
};
// endregion



============================================================
FILE: components/speed-gauge.tsx
Hash: cb047bd
============================================================
import { ReanimatedText } from "@/components/ui/reanimated-text";
import { BRAND } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedProps,
    useDerivedValue,
    type SharedValue,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

// region Types
interface SpeedGaugeProps {
	speed: SharedValue<number>;
	maxSpeedRange?: number;
	size?: number;
}
// endregion

// region Animated SVG
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
// endregion

// region Component
const STROKE_WIDTH = 12;

export const SpeedGauge: React.FC<SpeedGaugeProps> = ({
	speed,
	maxSpeedRange = 80,
	size = 240,
}) => {
	const colors = useThemeColors();
	const radius = (size - STROKE_WIDTH * 2) / 2;
	const circumference = 2 * Math.PI * radius;
	const center = size / 2;

	const animatedProps = useAnimatedProps(() => {
		const progress = Math.min(speed.value / maxSpeedRange, 1);
		const offset = circumference * (1 - progress);
		return { strokeDashoffset: offset };
	});

	const speedText = useDerivedValue(() => {
		return speed.value.toFixed(1);
	});

	const unitText = useDerivedValue(() => "KM/H");

	return (
		<View style={[styles.container, { width: size, height: size }]}>
			<View
				style={[
					styles.glowBackground,
					{
						width: size * 0.65,
						height: size * 0.65,
						backgroundColor: `rgba(${128}, ${242}, ${13}, 0.05)`,
					},
				]}
			/>
			<Svg width={size} height={size} style={styles.svg}>
				<Circle
					cx={center}
					cy={center}
					r={radius}
					stroke={colors.gaugeTrack}
					strokeWidth={STROKE_WIDTH}
					fill="none"
				/>
				<AnimatedCircle
					cx={center}
					cy={center}
					r={radius}
					stroke={BRAND}
					strokeWidth={STROKE_WIDTH}
					strokeLinecap="round"
					fill="none"
					strokeDasharray={circumference}
					animatedProps={animatedProps}
				/>
			</Svg>
			<View style={styles.labelContainer}>
				<Animated.Text
					style={[styles.labelCurrent, { color: colors.textTertiary }]}
				>
					Current
				</Animated.Text>
				<ReanimatedText
					text={speedText}
					style={[styles.speedValue, { color: colors.text }]}
				/>
				<ReanimatedText text={unitText} style={styles.unitLabel} />
			</View>
			<View style={styles.tickMarks}>
				<View
					style={[styles.tickTop, { backgroundColor: colors.textTertiary }]}
				/>
				<View
					style={[styles.tickBottom, { backgroundColor: colors.textTertiary }]}
				/>
				<View
					style={[styles.tickLeft, { backgroundColor: colors.textTertiary }]}
				/>
				<View
					style={[styles.tickRight, { backgroundColor: colors.textTertiary }]}
				/>
			</View>
		</View>
	);
};
// endregion

// region Styles
const styles = StyleSheet.create({
	container: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	glowBackground: {
		position: "absolute",
		borderRadius: 9999,
	},
	svg: {
		transform: [{ rotate: "-90deg" }],
	},
	labelContainer: {
		position: "absolute",
		alignItems: "center",
	},
	labelCurrent: {
		fontSize: 10,
		fontWeight: "800",
		textTransform: "uppercase",
		letterSpacing: 3,
		marginBottom: 2,
	},
	speedValue: {
		fontSize: 56,
		fontWeight: "900",
		letterSpacing: -2,
		fontVariant: ["tabular-nums"],
	},
	unitLabel: {
		fontSize: 12,
		fontWeight: "900",
		color: BRAND,
		letterSpacing: 4,
		marginTop: 4,
	},
	tickMarks: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0.2,
	},
	tickTop: {
		position: "absolute",
		top: 0,
		left: "50%",
		marginLeft: -1,
		width: 2,
		height: 12,
	},
	tickBottom: {
		position: "absolute",
		bottom: 0,
		left: "50%",
		marginLeft: -1,
		width: 2,
		height: 12,
	},
	tickLeft: {
		position: "absolute",
		left: 0,
		top: "50%",
		marginTop: -1,
		width: 12,
		height: 2,
	},
	tickRight: {
		position: "absolute",
		right: 0,
		top: "50%",
		marginTop: -1,
		width: 12,
		height: 2,
	},
});
// endregion



============================================================
FILE: components/ui/reanimated-text.tsx
Hash: 38dc6f1
============================================================
import React from "react";
import { StyleSheet, TextInput, type TextStyle } from "react-native";
import Animated, {
    useAnimatedProps,
    type SharedValue,
} from "react-native-reanimated";

// region Animated TextInput
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
// endregion

// region Types
interface ReanimatedTextProps {
	text: SharedValue<string> | Readonly<SharedValue<string>>;
	style?: TextStyle | TextStyle[];
}
// endregion

// region Component
export const ReanimatedText: React.FC<ReanimatedTextProps> = ({
	text,
	style,
}) => {
	const animatedProps = useAnimatedProps(() => {
		return { text: text.value, defaultValue: text.value } as Record<
			string,
			string
		>;
	});

	return (
		<AnimatedTextInput
			underlineColorAndroid="transparent"
			editable={false}
			style={[styles.base, style]}
			animatedProps={animatedProps}
		/>
	);
};
// endregion

// region Styles
const styles = StyleSheet.create({
	base: {
		padding: 0,
		margin: 0,
		textAlign: "center",
	},
});
// endregion



============================================================
FILE: components/metric-card.tsx
Hash: 4c7c50b
============================================================
import { ReanimatedText } from "@/components/ui/reanimated-text";
import { BRAND, Radii } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    useDerivedValue,
    type SharedValue,
} from "react-native-reanimated";

// region Types
interface MetricCardProps {
	label: string;
	value: SharedValue<string> | Readonly<SharedValue<string>>;
	unit: string;
	large?: boolean;
}
// endregion

// region Component
export const MetricCard: React.FC<MetricCardProps> = ({
	label,
	value,
	unit,
	large = false,
}) => {
	const colors = useThemeColors();

	const derivedValue = useDerivedValue(() => value.value);

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: colors.cardBackground, borderColor: colors.border },
				large && styles.containerLarge,
			]}
		>
			<Text style={[styles.label, { color: colors.textTertiary }]}>
				{label}
			</Text>
			<ReanimatedText
				text={derivedValue}
				style={[
					large ? styles.valueLarge : styles.value,
					{ color: colors.text },
				]}
			/>
			<Text style={styles.unit}>{unit}</Text>
		</View>
	);
};
// endregion

// region Styles
const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		padding: 16,
		borderRadius: Radii.md,
		alignItems: "center",
	},
	containerLarge: {
		padding: 16,
	},
	label: {
		fontSize: 10,
		fontWeight: "800",
		textTransform: "uppercase",
		letterSpacing: 3,
		marginBottom: 8,
	},
	value: {
		fontSize: 18,
		fontWeight: "700",
		fontVariant: ["tabular-nums"],
	},
	valueLarge: {
		fontSize: 24,
		fontWeight: "900",
		fontVariant: ["tabular-nums"],
	},
	unit: {
		fontSize: 10,
		fontWeight: "700",
		color: BRAND,
		marginTop: 4,
		textTransform: "uppercase",
	},
});
// endregion



============================================================
FILE: components/activity-selector.tsx
Hash: 8c9cbaa
============================================================
import { BRAND, Shadows } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { ActivityType } from "@/types/activity";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// region Types
interface ActivitySelectorProps {
	selected: ActivityType;
	onSelect: (type: ActivityType) => void;
}

interface ActivityOption {
	type: ActivityType;
	label: string;
	icon: keyof typeof MaterialCommunityIcons.glyphMap;
}
// endregion

// region Data
const ACTIVITIES: ActivityOption[] = [
	{ type: "run", label: "Run", icon: "run" },
	{ type: "walk", label: "Walk", icon: "walk" },
	{ type: "bike", label: "Bike", icon: "bike" },
	{ type: "drive", label: "Drive", icon: "car" },
];
// endregion

// region Component
export const ActivitySelector: React.FC<ActivitySelectorProps> = ({
	selected,
	onSelect,
}) => {
	const colors = useThemeColors();

	const renderItem = useCallback(
		(item: ActivityOption) => {
			const isActive = selected === item.type;
			return (
				<Pressable
					key={item.type}
					style={styles.item}
					onPress={() => onSelect(item.type)}
				>
					<View
						style={[
							styles.iconContainer,
							isActive
								? [styles.iconActive, Shadows.neon]
								: {
										backgroundColor: colors.surface,
										borderColor: colors.border,
										borderWidth: 1,
									},
						]}
					>
						<MaterialCommunityIcons
							name={item.icon}
							size={22}
							color={isActive ? "#000000" : colors.textTertiary}
						/>
					</View>
					<Text
						style={[
							styles.label,
							isActive ? styles.labelActive : { color: colors.textTertiary },
						]}
					>
						{item.label}
					</Text>
				</Pressable>
			);
		},
		[selected, onSelect, colors],
	);

	return <View style={styles.container}>{ACTIVITIES.map(renderItem)}</View>;
};
// endregion

// region Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 12,
		paddingVertical: 8,
	},
	item: {
		alignItems: "center",
		gap: 4,
		minWidth: 60,
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	iconActive: {
		backgroundColor: BRAND,
	},
	label: {
		fontSize: 9,
		fontWeight: "900",
		textTransform: "uppercase",
	},
	labelActive: {
		color: BRAND,
		fontSize: 9,
		fontWeight: "900",
		textTransform: "uppercase",
	},
});
// endregion



============================================================
FILE: components/record-card.tsx
Hash: 8fc91b3
============================================================
import { BRAND, Radii } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { RunSession } from "@/types/activity";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

// region Types
interface RecordCardProps {
	session: RunSession;
	onPress?: () => void;
}
// endregion

// region Helpers
const getActivityLabel = (type: string): string => {
	switch (type) {
		case "run":
			return "Endurance Run";
		case "walk":
			return "Recovery Walk";
		case "bike":
			return "Cycling";
		case "drive":
			return "Pro Drive";
		default:
			return "Activity";
	}
};

const formatDate = (timestamp: number): string => {
	const date = new Date(timestamp);
	const now = new Date();
	const diffDays = Math.floor(
		(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
	);

	if (diffDays === 0)
		return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
	if (diffDays === 1)
		return `Yesterday, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
	return date.toLocaleDateString([], {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

const formatDuration = (ms: number): string => {
	const totalSeconds = Math.floor(ms / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const MINI_MAP_PATHS = [
	"M20,80 Q40,20 60,50 T90,30",
	"M30,20 C50,20 20,80 70,80",
	"M20,20 L80,20 L80,80 L20,80 Z",
	"M15,70 Q30,30 50,50 T85,25",
];
// endregion

// region Component
export const RecordCard: React.FC<RecordCardProps> = ({ session, onPress }) => {
	const colors = useThemeColors();
	const distanceKm = (session.distance / 1000).toFixed(1);
	const mapPath =
		MINI_MAP_PATHS[Math.abs(session.id.charCodeAt(0)) % MINI_MAP_PATHS.length];

	return (
		<Pressable
			style={[
				styles.container,
				{ backgroundColor: colors.cardBackground, borderColor: colors.border },
			]}
			onPress={onPress}
		>
			<View style={styles.header}>
				<View>
					<View
						style={[
							styles.badge,
							{
								backgroundColor:
									session.activityType === "run" ||
									session.activityType === "drive"
										? `rgba(128, 242, 13, 0.1)`
										: colors.surfaceSecondary,
							},
						]}
					>
						<Text
							style={[
								styles.badgeText,
								{
									color:
										session.activityType === "run" ||
										session.activityType === "drive"
											? BRAND
											: colors.textSecondary,
								},
							]}
						>
							{getActivityLabel(session.activityType)}
						</Text>
					</View>
					<Text style={[styles.title, { color: colors.text }]}>
						{session.title}
					</Text>
					<Text style={[styles.date, { color: colors.textTertiary }]}>
						{formatDate(session.startTime)}
					</Text>
				</View>
				<View style={styles.distanceContainer}>
					<Text style={[styles.distance, { color: colors.text }]}>
						{distanceKm}
						<Text style={styles.distanceUnit}>KM</Text>
					</Text>
					<Text style={[styles.distanceLabel, { color: colors.textTertiary }]}>
						Distance
					</Text>
				</View>
			</View>
			<View style={styles.statsRow}>
				<View style={styles.statsColumn}>
					<View style={styles.statItem}>
						<Text style={[styles.statLabel, { color: colors.textTertiary }]}>
							Duration
						</Text>
						<Text style={[styles.statValue, { color: colors.text }]}>
							{formatDuration(session.duration)}
						</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={[styles.statLabel, { color: colors.textTertiary }]}>
							Avg Speed
						</Text>
						<Text style={[styles.statValue, { color: colors.text }]}>
							{session.avgSpeed.toFixed(1)}{" "}
							<Text style={[styles.statUnit, { color: colors.textTertiary }]}>
								km/h
							</Text>
						</Text>
					</View>
				</View>
				<View
					style={[
						styles.miniMap,
						{
							backgroundColor: colors.surfaceSecondary,
							borderColor: colors.borderLight,
						},
					]}
				>
					<Svg width="100%" height="100%" viewBox="0 0 100 100">
						<Path
							d={mapPath}
							stroke={BRAND}
							strokeWidth={3}
							fill="none"
							strokeDasharray="100"
						/>
						<Circle cx="20" cy="80" r={3} fill={BRAND} />
						<Circle cx="90" cy="30" r={3} fill={colors.text} />
					</Svg>
				</View>
			</View>
		</Pressable>
	);
};
// endregion

// region Styles
const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: Radii.md,
		padding: 16,
		overflow: "hidden",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 16,
	},
	badge: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 9999,
		alignSelf: "flex-start",
		marginBottom: 8,
	},
	badgeText: {
		fontSize: 9,
		fontWeight: "900",
		textTransform: "uppercase",
		letterSpacing: 2,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		letterSpacing: -0.3,
	},
	date: {
		fontSize: 12,
		marginTop: 2,
	},
	distanceContainer: {
		alignItems: "flex-end",
	},
	distance: {
		fontSize: 24,
		fontWeight: "900",
	},
	distanceUnit: {
		fontSize: 12,
		color: BRAND,
		fontWeight: "900",
		marginLeft: 2,
	},
	distanceLabel: {
		fontSize: 10,
		textTransform: "uppercase",
		marginTop: 2,
	},
	statsRow: {
		flexDirection: "row",
		gap: 16,
	},
	statsColumn: {
		flex: 1,
		gap: 12,
	},
	statItem: {},
	statLabel: {
		fontSize: 10,
		fontWeight: "700",
		textTransform: "uppercase",
	},
	statValue: {
		fontSize: 18,
		fontWeight: "600",
		fontVariant: ["tabular-nums"],
	},
	statUnit: {
		fontSize: 12,
	},
	miniMap: {
		width: 96,
		height: 96,
		borderRadius: Radii.md,
		borderWidth: 1,
		overflow: "hidden",
	},
});
// endregion



============================================================
FILE: components/app-header.tsx
Hash: bc3217a
============================================================
import { BRAND, Radii, Shadows } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// region Component
export const AppHeader: React.FC = () => {
	const colors = useThemeColors();

	return (
		<View style={styles.container}>
			<View style={styles.logoRow}>
				<View style={[styles.iconBox, Shadows.neon]}>
					<MaterialCommunityIcons
						name="lightning-bolt"
						size={20}
						color="#000000"
					/>
				</View>
				<View style={styles.titleColumn}>
					<Text style={[styles.title, { color: colors.text }]}>RunForce</Text>
					<View style={styles.liveRow}>
						<View style={styles.liveDot} />
						<Text style={[styles.liveText, { color: colors.textTertiary }]}>
							System Live
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};
// endregion

// region Styles
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 24,
		paddingTop: 8,
		paddingBottom: 8,
	},
	logoRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	iconBox: {
		width: 32,
		height: 32,
		borderRadius: Radii.md,
		backgroundColor: BRAND,
		alignItems: "center",
		justifyContent: "center",
	},
	titleColumn: {
		gap: 1,
	},
	title: {
		fontSize: 14,
		fontWeight: "900",
		textTransform: "uppercase",
		letterSpacing: -0.5,
	},
	liveRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	liveDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: BRAND,
	},
	liveText: {
		fontSize: 8,
		fontWeight: "800",
		textTransform: "uppercase",
		letterSpacing: 2,
	},
});
// endregion



============================================================
FILE: components/small-metric-card.tsx
Hash: 4870795
============================================================
import { ReanimatedText } from "@/components/ui/reanimated-text";
import { BRAND, Radii } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    useDerivedValue,
    type SharedValue,
} from "react-native-reanimated";

// region Types
interface SmallMetricCardProps {
	label: string;
	value: SharedValue<string> | Readonly<SharedValue<string>>;
	unit: string;
}
// endregion

// region Component
export const SmallMetricCard: React.FC<SmallMetricCardProps> = ({
	label,
	value,
	unit,
}) => {
	const colors = useThemeColors();

	const derivedValue = useDerivedValue(() => value.value);

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: colors.cardBackground, borderColor: colors.border },
			]}
		>
			<View style={styles.leftColumn}>
				<Text style={[styles.label, { color: colors.textTertiary }]}>
					{label}
				</Text>
				<ReanimatedText
					text={derivedValue}
					style={[styles.value, { color: colors.text }]}
				/>
			</View>
			<Text style={styles.unit}>{unit}</Text>
		</View>
	);
};
// endregion

// region Styles
const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		padding: 12,
		borderRadius: Radii.md,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	leftColumn: {
		gap: 2,
	},
	label: {
		fontSize: 9,
		fontWeight: "700",
		textTransform: "uppercase",
	},
	value: {
		fontSize: 18,
		fontWeight: "700",
		fontVariant: ["tabular-nums"],
		textAlign: "left",
	},
	unit: {
		fontSize: 9,
		fontWeight: "700",
		color: BRAND,
		textTransform: "uppercase",
	},
});
// endregion



============================================================
FILE: views/home-screen.tsx
Hash: b80a2a0
============================================================
import { ActivitySelector } from "@/components/activity-selector";
import { AppHeader } from "@/components/app-header";
import { MetricCard } from "@/components/metric-card";
import { SmallMetricCard } from "@/components/small-metric-card";
import { SpeedGauge } from "@/components/speed-gauge";
import { BRAND, Radii, Shadows } from "@/constants/theme";
import { formatTime, useStopwatch } from "@/hooks/use-stopwatch";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useLocationTracking } from "@/services/location-tracking";
import type { ActivityType } from "@/types/activity";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// region Component
const HomeScreen = () => {
	const colors = useThemeColors();
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const [activityType, setActivityType] = useState<ActivityType>("run");

	const { currentSpeed, totalDistance, elevation } = useLocationTracking();
	const { elapsed } = useStopwatch();

	const durationText = useDerivedValue(() => formatTime(elapsed.value));
	const distanceText = useDerivedValue(() =>
		(totalDistance.value / 1000).toFixed(1),
	);
	const cadenceText = useDerivedValue(() => "--");
	const elevationText = useDerivedValue(() => elevation.value.toLocaleString());

	const onStartPress = useCallback(() => {
		router.push({ pathname: "/tracking", params: { activityType } });
	}, [router, activityType]);

	return (
		<View
			style={[
				styles.screen,
				{ backgroundColor: colors.background, paddingTop: insets.top },
			]}
		>
			<AppHeader />
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.gaugeSection}>
					<SpeedGauge speed={currentSpeed} />
				</View>
				<View style={styles.metricsSection}>
					<View style={styles.metricsRow}>
						<View style={styles.metricHalf}>
							<MetricCard
								label="Duration"
								value={durationText}
								unit="HRS:MIN:SEC"
								large
							/>
						</View>
						<View style={styles.metricHalf}>
							<MetricCard
								label="Distance"
								value={distanceText}
								unit="KILOMETERS"
								large
							/>
						</View>
					</View>
					<View style={styles.metricsRow}>
						<View style={styles.metricHalf}>
							<SmallMetricCard label="Cadence" value={cadenceText} unit="RPM" />
						</View>
						<View style={styles.metricHalf}>
							<SmallMetricCard
								label="Elevation"
								value={elevationText}
								unit="M"
							/>
						</View>
					</View>
				</View>
				<View style={styles.spacer} />
			</ScrollView>
			<View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
				<ActivitySelector selected={activityType} onSelect={setActivityType} />
				<View style={styles.actionRow}>
					<Pressable
						style={[
							styles.secondaryButton,
							{ backgroundColor: colors.surface, borderColor: colors.border },
						]}
					>
						<MaterialCommunityIcons
							name="map-marker"
							size={24}
							color={colors.textSecondary}
						/>
					</Pressable>
					<Pressable style={styles.startButtonWrapper} onPress={onStartPress}>
						<View style={styles.startButtonGlow} />
						<View style={[styles.startButton, Shadows.neonStrong]}>
							<MaterialCommunityIcons name="play" size={32} color="#000000" />
							<Text style={styles.startButtonLabel}>Start</Text>
						</View>
					</Pressable>
					<Pressable
						style={[
							styles.secondaryButton,
							{ backgroundColor: colors.surface, borderColor: colors.border },
						]}
						onPress={() => router.push("/records")}
					>
						<MaterialCommunityIcons
							name="chart-bar"
							size={24}
							color={colors.textSecondary}
						/>
					</Pressable>
				</View>
			</View>
		</View>
	);
};
// endregion

export default HomeScreen;

// region Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 24,
		paddingBottom: 260,
	},
	gaugeSection: {
		alignItems: "center",
		paddingVertical: 24,
	},
	metricsSection: {
		gap: 16,
		paddingVertical: 8,
	},
	metricsRow: {
		flexDirection: "row",
		gap: 16,
	},
	metricHalf: {
		flex: 1,
	},
	spacer: {
		height: 40,
	},
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 24,
		paddingTop: 40,
	},
	actionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 16,
	},
	secondaryButton: {
		width: 56,
		height: 56,
		borderRadius: Radii.md,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	startButtonWrapper: {
		width: 96,
		height: 96,
		alignItems: "center",
		justifyContent: "center",
	},
	startButtonGlow: {
		position: "absolute",
		width: 96,
		height: 96,
		borderRadius: 48,
		backgroundColor: BRAND,
		opacity: 0.2,
	},
	startButton: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: BRAND,
		alignItems: "center",
		justifyContent: "center",
	},
	startButtonLabel: {
		fontSize: 10,
		fontWeight: "900",
		color: "#000000",
		textTransform: "uppercase",
		letterSpacing: -0.5,
		marginTop: -4,
	},
});
// endregion



============================================================
FILE: views/tracking-screen.tsx
Hash: 7fbccee
============================================================
import { ReanimatedText } from "@/components/ui/reanimated-text";
import { BRAND, Radii } from "@/constants/theme";
import { formatTimeCompact, useStopwatch } from "@/hooks/use-stopwatch";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useLocationTracking } from "@/services/location-tracking";
import { addSession } from "@/services/session-storage";
import type { ActivityType, RunSession } from "@/types/activity";
import { formatPace } from "@/utils/tracking-helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// region Component
const TrackingScreen = () => {
	const colors = useThemeColors();
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const params = useLocalSearchParams<{ activityType: ActivityType }>();
	const activityType = params.activityType ?? "run";

	const {
		currentSpeed,
		totalDistance,
		maxSpeed,
		avgSpeed,
		elevation,
		gpsSignal,
		startTracking,
		stopTracking,
		resetTracking,
		getPoints,
	} = useLocationTracking();
	const {
		elapsed,
		isRunning,
		start: startTimer,
		pause: pauseTimer,
		reset: resetTimer,
	} = useStopwatch();

	const [sessionStatus, setSessionStatus] = useState<"active" | "paused">(
		"active",
	);
	const sessionStartTime = useRef(Date.now());

	const pingOpacity = useSharedValue(1);

	useEffect(() => {
		pingOpacity.value = withRepeat(
			withTiming(0, { duration: 1000, easing: Easing.ease }),
			-1,
			true,
		);
	}, [pingOpacity]);

	useEffect(() => {
		const init = async () => {
			await activateKeepAwakeAsync();
			await startTracking();
			startTimer();
		};
		init();
		return () => {
			deactivateKeepAwake();
			stopTracking();
		};
	}, []);

	const pingStyle = useAnimatedStyle(() => ({ opacity: pingOpacity.value }));

	const distanceLeftText = useDerivedValue(() => {
		const distM = totalDistance.value;
		if (distM < 1000) return Math.round(distM).toString();
		return (distM / 1000).toFixed(1);
	});

	const distanceUnitText = useDerivedValue((): string => {
		return totalDistance.value < 1000 ? "METERS" : "KILOMETERS";
	});

	const timeText = useDerivedValue(() => {
		const compact = formatTimeCompact(elapsed.value);
		return compact.main;
	});

	const timeFractionText = useDerivedValue(() => {
		const compact = formatTimeCompact(elapsed.value);
		return compact.fraction;
	});

	const avgSpeedText = useDerivedValue(() => `${avgSpeed.value.toFixed(1)}`);
	const currentPaceText = useDerivedValue(() => {
		const pace = formatPace(currentSpeed.value);
		return `Pace: ${pace}/km`;
	});

	const gpsText = useDerivedValue(() => `GPS: ${gpsSignal.value}`);

	const statusText = useDerivedValue((): string => {
		if (currentSpeed.value > 0) return "On Track";
		return "Waiting...";
	});

	const onPause = useCallback(() => {
		if (sessionStatus === "active") {
			pauseTimer();
			stopTracking();
			setSessionStatus("paused");
		} else {
			startTimer();
			startTracking();
			setSessionStatus("active");
		}
	}, [sessionStatus, pauseTimer, stopTracking, startTimer, startTracking]);

	const onStop = useCallback(() => {
		Alert.alert("End Session", "Are you sure you want to end this session?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "End",
				style: "destructive",
				onPress: async () => {
					pauseTimer();
					stopTracking();
					deactivateKeepAwake();

					const session: RunSession = {
						id: Date.now().toString(),
						activityType,
						title: `${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Session`,
						startTime: sessionStartTime.current,
						endTime: Date.now(),
						duration: elapsed.value,
						distance: totalDistance.value,
						avgSpeed: avgSpeed.value,
						maxSpeed: maxSpeed.value,
						avgPace: formatPace(avgSpeed.value),
						calories: Math.round((elapsed.value / 60000) * 7),
						elevation: elevation.value,
						points: getPoints(),
						status: "completed",
					};

					await addSession(session);
					resetTimer();
					resetTracking();
					router.back();
				},
			},
		]);
	}, [
		pauseTimer,
		stopTracking,
		elapsed,
		totalDistance,
		avgSpeed,
		maxSpeed,
		elevation,
		getPoints,
		activityType,
		resetTimer,
		resetTracking,
		router,
	]);

	const progressWidth = useDerivedValue(() => {
		const maxDist = 1600;
		return `${Math.min((totalDistance.value / maxDist) * 100, 100)}%`;
	});

	const progressStyle = useAnimatedStyle(() => ({
		width: progressWidth.value as unknown as number,
	}));

	return (
		<View
			style={[
				styles.screen,
				{ backgroundColor: colors.background, paddingTop: insets.top },
			]}
		>
			<View style={styles.header}>
				<View>
					<View style={styles.brandRow}>
						<MaterialCommunityIcons
							name="lightning-bolt"
							size={18}
							color={BRAND}
						/>
						<Text style={[styles.brandLabel, { color: colors.textTertiary }]}>
							RunForce
						</Text>
					</View>
					<Text style={[styles.sessionLabel, { color: BRAND }]}>
						Active Session
					</Text>
					<Text style={[styles.sessionTitle, { color: colors.text }]}>
						{activityType === "run"
							? "Running Session"
							: activityType === "walk"
								? "Walking Session"
								: activityType === "bike"
									? "Cycling Session"
									: "Driving Session"}
					</Text>
				</View>
				<View
					style={[
						styles.gpsBadge,
						{ backgroundColor: colors.surface, borderColor: colors.border },
					]}
				>
					<ReanimatedText
						text={gpsText}
						style={[styles.gpsText, { color: colors.textTertiary }]}
					/>
				</View>
			</View>
			<View style={styles.mainContent}>
				<View style={styles.distanceSection}>
					<Text style={[styles.distanceLabel, { color: colors.textTertiary }]}>
						Distance
					</Text>
					<ReanimatedText
						text={distanceLeftText}
						style={[styles.distanceValue, { color: BRAND }]}
					/>
					<ReanimatedText
						text={distanceUnitText}
						style={[styles.distanceUnit, { color: colors.text }]}
					/>
				</View>
				<View style={styles.timeSection}>
					<Text style={[styles.timeLabel, { color: colors.textTertiary }]}>
						Duration
					</Text>
					<View style={styles.timeRow}>
						<ReanimatedText
							text={timeText}
							style={[styles.timeValue, { color: colors.text }]}
						/>
						<ReanimatedText
							text={timeFractionText}
							style={[styles.timeFraction, { color: colors.textTertiary }]}
						/>
					</View>
				</View>
				<View
					style={[
						styles.statusCard,
						{
							backgroundColor: colors.surface,
							borderColor: `rgba(128, 242, 13, 0.2)`,
						},
					]}
				>
					<View style={styles.statusHeader}>
						<Animated.View style={[styles.pingDot, pingStyle]} />
						<Text
							style={[styles.statusHeaderText, { color: colors.textTertiary }]}
						>
							Status
						</Text>
					</View>
					<View style={styles.statusRow}>
						<MaterialCommunityIcons
							name="trending-up"
							size={32}
							color={BRAND}
						/>
						<ReanimatedText
							text={statusText}
							style={[styles.statusValue, { color: colors.text }]}
						/>
					</View>
					<ReanimatedText
						text={currentPaceText}
						style={[styles.paceText, { color: colors.textTertiary }]}
					/>
				</View>
			</View>
			<View style={styles.secondaryStats}>
				<View
					style={[
						styles.statCard,
						{
							backgroundColor: colors.cardBackground,
							borderColor: colors.border,
						},
					]}
				>
					<Text style={[styles.statLabel, { color: colors.textTertiary }]}>
						Average Speed
					</Text>
					<View style={styles.statRow}>
						<ReanimatedText
							text={avgSpeedText}
							style={[styles.statValue, { color: colors.text }]}
						/>
						<Text style={[styles.statUnit, { color: colors.textTertiary }]}>
							km/h
						</Text>
					</View>
				</View>
				<View
					style={[
						styles.statCard,
						{
							backgroundColor: colors.cardBackground,
							borderColor: colors.border,
						},
					]}
				>
					<Text style={[styles.statLabel, { color: colors.textTertiary }]}>
						Elevation
					</Text>
					<Text style={[styles.statValue2, { color: colors.text }]}>
						{elevation.value} m
					</Text>
				</View>
			</View>
			<View style={[styles.controls, { paddingBottom: insets.bottom + 24 }]}>
				<View style={styles.controlRow}>
					<Pressable
						style={[
							styles.pauseButton,
							{ backgroundColor: colors.surface, borderColor: colors.border },
						]}
						onPress={onPause}
					>
						<MaterialCommunityIcons
							name={sessionStatus === "active" ? "pause" : "play"}
							size={24}
							color={colors.text}
						/>
						<Text style={[styles.pauseLabel, { color: colors.text }]}>
							{sessionStatus === "active" ? "PAUSE" : "RESUME"}
						</Text>
					</Pressable>
					<Pressable
						style={[styles.stopButton, { borderColor: colors.dangerBorder }]}
						onPress={onStop}
					>
						<View style={styles.stopIcon} />
					</Pressable>
				</View>
				<View
					style={[
						styles.progressBar,
						{ backgroundColor: colors.surfaceSecondary },
					]}
				>
					<Animated.View style={[styles.progressFill, progressStyle]} />
				</View>
			</View>
		</View>
	);
};
// endregion

export default TrackingScreen;

// region Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		paddingHorizontal: 24,
		paddingVertical: 16,
	},
	brandRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginBottom: 4,
		opacity: 0.6,
	},
	brandLabel: {
		fontSize: 10,
		fontWeight: "900",
		letterSpacing: 3,
		textTransform: "uppercase",
	},
	sessionLabel: {
		fontSize: 12,
		fontWeight: "700",
		textTransform: "uppercase",
		letterSpacing: 3,
	},
	sessionTitle: {
		fontSize: 18,
		fontWeight: "800",
		letterSpacing: -0.3,
		marginTop: 2,
	},
	gpsBadge: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: Radii.md,
		borderWidth: 1,
		marginTop: 4,
	},
	gpsText: {
		fontSize: 10,
		fontWeight: "700",
		letterSpacing: 1,
		textAlign: "center",
	},
	mainContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 40,
		paddingHorizontal: 24,
	},
	distanceSection: {
		alignItems: "center",
	},
	distanceLabel: {
		fontSize: 12,
		fontWeight: "900",
		textTransform: "uppercase",
		letterSpacing: 4,
		marginBottom: 4,
	},
	distanceValue: {
		fontSize: 80,
		fontWeight: "900",
		fontVariant: ["tabular-nums"],
		letterSpacing: -2,
		textShadowColor: `rgba(128, 242, 13, 0.4)`,
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 20,
	},
	distanceUnit: {
		fontSize: 20,
		fontWeight: "900",
		letterSpacing: 6,
		marginTop: 8,
		textAlign: "center",
	},
	timeSection: {
		alignItems: "center",
	},
	timeLabel: {
		fontSize: 12,
		fontWeight: "900",
		textTransform: "uppercase",
		letterSpacing: 4,
		marginBottom: 4,
	},
	timeRow: {
		flexDirection: "row",
		alignItems: "baseline",
	},
	timeValue: {
		fontSize: 48,
		fontWeight: "700",
		fontVariant: ["tabular-nums"],
		letterSpacing: -2,
	},
	timeFraction: {
		fontSize: 24,
		fontWeight: "700",
		fontVariant: ["tabular-nums"],
	},
	statusCard: {
		width: "100%",
		padding: 24,
		borderRadius: Radii.md,
		borderWidth: 1,
		alignItems: "center",
	},
	statusHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 8,
	},
	pingDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: BRAND,
	},
	statusHeaderText: {
		fontSize: 10,
		fontWeight: "900",
		textTransform: "uppercase",
		letterSpacing: 3,
	},
	statusRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	statusValue: {
		fontSize: 28,
		fontWeight: "900",
		fontStyle: "italic",
		textTransform: "uppercase",
		letterSpacing: -1,
	},
	paceText: {
		fontSize: 12,
		fontWeight: "500",
		marginTop: 12,
		textAlign: "center",
	},
	secondaryStats: {
		flexDirection: "row",
		gap: 16,
		paddingHorizontal: 24,
		marginTop: 24,
	},
	statCard: {
		flex: 1,
		padding: 16,
		borderRadius: Radii.md,
		borderWidth: 1,
		alignItems: "center",
	},
	statLabel: {
		fontSize: 10,
		fontWeight: "700",
		textTransform: "uppercase",
	},
	statRow: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: 4,
		marginTop: 4,
	},
	statValue: {
		fontSize: 20,
		fontWeight: "700",
		fontVariant: ["tabular-nums"],
	},
	statValue2: {
		fontSize: 20,
		fontWeight: "700",
		marginTop: 4,
	},
	statUnit: {
		fontSize: 12,
	},
	controls: {
		paddingHorizontal: 24,
		paddingTop: 24,
	},
	controlRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	pauseButton: {
		flex: 1,
		height: 64,
		borderRadius: Radii.md,
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},
	pauseLabel: {
		fontSize: 14,
		fontWeight: "800",
		letterSpacing: 2,
	},
	stopButton: {
		width: 64,
		height: 64,
		borderRadius: 32,
		borderWidth: 2,
		backgroundColor: "rgba(239, 68, 68, 0.2)",
		alignItems: "center",
		justifyContent: "center",
	},
	stopIcon: {
		width: 24,
		height: 24,
		borderRadius: 4,
		backgroundColor: "#ef4444",
	},
	progressBar: {
		width: "100%",
		height: 6,
		borderRadius: 3,
		marginTop: 32,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		backgroundColor: BRAND,
		borderRadius: 3,
	},
});
// endregion



============================================================
FILE: views/records-screen.tsx
Hash: 5b9ec54
============================================================
import { RecordCard } from "@/components/record-card";
import { BRAND, Radii } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { loadSessions } from "@/services/session-storage";
import type { ActivityType, RunSession } from "@/types/activity";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// region Types
type FilterType = "all" | ActivityType;
// endregion

// region Constants
const FILTERS: { type: FilterType; label: string }[] = [
	{ type: "all", label: "All" },
	{ type: "run", label: "Run" },
	{ type: "walk", label: "Walk" },
	{ type: "drive", label: "Drive" },
];
// endregion

// region Component
const RecordsScreen = () => {
	const colors = useThemeColors();
	const insets = useSafeAreaInsets();
	const [sessions, setSessions] = useState<RunSession[]>([]);
	const [activeFilter, setActiveFilter] = useState<FilterType>("all");

	useFocusEffect(
		useCallback(() => {
			const load = async () => {
				const data = await loadSessions();
				setSessions(data);
			};
			load();
		}, []),
	);

	const filteredSessions = sessions.filter(
		(s) => activeFilter === "all" || s.activityType === activeFilter,
	);

	const renderItem = useCallback(
		({ item }: { item: RunSession }) => <RecordCard session={item} />,
		[],
	);

	const keyExtractor = useCallback((item: RunSession) => item.id, []);

	return (
		<View style={[styles.screen, { backgroundColor: colors.background }]}>
			<View style={[styles.header, { paddingTop: insets.top + 8 }]}>
				<View style={styles.headerTop}>
					<View>
						<View style={styles.titleRow}>
							<MaterialCommunityIcons
								name="lightning-bolt"
								size={32}
								color={BRAND}
							/>
							<Text style={[styles.title, { color: colors.text }]}>
								Run
								<Text style={{ color: BRAND, fontStyle: "italic" }}>Force</Text>
							</Text>
						</View>
						<Text style={[styles.subtitle, { color: colors.textTertiary }]}>
							Performance Hub
						</Text>
					</View>
					<View
						style={[styles.avatar, { borderColor: `rgba(128, 242, 13, 0.3)` }]}
					>
						<MaterialCommunityIcons
							name="account"
							size={24}
							color={colors.textSecondary}
						/>
					</View>
				</View>
				<View
					style={[styles.tabBar, { borderBottomColor: colors.borderLight }]}
				>
					{FILTERS.map((filter) => (
						<Pressable
							key={filter.type}
							style={[
								styles.tab,
								activeFilter === filter.type && styles.tabActive,
							]}
							onPress={() => setActiveFilter(filter.type)}
						>
							<Text
								style={[
									styles.tabText,
									activeFilter === filter.type
										? { color: colors.text }
										: { color: colors.textTertiary },
								]}
							>
								{filter.label}
							</Text>
						</Pressable>
					))}
				</View>
			</View>
			<FlatList
				data={filteredSessions}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				contentContainerStyle={[
					styles.listContent,
					{ paddingBottom: insets.bottom + 100 },
				]}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<MaterialCommunityIcons
							name="run-fast"
							size={64}
							color={colors.textTertiary}
						/>
						<Text style={[styles.emptyTitle, { color: colors.text }]}>
							No Records Yet
						</Text>
						<Text
							style={[styles.emptySubtitle, { color: colors.textTertiary }]}
						>
							Start a session from the Home tab to see your records here.
						</Text>
					</View>
				}
			/>
		</View>
	);
};
// endregion

export default RecordsScreen;

// region Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	header: {
		paddingHorizontal: 24,
		paddingBottom: 0,
	},
	headerTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	title: {
		fontSize: 28,
		fontWeight: "800",
		letterSpacing: -1,
		textTransform: "uppercase",
		fontStyle: "italic",
	},
	subtitle: {
		fontSize: 10,
		fontWeight: "600",
		textTransform: "uppercase",
		letterSpacing: 3,
		marginTop: 2,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: Radii.md,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	tabBar: {
		flexDirection: "row",
		gap: 24,
		marginTop: 24,
		borderBottomWidth: 1,
	},
	tab: {
		paddingBottom: 12,
	},
	tabActive: {
		borderBottomWidth: 2,
		borderBottomColor: BRAND,
	},
	tabText: {
		fontSize: 14,
		fontWeight: "700",
		textTransform: "uppercase",
		letterSpacing: -0.3,
	},
	listContent: {
		paddingHorizontal: 20,
		paddingTop: 16,
		gap: 16,
	},
	emptyContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 80,
		gap: 12,
	},
	emptyTitle: {
		fontSize: 20,
		fontWeight: "800",
	},
	emptySubtitle: {
		fontSize: 14,
		textAlign: "center",
		paddingHorizontal: 40,
	},
});
// endregion



============================================================
FILE: app/_layout.tsx
Hash: ad30a3b
============================================================
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { BRAND } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

// region Custom Themes
const RunForceDark = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		background: "#0a0a0a",
		card: "#0a0a0a",
		primary: BRAND,
		border: "rgba(255, 255, 255, 0.08)",
	},
};

const RunForceLight = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "#ffffff",
		card: "#ffffff",
		primary: BRAND,
		border: "rgba(0, 0, 0, 0.08)",
	},
};
// endregion

// region Component
const RootLayout = () => {
	const colorScheme = useColorScheme();

	return (
		<GestureHandlerRootView style={styles.container}>
			<ThemeProvider
				value={colorScheme === "dark" ? RunForceDark : RunForceLight}
			>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(tabs)" />
					<Stack.Screen
						name="tracking"
						options={{
							presentation: "fullScreenModal",
							animation: "slide_from_bottom",
							gestureEnabled: false,
						}}
					/>
				</Stack>
				<StatusBar style="auto" />
			</ThemeProvider>
		</GestureHandlerRootView>
	);
};
// endregion

export default RootLayout;

// region Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
// endregion



============================================================
FILE: app/%28tabs%29/_layout.tsx
Hash: b6c4770
============================================================
import { HapticTab } from "@/components/haptic-tab";
import { BRAND, Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

// region Component
const TabLayout = () => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "dark"];

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: BRAND,
				tabBarInactiveTintColor: colors.tabIconDefault,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarStyle: {
					backgroundColor: colors.background,
					borderTopColor: colors.border,
					borderTopWidth: 1,
					height: 80,
					paddingBottom: 20,
					paddingTop: 8,
				},
				tabBarLabelStyle: {
					fontSize: 10,
					fontWeight: "700",
					textTransform: "uppercase",
					letterSpacing: 0.5,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="records"
				options={{
					title: "Records",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="chart-bar"
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
};
// endregion

export default TabLayout;



============================================================
FILE: app/%28tabs%29/index.tsx
Hash: b41c4a7
============================================================
export { default } from "@/views/home-screen";



============================================================
FILE: app/%28tabs%29/records.tsx
Hash: 4b4333e
============================================================
export { default } from "@/views/records-screen";



============================================================
FILE: app/tracking.tsx
Hash: 9f36d12
============================================================
export { default } from "@/views/tracking-screen";



============================================================
FILE: .github/copilot-instructions.md
Hash: 640db83
============================================================
---
description: Guidelines, persona, and full project architecture for the RunForce Tracker app.
applyTo: "**"
---

# Persona

You are a Principal Senior Expert React Native Software Engineer working on the **RunForce Tracker** app — a real-time speed and distance tracker for competitive runners, police exam aspirants, marathon runners, and athletes.

# Core Principles

1. **Performance First**: Always consider React Native performance implications (JS thread vs UI thread, Hermes optimization, avoiding unnecessary re-renders).
2. **Modern Practices**: Use functional components (Arrow Functions), hooks, and strict TypeScript.
3. **Architecture**: Keep business logic separated from UI components.
4. **Styling**: Use React Native's `StyleSheet.create` natively.

# Expected Behavior

- When analyzing code or suggesting changes, proactively call out architectural flaws or potential JS thread bottlenecks.
- Provide clean, maintainable, and highly optimized code without over-engineering.
- If you see deprecated APIs or poor dependency management, suggest immediate modern alternatives.

---

# Copilot Instructions — RunForce App

## Code Style Conventions

**Imports — always single-line per source.** All named imports from the same module must stay on one line. Never break named imports across multiple lines.

**TypeScript — always use strict typing.** Avoid `any` and prefer explicit types/interfaces. Use type inference only when it enhances readability.

**Functions — always use arrow functions for component definitions and callbacks.** Avoid function declarations.

**Component structure — always define components in the following order: 1) imports, 2) types/interfaces, 3) component definition, 4) styles.** This keeps files organized and predictable.

**Code regions — wrap every logical block of changes in a region/endregion pair.** Use a short, descriptive label. Do not add inline comments explaining what the code does:

```ts
// region Functions
const onStart = useCallback(() => { ... }, []);
// endregion

// region Styles
const styles = StyleSheet.create({ ... });
// endregion
```

---

# Project Architecture — RunForce Tracker

## Tech Stack

| Layer         | Technology                                        |
| ------------- | ------------------------------------------------- |
| Framework     | Expo SDK 54 (React Native 0.81.5)                 |
| Language      | TypeScript 5.9 (strict mode)                      |
| Routing       | Expo Router v6 (file-based)                       |
| Animations    | React Native Reanimated 4                         |
| GPS / Sensors | `expo-location` (`BestForNavigation` accuracy)    |
| Persistence   | `@react-native-async-storage/async-storage`       |
| Icons         | `@expo/vector-icons` → `MaterialCommunityIcons`   |
| SVG           | `react-native-svg`                                |
| Gestures      | `react-native-gesture-handler`                    |
| Screen Wake   | `expo-keep-awake`                                 |
| Architecture  | New Architecture enabled (`newArchEnabled: true`) |

## Folder Structure

```
RunForce/
├── app/                          # Expo Router — file-based routes only
│   ├── _layout.tsx               # Root layout: GestureHandlerRootView, ThemeProvider, Stack navigator
│   ├── tracking.tsx              # Full-screen tracking modal (re-exports from views/)
│   └── (tabs)/
│       ├── _layout.tsx           # Tab navigator: Home tab, Records tab
│       ├── index.tsx             # Home tab (re-exports from views/)
│       └── records.tsx           # Records tab (re-exports from views/)
│
├── views/                        # Screen-level components — all business logic lives here
│   ├── home-screen.tsx           # Dashboard: speedometer gauge, metrics, activity selector, start FAB
│   ├── tracking-screen.tsx       # Active session: distance, timer, pace indicator, pause/stop controls
│   └── records-screen.tsx        # Session history: filterable list, glass cards, mini route maps
│
├── components/                   # Pure, reusable UI components — no business logic
│   ├── speed-gauge.tsx           # Animated SVG circular speedometer (SharedValue-driven)
│   ├── metric-card.tsx           # Large metric tile (label + SharedValue text + unit)
│   ├── small-metric-card.tsx     # Compact stat row card (label + SharedValue text + unit)
│   ├── activity-selector.tsx     # Run / Walk / Bike / Drive activity pill selector
│   ├── record-card.tsx           # Session history card with inline SVG mini-map
│   ├── app-header.tsx            # RunForce branded header with live status dot
│   └── ui/
│       ├── reanimated-text.tsx   # 60fps text via Animated.TextInput + useAnimatedProps
│       ├── icon-symbol.tsx       # Cross-platform icon abstraction
│       ├── icon-symbol.ios.tsx   # iOS-specific SF Symbol icon
│       └── collapsible.tsx       # Animated collapsible section
│
├── services/                     # Side-effect logic — GPS, storage (no UI)
│   ├── location-tracking.ts      # GPS hook: speed smoothing, Haversine distance, accuracy gating
│   └── session-storage.ts        # AsyncStorage CRUD for RunSession records
│
├── hooks/                        # Stateful logic hooks
│   ├── use-stopwatch.ts          # High-precision stopwatch using SharedValue + setInterval
│   ├── use-theme-colors.ts       # Returns typed color tokens for current color scheme
│   ├── use-color-scheme.ts       # Wraps RN useColorScheme
│   └── use-color-scheme.web.ts   # Web-specific color scheme override
│
├── types/
│   └── activity.ts               # Core domain types: RunSession, ActivityType, LocationPoint, GpsSignalStrength
│
├── constants/
│   └── theme.ts                  # Full design token system (Colors, Spacing, Radii, Shadows, Fonts)
│
└── assets/
    └── images/                   # App icons, splash screens
```

## Routing Map

```
/                   →  (tabs)/index     →  HomeScreen
/records            →  (tabs)/records   →  RecordsScreen
/tracking           →  tracking         →  TrackingScreen  [fullScreenModal, slide_from_bottom]
```

Route files under `app/` are thin re-export files (`export { default } from '@/views/...'`). All real logic is in `views/`.

## State & Data Flow

### Real-time Sensor Data (60fps, UI thread)

All live metrics use **Reanimated SharedValues** — they never touch the JS thread during updates:

```
expo-location.watchPositionAsync()
  → useLocationTracking() hook
      → currentSpeed (SharedValue<number>)
      → totalDistance (SharedValue<number>)
      → maxSpeed (SharedValue<number>)
      → avgSpeed (SharedValue<number>)
      → elevation (SharedValue<number>)
      → gpsSignal (SharedValue<GpsSignalStrength>)
  → useDerivedValue() → formatted strings
  → ReanimatedText (Animated.TextInput) → renders at 60fps on UI thread
```

### Timer

```
useStopwatch()
  → elapsed (SharedValue<number>)   ← updated by setInterval every 100ms
  → formatTime(elapsed.value)       ← worklet, runs on UI thread
```

### Session Persistence

```
TrackingScreen  →  onStop()
  → builds RunSession object
  → addSession()  →  AsyncStorage.setItem('@runforce_sessions')

RecordsScreen  →  useFocusEffect
  → loadSessions()  →  AsyncStorage.getItem('@runforce_sessions')
  → renders RecordCard list
```

## Key Files Reference

| File                                | Purpose                                                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `constants/theme.ts`                | Single source of truth for all colors, spacing, shadows. Always import from here — never hardcode values.                             |
| `types/activity.ts`                 | All domain types. Extend here when adding new entity shapes.                                                                          |
| `services/location-tracking.ts`     | GPS hook. Contains speed smoothing constant (`SPEED_SMOOTHING_FACTOR = 0.3`) and accuracy threshold (`MIN_ACCURACY_THRESHOLD = 50m`). |
| `services/session-storage.ts`       | AsyncStorage key is `@runforce_sessions`. All session reads/writes go through this file.                                              |
| `components/ui/reanimated-text.tsx` | The only way to render SharedValue strings at 60fps. Always use this instead of `<Text>` for live data.                               |
| `hooks/use-stopwatch.ts`            | `elapsed` is a SharedValue in milliseconds. `formatTime()` and `formatTimeCompact()` are worklets.                                    |

## Design System

The app uses a **cyber/neon-lime** visual language matching the provided HTML designs:

| Token            | Value                                            |
| ---------------- | ------------------------------------------------ |
| Brand / Accent   | `#80f20d` (neon lime)                            |
| Dark Background  | `#0a0a0a`                                        |
| Dark Surface     | `#121212`                                        |
| Dark Card        | `rgba(255,255,255,0.03)`                         |
| Light Background | `#ffffff`                                        |
| Light Surface    | `#f4f4f5`                                        |
| Neon Shadow      | `shadowColor: #80f20d, opacity: 0.4, radius: 15` |

Always consume colors via `useThemeColors()` — never reference `Colors.dark` or `Colors.light` directly inside components.

## Performance Rules

1. **Never use `useState` for real-time sensor data** (speed, distance, timer). Always use `useSharedValue`.
2. **`useDerivedValue` for derived strings** — keeps format logic on the UI thread.
3. **`ReanimatedText`** is the only component that can display a `SharedValue<string>` at 60fps.
4. **`useCallback` on all event handlers** passed as props to prevent child re-renders.
5. **`FlatList` with `keyExtractor` and memoized `renderItem`** for session lists.
6. **`activateKeepAwakeAsync()`** must be called at the start of every tracking session and `deactivateKeepAwake()` on cleanup.
7. **Location subscription cleanup** — always call `subscription.remove()` in `useEffect` cleanup.

## Activity Types

```ts
type ActivityType = "run" | "walk" | "bike" | "drive";
```

Each activity maps to a `MaterialCommunityIcons` icon: `run`, `walk`, `bike`, `car`.

## Adding a New Screen

1. Create the view in `views/my-screen.tsx`
2. Add a thin route file in `app/my-screen.tsx`:
   ```ts
   export { default } from "@/views/my-screen";
   ```
3. Register it in `app/_layout.tsx` under `<Stack>` if it's a modal, or in `app/(tabs)/_layout.tsx` if it's a tab.

## Adding a New Metric

1. Expose a new `SharedValue` from `useLocationTracking()` in `services/location-tracking.ts`
2. Create a `useDerivedValue` formatted string in the screen
3. Pass it to `<MetricCard>` or `<SmallMetricCard>` — never convert to state



============================================================
FILE: utils/tracking-helpers.ts
Hash: cd91f89
============================================================
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

