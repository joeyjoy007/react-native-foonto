import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useShimmer } from './useShimmer';
import type { SkeletonProps } from './types';

const DEFAULT_COLORS: [string, string] = ['#E1E9EE', '#F4F8FB'];

/** A shimmering placeholder block. The highlight sweeps left-to-right on a loop. */
export function Skeleton({
  width = '100%',
  height = 16,
  radius = 8,
  circle = false,
  colors = DEFAULT_COLORS,
  duration = 1200,
  style,
}: SkeletonProps) {
  const progress = useShimmer(duration);
  const [measuredWidth, setMeasuredWidth] = useState(0);

  const shape = circle
    ? { width: height, height, borderRadius: height / 2 }
    : { width, height, borderRadius: radius };

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [-measuredWidth, measuredWidth],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <View
      onLayout={(e) => setMeasuredWidth(e.nativeEvent.layout.width)}
      style={[styles.base, { backgroundColor: colors[0] }, shape, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, sweepStyle]}>
        <LinearGradient
          colors={['transparent', colors[1], 'transparent'] as const}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { overflow: 'hidden' },
});
