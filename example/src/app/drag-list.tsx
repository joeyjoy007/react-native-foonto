import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconGripVertical } from '@tabler/icons-react-native';
import { DraggableList } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type Task = { id: string; label: string; color: string };

const INITIAL: Task[] = [
  { id: '1', label: 'Morning run', color: '#6d28d9' },
  { id: '2', label: 'Write docs', color: '#2563eb' },
  { id: '3', label: 'Review PRs', color: '#16a34a' },
  { id: '4', label: 'Team standup', color: '#f59e0b' },
  { id: '5', label: 'Ship release', color: '#db2777' },
  { id: '6', label: 'Read a book', color: '#0ea5e9' },
];

export default function DragListScreen() {
  const [tasks, setTasks] = useState(INITIAL);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
          Long-press a row, then drag to reorder.
        </ThemedText>

        <DraggableList
          data={tasks}
          keyExtractor={(t) => t.id}
          itemHeight={64}
          onReorder={setTasks}
          renderItem={(task) => (
            <View style={styles.rowInner}>
              <View style={[styles.dot, { backgroundColor: task.color }]} />
              <Text style={styles.label}>{task.label}</Text>
              <IconGripVertical size={22} color="#71717a" />
            </View>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, padding: Spacing.four, gap: Spacing.three },
  hint: { textAlign: 'center' },
  rowInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginVertical: 4,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
    backgroundColor: '#18181b',
  },
  dot: { width: 12, height: 12, borderRadius: 6 },
  label: { flex: 1, fontSize: 16, fontWeight: '600', color: '#fafafa' },
});
