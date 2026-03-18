import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { BRAND } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

// region Custom Themes
const RunForceDark = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		background: "#0a0a0a",
		card: "#0a0a0a",
		primary: BRAND,
		border: "rgba(255, 255, 255, 0.08)",
	},
};

const RunForceLight = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "#ffffff",
		card: "#ffffff",
		primary: BRAND,
		border: "rgba(0, 0, 0, 0.08)",
	},
};
// endregion

// region Component
const RootLayout = () => {
	const colorScheme = useColorScheme();

	return (
		<GestureHandlerRootView style={styles.container}>
			<ThemeProvider
				value={colorScheme === "dark" ? RunForceDark : RunForceLight}
			>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(tabs)" />
					<Stack.Screen
						name="tracking"
						options={{
							presentation: "fullScreenModal",
							animation: "slide_from_bottom",
							gestureEnabled: false,
						}}
					/>
				</Stack>
				<StatusBar style="auto" />
			</ThemeProvider>
		</GestureHandlerRootView>
	);
};
// endregion

export default RootLayout;

// region Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
// endregion
