import { RecordCard } from "@/components/record-card";
import { BRAND, Radii } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { loadSessions } from "@/services/session-storage";
import type { ActivityType, RunSession } from "@/types/activity";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// region Types
type FilterType = "all" | ActivityType;
// endregion

// region Constants
const FILTERS: { type: FilterType; label: string }[] = [
	{ type: "all", label: "All" },
	{ type: "run", label: "Run" },
	{ type: "walk", label: "Walk" },
	{ type: "drive", label: "Drive" },
];
// endregion

// region Component
const RecordsScreen = () => {
	const colors = useThemeColors();
	const insets = useSafeAreaInsets();
	const [sessions, setSessions] = useState<RunSession[]>([]);
	const [activeFilter, setActiveFilter] = useState<FilterType>("all");

	useFocusEffect(
		useCallback(() => {
			const load = async () => {
				const data = await loadSessions();
				setSessions(data);
			};
			load();
		}, []),
	);

	const filteredSessions = sessions.filter(
		(s) => activeFilter === "all" || s.activityType === activeFilter,
	);

	const renderItem = useCallback(
		({ item }: { item: RunSession }) => <RecordCard session={item} />,
		[],
	);

	const keyExtractor = useCallback((item: RunSession) => item.id, []);

	return (
		<View style={[styles.screen, { backgroundColor: colors.background }]}>
			<View style={[styles.header, { paddingTop: insets.top + 8 }]}>
				<View style={styles.headerTop}>
					<View>
						<View style={styles.titleRow}>
							<MaterialCommunityIcons
								name="lightning-bolt"
								size={32}
								color={BRAND}
							/>
							<Text style={[styles.title, { color: colors.text }]}>
								Run
								<Text style={{ color: BRAND, fontStyle: "italic" }}>Force</Text>
							</Text>
						</View>
						<Text style={[styles.subtitle, { color: colors.textTertiary }]}>
							Performance Hub
						</Text>
					</View>
					<View
						style={[styles.avatar, { borderColor: `rgba(128, 242, 13, 0.3)` }]}
					>
						<MaterialCommunityIcons
							name="account"
							size={24}
							color={colors.textSecondary}
						/>
					</View>
				</View>
				<View
					style={[styles.tabBar, { borderBottomColor: colors.borderLight }]}
				>
					{FILTERS.map((filter) => (
						<Pressable
							key={filter.type}
							style={[
								styles.tab,
								activeFilter === filter.type && styles.tabActive,
							]}
							onPress={() => setActiveFilter(filter.type)}
						>
							<Text
								style={[
									styles.tabText,
									activeFilter === filter.type
										? { color: colors.text }
										: { color: colors.textTertiary },
								]}
							>
								{filter.label}
							</Text>
						</Pressable>
					))}
				</View>
			</View>
			<FlatList
				data={filteredSessions}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				contentContainerStyle={[
					styles.listContent,
					{ paddingBottom: insets.bottom + 100 },
				]}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<MaterialCommunityIcons
							name="run-fast"
							size={64}
							color={colors.textTertiary}
						/>
						<Text style={[styles.emptyTitle, { color: colors.text }]}>
							No Records Yet
						</Text>
						<Text
							style={[styles.emptySubtitle, { color: colors.textTertiary }]}
						>
							Start a session from the Home tab to see your records here.
						</Text>
					</View>
				}
			/>
		</View>
	);
};
// endregion

export default RecordsScreen;

// region Styles
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	header: {
		paddingHorizontal: 24,
		paddingBottom: 0,
	},
	headerTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	title: {
		fontSize: 28,
		fontWeight: "800",
		letterSpacing: -1,
		textTransform: "uppercase",
		fontStyle: "italic",
	},
	subtitle: {
		fontSize: 10,
		fontWeight: "600",
		textTransform: "uppercase",
		letterSpacing: 3,
		marginTop: 2,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: Radii.md,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	tabBar: {
		flexDirection: "row",
		gap: 24,
		marginTop: 24,
		borderBottomWidth: 1,
	},
	tab: {
		paddingBottom: 12,
	},
	tabActive: {
		borderBottomWidth: 2,
		borderBottomColor: BRAND,
	},
	tabText: {
		fontSize: 14,
		fontWeight: "700",
		textTransform: "uppercase",
		letterSpacing: -0.3,
	},
	listContent: {
		paddingHorizontal: 20,
		paddingTop: 16,
		gap: 16,
	},
	emptyContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 80,
		gap: 12,
	},
	emptyTitle: {
		fontSize: 20,
		fontWeight: "800",
	},
	emptySubtitle: {
		fontSize: 14,
		textAlign: "center",
		paddingHorizontal: 40,
	},
});
// endregion
