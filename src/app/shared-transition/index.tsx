import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { TILES } from '@/constants/tiles';

export default function SharedTransitionGrid() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
          Tap a tile — it morphs into the detail screen.
        </ThemedText>
        <View style={styles.grid}>
          {TILES.map((tile) => (
            <Link
              key={tile.id}
              href={{ pathname: '/shared-transition/[id]', params: { id: tile.id } }}
              asChild>
              <Pressable style={styles.cell}>
                <SharedElement
                  id={`tile-${tile.id}`}
                  style={[styles.tile, { backgroundColor: tile.color }]}
                />
              </Pressable>
            </Link>
          ))}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: Spacing.four, gap: Spacing.three },
  hint: { textAlign: 'center' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    justifyContent: 'center',
  },
  cell: { width: '30%', aspectRatio: 1 },
  tile: { flex: 1, borderRadius: Spacing.four },
});
