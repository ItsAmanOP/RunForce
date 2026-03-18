import { ReanimatedText } from "@/components/ui/reanimated-text";
import { BRAND } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedProps,
    useDerivedValue,
    type SharedValue,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

// region Types
interface SpeedGaugeProps {
	speed: SharedValue<number>;
	maxSpeedRange?: number;
	size?: number;
}
// endregion

// region Animated SVG
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
// endregion

// region Component
const STROKE_WIDTH = 12;

export const SpeedGauge: React.FC<SpeedGaugeProps> = ({
	speed,
	maxSpeedRange = 80,
	size = 240,
}) => {
	const colors = useThemeColors();
	const radius = (size - STROKE_WIDTH * 2) / 2;
	const circumference = 2 * Math.PI * radius;
	const center = size / 2;

	const animatedProps = useAnimatedProps(() => {
		const progress = Math.min(speed.value / maxSpeedRange, 1);
		const offset = circumference * (1 - progress);
		return { strokeDashoffset: offset };
	});

	const speedText = useDerivedValue(() => {
		return speed.value.toFixed(1);
	});

	const unitText = useDerivedValue(() => "KM/H");

	return (
		<View style={[styles.container, { width: size, height: size }]}>
			<View
				style={[
					styles.glowBackground,
					{
						width: size * 0.65,
						height: size * 0.65,
						backgroundColor: `rgba(${128}, ${242}, ${13}, 0.05)`,
					},
				]}
			/>
			<Svg width={size} height={size} style={styles.svg}>
				<Circle
					cx={center}
					cy={center}
					r={radius}
					stroke={colors.gaugeTrack}
					strokeWidth={STROKE_WIDTH}
					fill="none"
				/>
				<AnimatedCircle
					cx={center}
					cy={center}
					r={radius}
					stroke={BRAND}
					strokeWidth={STROKE_WIDTH}
					strokeLinecap="round"
					fill="none"
					strokeDasharray={circumference}
					animatedProps={animatedProps}
				/>
			</Svg>
			<View style={styles.labelContainer}>
				<Animated.Text
					style={[styles.labelCurrent, { color: colors.textTertiary }]}
				>
					Current
				</Animated.Text>
				<ReanimatedText
					text={speedText}
					style={[styles.speedValue, { color: colors.text }]}
				/>
				<ReanimatedText text={unitText} style={styles.unitLabel} />
			</View>
			<View style={styles.tickMarks}>
				<View
					style={[styles.tickTop, { backgroundColor: colors.textTertiary }]}
				/>
				<View
					style={[styles.tickBottom, { backgroundColor: colors.textTertiary }]}
				/>
				<View
					style={[styles.tickLeft, { backgroundColor: colors.textTertiary }]}
				/>
				<View
					style={[styles.tickRight, { backgroundColor: colors.textTertiary }]}
				/>
			</View>
		</View>
	);
};
// endregion

// region Styles
const styles = StyleSheet.create({
	container: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	glowBackground: {
		position: "absolute",
		borderRadius: 9999,
	},
	svg: {
		transform: [{ rotate: "-90deg" }],
	},
	labelContainer: {
		position: "absolute",
		alignItems: "center",
	},
	labelCurrent: {
		fontSize: 10,
		fontWeight: "800",
		textTransform: "uppercase",
		letterSpacing: 3,
		marginBottom: 2,
	},
	speedValue: {
		fontSize: 56,
		fontWeight: "900",
		letterSpacing: -2,
		fontVariant: ["tabular-nums"],
	},
	unitLabel: {
		fontSize: 12,
		fontWeight: "900",
		color: BRAND,
		letterSpacing: 4,
		marginTop: 4,
	},
	tickMarks: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0.2,
	},
	tickTop: {
		position: "absolute",
		top: 0,
		left: "50%",
		marginLeft: -1,
		width: 2,
		height: 12,
	},
	tickBottom: {
		position: "absolute",
		bottom: 0,
		left: "50%",
		marginLeft: -1,
		width: 2,
		height: 12,
	},
	tickLeft: {
		position: "absolute",
		left: 0,
		top: "50%",
		marginTop: -1,
		width: 12,
		height: 2,
	},
	tickRight: {
		position: "absolute",
		right: 0,
		top: "50%",
		marginTop: -1,
		width: 12,
		height: 2,
	},
});
// endregion
