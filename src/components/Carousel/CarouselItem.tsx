import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { CarouselItemProps } from './types';

/** A carousel card that scales and fades as it moves away from center. */
export function CarouselItem({
  index,
  scrollX,
  page,
  itemWidth,
  itemHeight,
  spacing,
  sideScale,
  sideOpacity,
  children,
}: CarouselItemProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const input = [(index - 1) * page, index * page, (index + 1) * page];
    return {
      transform: [
        {
          scale: interpolate(scrollX.value, input, [sideScale, 1, sideScale], Extrapolation.CLAMP),
        },
      ],
      opacity: interpolate(scrollX.value, input, [sideOpacity, 1, sideOpacity], Extrapolation.CLAMP),
    };
  });

  return (
    <Animated.View
      style={[{ width: itemWidth, height: itemHeight, marginHorizontal: spacing / 2 }, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
}
