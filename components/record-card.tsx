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
