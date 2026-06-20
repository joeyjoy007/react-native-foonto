import {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type AnimatedStyle,
} from 'react-native-reanimated';
import type { ViewStyle } from 'react-native';

/**
 * Tracks scroll offset on the UI thread and derives the header transform:
 * the header translates up at half the scroll speed (parallax) and scales up
 * when the list is pulled down past the top (pull-to-zoom).
 */
export function useParallaxScroll(headerHeight: number): {
  scrollHandler: ReturnType<typeof useAnimatedScrollHandler>;
  headerStyle: AnimatedStyle<ViewStyle>;
} {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, headerHeight],
          [0, -headerHeight * 0.5],
          Extrapolation.CLAMP,
        ),
      },
      {
        scale: interpolate(
          scrollY.value,
          [-headerHeight, 0],
          [2.2, 1],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return { scrollHandler, headerStyle };
}
