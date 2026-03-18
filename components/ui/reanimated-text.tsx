import React from "react";
import { StyleSheet, TextInput, type TextStyle } from "react-native";
import Animated, {
    useAnimatedProps,
    type SharedValue,
} from "react-native-reanimated";

// region Animated TextInput
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
// endregion

// region Types
interface ReanimatedTextProps {
	text: SharedValue<string> | Readonly<SharedValue<string>>;
	style?: TextStyle | TextStyle[];
}
// endregion

// region Component
export const ReanimatedText: React.FC<ReanimatedTextProps> = ({
	text,
	style,
}) => {
	const animatedProps = useAnimatedProps(() => {
		return { text: text.value, defaultValue: text.value } as Record<
			string,
			string
		>;
	});

	return (
		<AnimatedTextInput
			underlineColorAndroid="transparent"
			editable={false}
			style={[styles.base, style]}
			animatedProps={animatedProps}
		/>
	);
};
// endregion

// region Styles
const styles = StyleSheet.create({
	base: {
		padding: 0,
		margin: 0,
		textAlign: "center",
	},
});
// endregion
