import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import type { SkeletonProps } from './types';

const DEFAULT_COLORS: [string, string] = ['#E1E9EE', '#F4F8FB'];

/**
 * A shimmering placeholder block. Pick a shimmer style with `animation`:
 * - `shimmer` — a highlight band sweeps horizontally (default)
 * - `wave` — the same sweep on a diagonal
 * - `pulse` — the whole block breathes between the two colors
 * - `none` — static
 */
export function Skeleton({
  width = '100%',
  height = 16,
  radius = 8,
  circle = false,
  colors = DEFAULT_COLORS,
  duration = 1200,
  animation = 'shimmer',
  style,
}: SkeletonProps) {
  const t = useSharedValue(0);
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const sweeps = animation === 'shimmer' || animation === 'wave';

  useEffect(() => {
    if (animation === 'none') return;
    t.value = withRepeat(
      withTiming(1, {
        duration,
        easing: animation === 'pulse' ? Easing.inOut(Easing.ease) : Easing.linear,
      }),
      -1,
      animation === 'pulse', // pulse reverses each cycle; sweeps restart
    );
  }, [animation, duration, t]);

  const shape = circle
    ? { width: height, height, borderRadius: height / 2 }
    : { width, height, borderRadius: radius };

  const baseStyle = useAnimatedStyle(() => ({
    backgroundColor:
      animation === 'pulse'
        ? interpolateColor(t.value, [0, 1], [colors[0], colors[1]])
        : colors[0],
  }));

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          t.value,
          [0, 1],
          [-measuredWidth, measuredWidth],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Animated.View
      onLayout={(e) => setMeasuredWidth(e.nativeEvent.layout.width)}
      style={[styles.base, shape, baseStyle, style]}>
      {sweeps && (
        <Animated.View style={[StyleSheet.absoluteFill, sweepStyle]}>
          <LinearGradient
            colors={['transparent', colors[1], 'transparent'] as const}
            start={{ x: 0, y: animation === 'wave' ? 0 : 0.5 }}
            end={{ x: 1, y: animation === 'wave' ? 1 : 0.5 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: { overflow: 'hidden' },
});
