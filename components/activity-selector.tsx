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
