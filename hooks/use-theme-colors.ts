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
