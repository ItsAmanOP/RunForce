import type { RunSession } from "@/types/activity";
import AsyncStorage from "@react-native-async-storage/async-storage";

// region Constants
const STORAGE_KEY = "@runforce_sessions";
// endregion

// region Storage Functions
export const saveSessions = async (sessions: RunSession[]): Promise<void> => {
	try {
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
	} catch (error) {
		console.error("Failed to save sessions:", error);
	}
};

export const loadSessions = async (): Promise<RunSession[]> => {
	try {
		const data = await AsyncStorage.getItem(STORAGE_KEY);
		return data ? JSON.parse(data) : [];
	} catch (error) {
		console.error("Failed to load sessions:", error);
		return [];
	}
};

export const addSession = async (session: RunSession): Promise<void> => {
	const sessions = await loadSessions();
	sessions.unshift(session);
	await saveSessions(sessions);
};

export const deleteSession = async (id: string): Promise<void> => {
	const sessions = await loadSessions();
	const filtered = sessions.filter((s) => s.id !== id);
	await saveSessions(filtered);
};
// endregion
