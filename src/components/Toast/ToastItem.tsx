import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  LinearTransition,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from 'react-native-reanimated';

import { VARIANT_STYLES } from './constants';
import type { ToastData } from './types';

/** A single toast: springs in, auto-dismisses, and slides others into place. */
export function ToastItem({
  data,
  position,
  onDismiss,
}: {
  data: ToastData;
  position: 'top' | 'bottom';
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, data.duration);
    return () => clearTimeout(timer);
  }, [data.duration, onDismiss]);

  const variant = VARIANT_STYLES[data.variant];
  // Plain timing — slide straight in from the edge with no spring overshoot.
  const entering = (position === 'top' ? SlideInUp : SlideInDown).duration(240);
  const exiting = (position === 'top' ? SlideOutUp : SlideOutDown).duration(180);

  return (
    <Animated.View entering={entering} exiting={exiting} layout={LinearTransition.duration(200)}>
      <Pressable onPress={onDismiss} style={[styles.toast, { backgroundColor: variant.bg }]}>
        <View style={[styles.iconCircle, { borderColor: variant.fg }]}>
          <Text style={[styles.icon, { color: variant.fg }]}>{variant.icon}</Text>
        </View>
        <View style={styles.text}>
          {data.title ? (
            <Text style={[styles.title, { color: variant.fg }]} numberOfLines={1}>
              {data.title}
            </Text>
          ) : null}
          <Text style={[styles.message, { color: variant.fg }]} numberOfLines={2}>
            {data.message}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  iconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 13, fontWeight: '800', lineHeight: 16 },
  text: { flex: 1, gap: 1 },
  title: { fontSize: 15, fontWeight: '700', lineHeight: 20 },
  message: { fontSize: 14, lineHeight: 19 },
});
