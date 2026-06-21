import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';

import {
  DEFAULT_ACTIVE_COLOR,
  DEFAULT_CARD_COLOR,
  DEFAULT_CARD_HEIGHT,
  DEFAULT_COLUMNS,
  DEFAULT_GAP,
  DEFAULT_INACTIVE_COLOR,
  DEFAULT_TEXT_COLOR,
  TRANSITION,
} from './constants';
import type { DistrictProps } from './types';
import { useDistrict } from './useDistrict';

/**
 * A grid of category cards that, when one is tapped, scales down in place and
 * collapses into a single horizontally-scrollable row of text labels, with a
 * content panel below. Tap a label to switch; tap the active label to expand
 * back into the grid. The morph runs on the UI thread via Reanimated layout
 * animations — the scroll container stays horizontal throughout, so nothing
 * remounts mid-morph.
 */
export function District({
  data,
  columns = DEFAULT_COLUMNS,
  gap = DEFAULT_GAP,
  cardHeight = DEFAULT_CARD_HEIGHT,
  activeColor = DEFAULT_ACTIVE_COLOR,
  inactiveColor = DEFAULT_INACTIVE_COLOR,
  cardColor = DEFAULT_CARD_COLOR,
  textColor = DEFAULT_TEXT_COLOR,
  onSelect,
  style,
}: DistrictProps) {
  const { selectedKey, width, onContainerLayout, select } =
    useDistrict(onSelect);
  const expanded = selectedKey != null;

  const cardWidth = useMemo(() => {
    if (!width) return undefined;
    return (width - gap * (columns - 1)) / columns;
  }, [width, gap, columns]);

  const selected = data.find((d) => d.key === selectedKey);

  return (
    <View style={style}>
      <ScrollView
        horizontal
        scrollEnabled={expanded}
        showsHorizontalScrollIndicator={false}
        onLayout={onContainerLayout}
      >
        <Animated.View
          layout={TRANSITION}
          style={
            expanded
              ? [styles.barInner, { gap }]
              : [styles.gridInner, { gap, width }]
          }
        >
          {cardWidth != null &&
            data.map((item) => {
              const isActive = item.key === selectedKey;
              return (
                <Animated.View key={item.key} layout={TRANSITION}>
                  <Pressable
                    onPress={() => select(item.key)}
                    style={({ pressed }) => (pressed ? styles.pressed : null)}
                  >
                    <View
                      style={
                        expanded
                          ? styles.label
                          : [
                              styles.card,
                              {
                                width: cardWidth,
                                height: cardHeight,
                                backgroundColor: item.color ?? cardColor,
                              },
                            ]
                      }
                    >
                      <Text
                        numberOfLines={expanded ? 1 : 2}
                        style={[
                          expanded ? styles.labelText : styles.cardText,
                          expanded
                            ? {
                                color: isActive ? activeColor : inactiveColor,
                                fontWeight: isActive ? '700' : '500',
                              }
                            : { color: textColor },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </View>
                  </Pressable>
                </Animated.View>
              );
            })}
        </Animated.View>
      </ScrollView>

      {expanded && selected && (
        <Animated.View
          key={selected.key}
          entering={FadeInDown.duration(280)}
          exiting={FadeOut.duration(140)}
          layout={TRANSITION}
          style={styles.content}
        >
          {selected.renderContent ? (
            selected.renderContent()
          ) : (
            <Text style={[styles.contentTitle, { color: textColor }]}>
              {selected.label}
            </Text>
          )}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gridInner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  barInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  card: {
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  label: {
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  labelText: {
    fontSize: 16,
  },
  content: {
    marginTop: 24,
    padding: 24,
    borderRadius: 18,
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  contentTitle: {
    fontSize: 28,
    fontWeight: '800',
  },
});
