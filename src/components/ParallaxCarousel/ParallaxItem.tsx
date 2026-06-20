import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { ParallaxItemProps } from './types';

/**
 * One full-width page. Its background layer shifts horizontally against the
 * scroll (parallax); a slight scale keeps the edges covered while it moves.
 */
export function ParallaxItem({
  index,
  scrollX,
  width,
  height,
  intensity,
  children,
  overlay,
}: ParallaxItemProps) {
  const bgStyle = useAnimatedStyle(() => {
    const input = [(index - 1) * width, index * width, (index + 1) * width];
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            input,
            [-width * intensity, 0, width * intensity],
            Extrapolation.CLAMP,
          ),
        },
        { scale: 1 + intensity },
      ],
    };
  });

  return (
    <View style={{ width, height, overflow: 'hidden' }}>
      <Animated.View style={[StyleSheet.absoluteFill, bgStyle]}>{children}</Animated.View>
      {overlay ? <View style={StyleSheet.absoluteFill}>{overlay}</View> : null}
    </View>
  );
}
