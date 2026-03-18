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
