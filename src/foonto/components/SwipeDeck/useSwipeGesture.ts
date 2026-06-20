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
   * Deck-level 0→1 value describing how far the top card is toward a commit.
   * The deck reads it to promote the cards behind continuously (no post-swipe snap).
   */
  progress: SharedValue<number>;
  swipeThreshold?: number;
  disableTopSwipe?: boolean;
}

/**
 * Pan gesture + interpolated transform for the top card of a SwipeDeck.
 * Drives translation/rotation on the UI thread and, while dragging, writes a
 * normalized `progress` the deck uses to raise the cards behind in lockstep.
 */
export function useSwipeGesture({
  onSwipe,
  progress,
  swipeThreshold = SWIPE_THRESHOLD,
  disableTopSwipe = false,
}: UseSwipeGestureParams) {
  const { width, height } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const xThreshold = width * swipeThreshold;
  const yThreshold = height * swipeThreshold;

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      // Promote the stack proportionally to the larger of the two drag ratios.
      const ratio = Math.max(
        Math.abs(event.translationX) / xThreshold,
        Math.abs(event.translationY) / yThreshold,
      );
      progress.value = Math.min(ratio, 1);
    })
    .onEnd((event) => {
      const swipeX = Math.abs(translateX.value) > xThreshold;
      const swipeUp =
        !disableTopSwipe &&
        translateY.value < -yThreshold &&
        Math.abs(translateX.value) < xThreshold;

      if (swipeUp) {
        progress.value = withTiming(1, { duration: SWIPE_OUT_DURATION });
        translateX.value = withTiming(translateX.value + event.velocityX * 0.05, {
          duration: SWIPE_OUT_DURATION,
        });
        translateY.value = withTiming(
          -height * 1.5,
          { duration: SWIPE_OUT_DURATION },
          (finished) => {
            if (finished) runOnJS(onSwipe)('top');
          },
        );
      } else if (swipeX) {
        const direction: SwipeDirection = translateX.value > 0 ? 'right' : 'left';
        progress.value = withTiming(1, { duration: SWIPE_OUT_DURATION });
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
      } else {
        translateX.value = withSpring(0, { damping: 18, stiffness: 180 });
        translateY.value = withSpring(0, { damping: 18, stiffness: 180 });
        progress.value = withSpring(0, { damping: 18, stiffness: 180 });
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
