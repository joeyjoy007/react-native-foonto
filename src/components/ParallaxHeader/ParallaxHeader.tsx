import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useParallaxScroll } from './useParallaxScroll';
import type { ParallaxHeaderProps } from './types';

/**
 * A scroll view with a parallax + pull-to-zoom header. Drop any header content
 * in via `renderHeader`; your scrollable content goes in `children`.
 */
export function ParallaxHeader({
  headerHeight = 280,
  renderHeader,
  children,
  style,
  contentContainerStyle,
}: ParallaxHeaderProps) {
  const { scrollHandler, headerStyle } = useParallaxScroll(headerHeight);

  return (
    <View style={styles.flex}>
      <Animated.View
        pointerEvents="none"
        style={[styles.header, { height: headerHeight }, headerStyle]}
      >
        {renderHeader()}
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={style}
        contentContainerStyle={[{ paddingTop: headerHeight }, contentContainerStyle]}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
});
