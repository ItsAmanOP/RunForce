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
	} = useLocationTracking(activityType);
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
			try {
				await activateKeepAwakeAsync();
				await startTracking();
				startTimer();
			} catch (error) {
				console.warn("Failed to start tracking session:", error);
				Alert.alert(
					"Location Error",
					"Could not start location tracking. Please ensure location permissions are granted and try again.",
					[{ text: "Go Back", onPress: () => router.back() }],
				);
			}
		};
		init();
		return () => {
			deactivateKeepAwake();
			stopTracking();
		};
	}, [startTracking, startTimer, stopTracking, router]);

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
		if (currentSpeed.value > 0) return "Tracking";
		if (gpsSignal.value === "NONE") return "Acquiring GPS...";
		return "Ready";
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
									: activityType === "drive"
										? "Driving Session"
										: "Free Session"}
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
