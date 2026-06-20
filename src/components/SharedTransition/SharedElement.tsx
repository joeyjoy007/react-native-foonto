import Animated from 'react-native-reanimated';

import type { SharedElementProps } from './types';

/**
 * Marks a node as a shared element. Render a `SharedElement` with the SAME `id`
 * on two native-stack screens and Reanimated animates the matching element
 * (position + size) as you navigate between them. Pass a `transition` (e.g. from
 * `sharedTransitions`) to customize the motion.
 *
 * Requires the `ENABLE_SHARED_ELEMENT_TRANSITIONS` Reanimated feature flag and a
 * native stack navigator. Not supported on web.
 */
export function SharedElement({ id, children, style, transition }: SharedElementProps) {
  return (
    <Animated.View sharedTransitionTag={id} sharedTransitionStyle={transition} style={style}>
      {children}
    </Animated.View>
  );
}
