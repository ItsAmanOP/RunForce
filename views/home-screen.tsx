import { ActivitySelector } from "@/components/activity-selector";
import { AppHeader } from "@/components/app-header";
import { MetricCard } from "@/components/metric-card";
import { SmallMetricCard } from "@/components/small-metric-card";
import { SpeedGauge } from "@/components/speed-gauge";
import { ReanimatedText } from "@/components/ui/reanimated-text";
import { BRAND, Radii, Shadows } from "@/constants/theme";
import { formatTimeCompact, useStopwatch } from "@/hooks/use-stopwatch";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useLocationTracking } from "@/services/location-tracking";
import type { ActivityType } from "@/types/activity";
import { formatPace } from "@/utils/tracking-helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
	Alert,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
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
const HomeScreen = () => {
	const colors = useThemeColors();
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const [activityType, setActivityType] = useState<ActivityType>("free");
	const [isFreeTracking, setIsFreeTracking] = useState(false);

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
		start: startTimer,
		pause: pauseTimer,
		reset: resetTimer,
	} = useStopwatch();

	const isFreeMode = activityType === "free";

	// region Derived Values
	const idleSpeed = useSharedValue(0);
	const gaugeSpeed = isFreeMode ? currentSpeed : idleSpeed;

	const durationText = useDerivedValue(() => {
		if (isFreeTracking) {
			const compact = formatTimeCompact(elapsed.value);
			return compact.main;
		}
		return "00:00";
	});

	const durationFraction = useDerivedValue(() => {
		if (isFreeTracking) {
			const compact = formatTimeCompact(elapsed.value);
			return compact.fraction;
		}
		return ".00";
	});

	const distanceText = useDerivedValue(() => {
		if (isFreeTracking) {
			const distM = totalDistance.value;
			if (distM < 1000) return Math.round(distM).toString();
			return (distM / 1000).toFixed(1);
		}
		return "0";
	});

	const distanceUnitText = useDerivedValue((): string => {
		if (isFreeTracking) {
			return totalDistance.value < 1000 ? "METERS" : "KM";
		}
		return "METERS";
	});

	const avgSpeedText = useDerivedValue(() => {
		if (isFreeTracking) return avgSpeed.value.toFixed(1);
		return "--";
	});

	const elevationText = useDerivedValue(() => {
		if (isFreeTracking) return elevation.value.toString();
		return "--";
	});

	const paceText = useDerivedValue(() => {
		if (isFreeTracking) {
			const pace = formatPace(currentSpeed.value);
			return `${pace}/km`;
		}
		return "--'--\"/km";
	});

	const statusText = useDerivedValue((): string => {
		if (!isFreeTracking) return "Ready";
		if (currentSpeed.value > 0) return "Tracking";
		if (gpsSignal.value === "NONE") return "Acquiring GPS...";
		return "Ready";
	});
	// endregion

	// region Ping Animation
	const pingOpacity = useSharedValue(0);
	const pingStyle = useAnimatedStyle(() => ({ opacity: pingOpacity.value }));
	// endregion

	// region Handlers
	const onStartFreeTracking = useCallback(async () => {
		try {
			await activateKeepAwakeAsync();
			await startTracking();
			startTimer();
			setIsFreeTracking(true);
			pingOpacity.value = withRepeat(
				withTiming(1, { duration: 1000, easing: Easing.ease }),
				-1,
				true,
			);
		} catch (error) {
			console.warn("Failed to start free tracking:", error);
			Alert.alert(
				"Location Error",
				"Could not start tracking. Please ensure location permissions are granted.",
			);
		}
	}, [startTracking, startTimer, pingOpacity]);

	const onStopFreeTracking = useCallback(() => {
		pauseTimer();
		stopTracking();
		deactivateKeepAwake();
		setIsFreeTracking(false);
		pingOpacity.value = 0;
		resetTimer();
		resetTracking();
	}, [pauseTimer, stopTracking, resetTimer, resetTracking, pingOpacity]);

	const onStartPress = useCallback(() => {
		if (isFreeMode) {
			if (isFreeTracking) {
				onStopFreeTracking();
			} else {
				onStartFreeTracking();
			}
		} else {
			router.push({ pathname: "/tracking", params: { activityType } });
		}
	}, [
		router,
		activityType,
		isFreeMode,
		isFreeTracking,
		onStartFreeTracking,
		onStopFreeTracking,
	]);

	const onActivityChange = useCallback(
		(type: ActivityType) => {
			if (isFreeTracking) {
				onStopFreeTracking();
			}
			setActivityType(type);
		},
		[isFreeTracking, onStopFreeTracking],
	);
	// endregion

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
					<SpeedGauge speed={gaugeSpeed} />
				</View>
				{isFreeMode && isFreeTracking && (
					<View
						style={[
							styles.liveStatusBar,
							{
								backgroundColor: colors.surface,
								borderColor: `rgba(128, 242, 13, 0.2)`,
							},
						]}
					>
						<View style={styles.liveStatusRow}>
							<Animated.View style={[styles.liveDot, pingStyle]} />
							<ReanimatedText
								text={statusText}
								style={[styles.liveStatusText, { color: BRAND }]}
							/>
						</View>
						<ReanimatedText
							text={paceText}
							style={[styles.livePaceText, { color: colors.textTertiary }]}
						/>
					</View>
				)}
				<View style={styles.metricsSection}>
					<View style={styles.metricsRow}>
						<View style={styles.metricHalf}>
							<MetricCard
								label="Duration"
								value={durationText}
								unit="MIN:SEC"
								large
							/>
						</View>
						<View style={styles.metricHalf}>
							<MetricCard
								label="Distance"
								value={distanceText}
								unit="METERS"
								dynamicUnit={isFreeTracking ? distanceUnitText : undefined}
								large
							/>
						</View>
					</View>
					<View style={styles.metricsRow}>
						<View style={styles.metricHalf}>
							<SmallMetricCard
								label="Avg Speed"
								value={avgSpeedText}
								unit="KM/H"
							/>
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
				<ActivitySelector selected={activityType} onSelect={onActivityChange} />
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
						<View
							style={[
								styles.startButtonGlow,
								isFreeTracking && styles.stopButtonGlow,
							]}
						/>
						<View
							style={[
								isFreeTracking ? styles.stopButton : styles.startButton,
								Shadows.neonStrong,
							]}
						>
							<MaterialCommunityIcons
								name={isFreeTracking ? "stop" : "play"}
								size={32}
								color={isFreeTracking ? "#FFFFFF" : "#000000"}
							/>
							<Text
								style={[
									styles.startButtonLabel,
									isFreeTracking && styles.stopButtonLabel,
								]}
							>
								{isFreeTracking ? "Stop" : "Start"}
							</Text>
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
	liveStatusBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: Radii.md,
		borderWidth: 1,
		marginBottom: 16,
	},
	liveStatusRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	liveDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: BRAND,
	},
	liveStatusText: {
		fontSize: 13,
		fontWeight: "700",
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	livePaceText: {
		fontSize: 13,
		fontWeight: "600",
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
	stopButtonGlow: {
		backgroundColor: "#FF4444",
	},
	startButton: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: BRAND,
		alignItems: "center",
		justifyContent: "center",
	},
	stopButton: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "#FF4444",
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
	stopButtonLabel: {
		color: "#FFFFFF",
	},
});
// endregion
