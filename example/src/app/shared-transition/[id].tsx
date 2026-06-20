import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement, sharedTransitions } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { TILES } from '@/constants/tiles';

export default function SharedTransitionDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tile = TILES.find((t) => t.id === id);
  const color = tile?.color ?? '#208AEF';

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <SharedElement
          id={`tile-${id}`}
          transition={tile ? sharedTransitions[tile.transition] : undefined}
          style={[styles.hero, { backgroundColor: color }]}
        />
        <ThemedText type="subtitle">Tile {id}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Animated from the grid using the “{tile?.transition ?? 'default'}” shared transition —
          Reanimated matched the two tile-{id} tags across navigation.
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: Spacing.four, gap: Spacing.four },
  hero: { height: 220, borderRadius: Spacing.four },
});
