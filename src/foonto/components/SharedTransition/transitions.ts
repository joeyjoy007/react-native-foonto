import { Easing, SharedTransition } from 'react-native-reanimated';

/**
 * Ready-made shared element transitions. Pass one to `SharedElement`'s
 * `transition` prop (on both screens). Omit it for Reanimated's built-in default.
 */
export const sharedTransitions = {
  /** Smooth ease-in-out, medium length. */
  gentle: SharedTransition.duration(450).easing(Easing.inOut(Easing.ease)),
  /** Quick and snappy. */
  snappy: SharedTransition.duration(220),
  /** Slow, cinematic ease-out. */
  lazy: SharedTransition.duration(750).easing(Easing.out(Easing.cubic)),
  /** Springy, with a little overshoot. */
  bouncy: SharedTransition.duration(600).springify().damping(14).stiffness(140),
};

export type SharedTransitionPreset = keyof typeof sharedTransitions;
