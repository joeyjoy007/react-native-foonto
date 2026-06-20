import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedCheckbox } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const TASKS = [
  { id: 'a', label: 'Install react-native-foonto', color: '#6d28d9' },
  { id: 'b', label: 'Add an AnimatedCheckbox', color: '#208AEF' },
  { id: 'c', label: 'Toggle with a tap', color: '#34C759' },
  { id: 'd', label: 'Ship it', color: '#FF9F0A' },
];

export default function AnimatedCheckboxScreen() {
  const [done, setDone] = useState<Record<string, boolean>>({ a: true });

  function toggle(id: string) {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <View style={styles.list}>
          {TASKS.map((task) => (
            <Pressable key={task.id} onPress={() => toggle(task.id)}>
              <ThemedView type="backgroundElement" style={styles.row}>
                <AnimatedCheckbox
                  checked={!!done[task.id]}
                  onChange={() => toggle(task.id)}
                  color={task.color}
                  size={26}
                />
                <ThemedText
                  style={[styles.label, done[task.id] && styles.labelDone]}
                  themeColor={done[task.id] ? 'textSecondary' : 'text'}
                >
                  {task.label}
                </ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </View>

        <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
          Tap a row or the box. The fill scales and the checkmark pops in.
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, padding: Spacing.four, gap: Spacing.four },
  list: { gap: Spacing.three, marginTop: Spacing.three },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  label: { fontSize: 16, flex: 1 },
  labelDone: { textDecorationLine: 'line-through' },
  hint: { textAlign: 'center' },
});
