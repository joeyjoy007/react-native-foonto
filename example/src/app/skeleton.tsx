import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Skeleton, SkeletonCard, SkeletonText, type SkeletonAnimation } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      {children}
    </View>
  );
}

const ANIMATIONS: SkeletonAnimation[] = ['shimmer', 'wave', 'pulse', 'none'];

export default function SkeletonScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.content}>
          <Section title="ANIMATION STYLES">
            {ANIMATIONS.map((animation) => (
              <View key={animation} style={styles.animationRow}>
                <ThemedText style={styles.animationLabel}>{animation}</ThemedText>
                <Skeleton animation={animation} height={20} radius={10} style={styles.flex} />
              </View>
            ))}
          </Section>

          <Section title="LIST ROWS">
            {[0, 1, 2].map((row) => (
              <View key={row} style={styles.listRow}>
                <Skeleton circle height={48} />
                <View style={styles.flex}>
                  <SkeletonText lines={2} lastLineWidth="50%" />
                </View>
              </View>
            ))}
          </Section>

          <Section title="PARAGRAPH">
            <SkeletonText lines={4} />
          </Section>

          <Section title="MEDIA CARD">
            <SkeletonCard />
          </Section>

          <Section title="GRID">
            <View style={styles.grid}>
              {[0, 1, 2, 3].map((cell) => (
                <Skeleton key={cell} animation="wave" height={88} radius={16} style={styles.gridCell} />
              ))}
            </View>
          </Section>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.five },
  section: { gap: Spacing.three },
  sectionTitle: { letterSpacing: 1 },
  animationRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  animationLabel: { width: 72, fontSize: 13, fontWeight: '600' },
  listRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three },
  gridCell: { width: '47%' },
});
