import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { ParallaxHeader } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export default function ParallaxHeaderScreen() {
  return (
    <ThemedView style={styles.container}>
      <ParallaxHeader
        headerHeight={300}
        renderHeader={() => (
          <LinearGradient colors={['#6d28d9', '#a855f7', '#ec4899']} style={styles.header}>
            <View style={styles.headerText}>
              <ThemedText style={styles.headerTitle}>Mount Foonto</ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Pull down to zoom · scroll for parallax
              </ThemedText>
            </View>
          </LinearGradient>
        )}
        contentContainerStyle={styles.content}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <ThemedView key={i} type="backgroundElement" style={styles.row}>
            <ThemedText style={styles.rowTitle}>Section {i + 1}</ThemedText>
            <ThemedText themeColor="textSecondary" type="small">
              The header above scrolls slower than this content, and scales up
              when you pull the list past the top.
            </ThemedText>
          </ThemedView>
        ))}
      </ParallaxHeader>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerText: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    gap: Spacing.one,
  },
  headerTitle: { fontSize: 34, lineHeight: 42, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: 14, lineHeight: 20, color: 'rgba(255,255,255,0.9)' },
  content: { padding: Spacing.four, gap: Spacing.three },
  row: { padding: Spacing.three, borderRadius: Spacing.three, gap: Spacing.one },
  rowTitle: { fontSize: 18, fontWeight: '600' },
});
