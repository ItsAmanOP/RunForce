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
