import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import type { OtpCellProps } from './types';

/** One OTP cell. Pops with a spring bounce the moment it receives a digit. */
export function OtpCell({ char, filled, active, size, focusColor, secure }: OtpCellProps) {
  const scale = useSharedValue(1);
  const highlight = useSharedValue(active || filled ? 1 : 0);

  useEffect(() => {
    if (filled) {
      scale.value = withSequence(
        withTiming(1.18, { duration: 110 }),
        withSpring(1, { damping: 6, stiffness: 220 }),
      );
    }
  }, [filled, char, scale]);

  useEffect(() => {
    highlight.value = withTiming(active || filled ? 1 : 0, { duration: 150 });
  }, [active, filled, highlight]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: highlight.value > 0.5 ? focusColor : '#d4d4d8',
    borderWidth: 1.5 + highlight.value * 0.5,
  }));

  return (
    <Animated.View
      style={[
        styles.cell,
        { width: size, height: size, borderRadius: size * 0.22 },
        animatedStyle,
      ]}
    >
      {char ? (
        secure ? (
          <View style={[styles.dot, { backgroundColor: focusColor }]} />
        ) : (
          <Text style={[styles.char, { fontSize: size * 0.42 }]}>{char}</Text>
        )
      ) : active ? (
        <View style={[styles.caret, { backgroundColor: focusColor, height: size * 0.4 }]} />
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  char: { fontWeight: '700', color: '#18181b' },
  dot: { width: 12, height: 12, borderRadius: 6 },
  caret: { width: 2, borderRadius: 1, opacity: 0.7 },
});
