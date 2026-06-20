import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackCards } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const CARDS = [
  { id: '1', name: 'Platinum', number: '•••• 4291', color: '#6d28d9' },
  { id: '2', name: 'Travel', number: '•••• 7720', color: '#0ea5e9' },
  { id: '3', name: 'Cashback', number: '•••• 1184', color: '#16a34a' },
  { id: '4', name: 'Business', number: '•••• 9035', color: '#f59e0b' },
];

export default function StackCardsScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <ThemedText type="small" themeColor="textSecondary" style={styles.center}>
          Swipe up (or tap) the top card to tuck it behind.
        </ThemedText>

        <View style={styles.stage}>
          <StackCards
            data={CARDS}
            cardHeight={200}
            offset={20}
            visibleCount={4}
            renderCard={(item) => (
              <View style={[styles.card, { backgroundColor: item.color }]}>
                <ThemedText style={styles.cardName}>{item.name}</ThemedText>
                <View style={styles.cardBottom}>
                  <ThemedText style={styles.cardNumber}>{item.number}</ThemedText>
                  <ThemedText style={styles.cardBrand}>foonto</ThemedText>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, padding: Spacing.four, gap: Spacing.five, justifyContent: 'center' },
  center: { textAlign: 'center' },
  stage: { paddingHorizontal: Spacing.two },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: Spacing.four,
    justifyContent: 'space-between',
  },
  cardName: { color: '#fff', fontSize: 22, fontWeight: '800', lineHeight: 28 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardNumber: { color: 'rgba(255,255,255,0.92)', fontSize: 18, letterSpacing: 2 },
  cardBrand: { color: 'rgba(255,255,255,0.92)', fontSize: 16, fontWeight: '700', fontStyle: 'italic' },
});
