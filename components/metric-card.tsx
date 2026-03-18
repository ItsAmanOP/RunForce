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
