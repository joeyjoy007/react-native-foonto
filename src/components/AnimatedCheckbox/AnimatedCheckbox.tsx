import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useCheckboxAnimation } from './useCheckboxAnimation';
import type { AnimatedCheckboxProps } from './types';

/**
 * A tappable checkbox that fills and pops a checkmark when toggled. The
 * checkmark is two borders on a rotated view — no SVG dependency required.
 */
export function AnimatedCheckbox({
  checked,
  onChange,
  size = 28,
  color = '#6d28d9',
  borderColor = '#c4c4cc',
  checkColor = '#ffffff',
  duration = 180,
  disabled = false,
  style,
}: AnimatedCheckboxProps) {
  const progress = useCheckboxAnimation(checked, duration);

  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['transparent', color]),
    borderColor: interpolateColor(progress.value, [0, 1], [borderColor, color]),
    transform: [{ scale: interpolate(progress.value, [0, 0.5, 1], [1, 0.86, 1]) }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { rotate: '45deg' },
      { scale: interpolate(progress.value, [0, 1], [0.2, 1], Extrapolation.CLAMP) },
    ],
  }));

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      hitSlop={8}
      onPress={() => onChange?.(!checked)}
      style={[disabled && styles.disabled, style]}
    >
      <Animated.View
        style={[
          styles.box,
          { width: size, height: size, borderRadius: size * 0.28 },
          boxStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              width: size * 0.32,
              height: size * 0.56,
              borderColor: checkColor,
              borderRightWidth: Math.max(2, size * 0.1),
              borderBottomWidth: Math.max(2, size * 0.1),
              marginTop: -size * 0.08,
            },
            checkStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: { opacity: 0.45 },
});
