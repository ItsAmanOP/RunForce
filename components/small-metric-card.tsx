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
