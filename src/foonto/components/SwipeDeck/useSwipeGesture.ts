import { useWindowDimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  Extrapolation,
  interpolate,
  runOnJS,
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
  swipeThreshold?: number;
  disableTopSwipe?: boolean;
}

/**
 * Pan gesture + interpolated transform for the top card of a SwipeDeck.
 * Drives translation/rotation on the UI thread and commits a swipe once the
 * release crosses the threshold, flinging the card off screen before resolving.
 */
export function useSwipeGesture({
  onSwipe,
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
    })
    .onEnd((event) => {
      const swipeX = Math.abs(translateX.value) > xThreshold;
      const swipeUp =
        !disableTopSwipe &&
        translateY.value < -yThreshold &&
        Math.abs(translateX.value) < xThreshold;

      if (swipeUp) {
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
