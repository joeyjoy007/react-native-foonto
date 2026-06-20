import { useWindowDimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  Extrapolation,
  interpolate,
  runOnJS,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { SWIPE_OUT_DURATION, SWIPE_THRESHOLD } from './constants';
import type { SwipeDirection } from './types';

interface UseSwipeGestureParams {
  /** Called once the card has flung off screen, with the committed direction. */
  onSwipe: (direction: SwipeDirection) => void;
  /**
   * Deck-level cumulative count of swiped cards (fractional while dragging).
   * The deck reads it to place every card by `dataIndex - swiped`, which stays
   * continuous across the commit so nothing snaps or flickers.
   */
  swiped: SharedValue<number>;
  swipeThreshold?: number;
  disableTopSwipe?: boolean;
}

/**
 * Pan gesture + interpolated transform for the top card of a SwipeDeck.
 * Drives translation/rotation on the UI thread and advances `swiped` from its
 * resting integer toward the next one as the card is dragged and flung.
 */
export function useSwipeGesture({
  onSwipe,
  swiped,
  swipeThreshold = SWIPE_THRESHOLD,
  disableTopSwipe = false,
}: UseSwipeGestureParams) {
  const { width, height } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  // The resting `swiped` value captured when this drag begins (an integer).
  const start = useSharedValue(0);

  const xThreshold = width * swipeThreshold;
  const yThreshold = height * swipeThreshold;

  const pan = Gesture.Pan()
    .onBegin(() => {
      start.value = swiped.value;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      // Raise the stack proportionally to the larger of the two drag ratios.
      const ratio = Math.min(
        Math.max(
          Math.abs(event.translationX) / xThreshold,
          Math.abs(event.translationY) / yThreshold,
        ),
        1,
      );
      swiped.value = start.value + ratio;
    })
    .onEnd((event) => {
      const swipeX = Math.abs(translateX.value) > xThreshold;
      const swipeUp =
        !disableTopSwipe &&
        translateY.value < -yThreshold &&
        Math.abs(translateX.value) < xThreshold;

      if (swipeUp || swipeX) {
        const direction: SwipeDirection = swipeUp
          ? 'top'
          : translateX.value > 0
            ? 'right'
            : 'left';

        // Finish raising the next card exactly as the top card leaves.
        swiped.value = withTiming(start.value + 1, { duration: SWIPE_OUT_DURATION });

        if (swipeUp) {
          translateX.value = withTiming(translateX.value + event.velocityX * 0.05, {
            duration: SWIPE_OUT_DURATION,
          });
          translateY.value = withTiming(
            -height * 1.5,
            { duration: SWIPE_OUT_DURATION },
            (finished) => {
              if (finished) runOnJS(onSwipe)(direction);
            },
          );
        } else {
          translateY.value = withTiming(translateY.value + event.velocityY * 0.05, {
            duration: SWIPE_OUT_DURATION,
          });
          translateX.value = withTiming(
            Math.sign(translateX.value) * width * 1.5,
            { duration: SWIPE_OUT_DURATION },
            (finished) => {
              if (finished) runOnJS(onSwipe)(direction);
            },
          );
        }
      } else {
        // Not far enough — spring everything back to rest.
        translateX.value = withSpring(0, { damping: 18, stiffness: 180 });
        translateY.value = withSpring(0, { damping: 18, stiffness: 180 });
        swiped.value = withSpring(start.value, { damping: 18, stiffness: 180 });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width, 0, width],
      [-15, 0, 15],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotate}deg` },
      ],
    };
  });

  return { pan, cardStyle };
}
