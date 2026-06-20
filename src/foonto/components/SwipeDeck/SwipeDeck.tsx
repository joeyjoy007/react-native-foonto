import { StyleSheet, View } from 'react-native';
import { SwipeCard } from './SwipeCard';
import type { SwipeDeckProps } from './types';

/**
 * A Tinder-style deck of swipeable cards.
 * TODO(impl): stacked rendering, gesture-driven swipe, threshold commit,
 * direction callbacks, and re-stacking as cards leave.
 */
export function SwipeDeck<T>({ data, renderCard, style, cardStyle }: SwipeDeckProps<T>) {
  return (
    <View style={[styles.deck, style]}>
      {data.map((item, index) => (
        <SwipeCard key={index} style={cardStyle}>
          {renderCard(item, index)}
        </SwipeCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  deck: { flex: 1 },
});
