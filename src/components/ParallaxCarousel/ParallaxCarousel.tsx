import { useWindowDimensions } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import { ParallaxItem } from './ParallaxItem';
import type { ParallaxCarouselProps } from './types';

/**
 * A full-width, paging image carousel where each background parallaxes as you
 * swipe. Pass an Image (or any node) via `renderItem`; add captions via
 * `renderOverlay`.
 */
export function ParallaxCarousel<T>({
  data,
  renderItem,
  renderOverlay,
  height = 420,
  intensity = 0.3,
  onIndexChange,
  style,
}: ParallaxCarouselProps<T>) {
  const { width } = useWindowDimensions();

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      onMomentumScrollEnd={(e) => {
        onIndexChange?.(Math.round(e.nativeEvent.contentOffset.x / width));
      }}
      style={[{ height }, style]}
    >
      {data.map((item, index) => (
        <ParallaxItem
          key={index}
          index={index}
          scrollX={scrollX}
          width={width}
          height={height}
          intensity={intensity}
          overlay={renderOverlay?.(item, index)}
        >
          {renderItem(item, index)}
        </ParallaxItem>
      ))}
    </Animated.ScrollView>
  );
}
