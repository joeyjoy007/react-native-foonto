import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MasonryGrid } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const COLORS = ['#6d28d9', '#2563eb', '#16a34a', '#f59e0b', '#db2777', '#0ea5e9', '#a855f7', '#ef4444'];
const HEIGHTS = [160, 220, 120, 200, 180, 140, 240, 160, 200, 130, 190, 170];

const ITEMS = HEIGHTS.map((h, i) => ({
  id: String(i),
  height: h,
  color: COLORS[i % COLORS.length],
  label: `#${i + 1}`,
}));

export default function MasonryGridScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <MasonryGrid
            data={ITEMS}
            keyExtractor={(it) => it.id}
            getHeight={(it) => it.height}
            columns={2}
            spacing={12}
            renderItem={(it) => (
              <View style={[styles.tile, { backgroundColor: it.color }]}>
                <ThemedText style={styles.tileLabel}>{it.label}</ThemedText>
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  scroll: { padding: Spacing.four },
  tile: {
    flex: 1,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLabel: { color: '#fff', fontSize: 20, fontWeight: '800' },
});
