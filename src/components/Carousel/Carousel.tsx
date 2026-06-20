import { useWindowDimensions } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import { CarouselItem } from './CarouselItem';
import type { CarouselProps } from './types';

/**
 * A center-focused, snapping carousel (Hotstar / App Store style). The middle
 * card sits at full scale; neighbors shrink and fade. Scale is interpolated
 * from the scroll position on the UI thread.
 */
export function Carousel<T>({
  data,
  renderItem,
  itemWidth,
  itemHeight = 360,
  spacing = 16,
  sideScale = 0.86,
  sideOpacity = 0.6,
  onIndexChange,
  style,
}: CarouselProps<T>) {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = itemWidth ?? Math.round(screenWidth * 0.7);
  const page = cardWidth + spacing;
  const sidePadding = (screenWidth - cardWidth) / 2 - spacing / 2;

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={page}
      decelerationRate="fast"
      disableIntervalMomentum
      onScroll={onScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingHorizontal: sidePadding, alignItems: 'center' }}
      onMomentumScrollEnd={(e) => {
        onIndexChange?.(Math.round(e.nativeEvent.contentOffset.x / page));
      }}
      style={[{ flexGrow: 0, height: itemHeight }, style]}
    >
      {data.map((item, index) => (
        <CarouselItem
          key={index}
          index={index}
          scrollX={scrollX}
          page={page}
          itemWidth={cardWidth}
          itemHeight={itemHeight}
          spacing={spacing}
          sideScale={sideScale}
          sideOpacity={sideOpacity}
        >
          {renderItem(item, index)}
        </CarouselItem>
      ))}
    </Animated.ScrollView>
  );
}
