import { useState } from 'react';
import { View } from 'react-native';

import { StackCardItem } from './StackCardItem';
import type { StackCardsProps } from './types';

/**
 * A tap-to-cycle card stack (wallet / notification style). Tapping the front
 * card sends it to the back and brings the next one forward.
 */
export function StackCards<T>({
  data,
  renderCard,
  visibleCount = 3,
  offset = 18,
  scaleStep = 0.06,
  cardHeight = 200,
  onCycle,
  style,
}: StackCardsProps<T>) {
  const [front, setFront] = useState(0);
  const len = data.length;

  function advance() {
    if (len <= 1) return;
    const next = (front + 1) % len;
    setFront(next);
    onCycle?.(next);
  }

  const stackHeight = cardHeight + (visibleCount - 1) * offset;

  return (
    <View style={[{ height: stackHeight }, style]}>
      {data.map((item, index) => {
        const pos = (index - front + len) % len;
        return (
          <StackCardItem
            key={index}
            pos={pos}
            total={len}
            visibleCount={visibleCount}
            offset={offset}
            scaleStep={scaleStep}
            cardHeight={cardHeight}
            onSendToBack={advance}
          >
            {renderCard(item, index)}
          </StackCardItem>
        );
      })}
    </View>
  );
}
