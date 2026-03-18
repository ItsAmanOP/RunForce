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
