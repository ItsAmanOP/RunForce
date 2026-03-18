import { HapticTab } from "@/components/haptic-tab";
import { BRAND, Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

// region Component
const TabLayout = () => {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "dark"];

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: BRAND,
				tabBarInactiveTintColor: colors.tabIconDefault,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarStyle: {
					backgroundColor: colors.background,
					borderTopColor: colors.border,
					borderTopWidth: 1,
					height: 80,
					paddingBottom: 20,
					paddingTop: 8,
				},
				tabBarLabelStyle: {
					fontSize: 10,
					fontWeight: "700",
					textTransform: "uppercase",
					letterSpacing: 0.5,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="records"
				options={{
					title: "Records",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="chart-bar"
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
};
// endregion

export default TabLayout;
