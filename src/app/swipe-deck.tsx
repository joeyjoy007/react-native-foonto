import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeDeck } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type Profile = { name: string; color: string };

const PROFILES: Profile[] = [
  { name: 'Aria', color: '#FF5864' },
  { name: 'Kai', color: '#208AEF' },
  { name: 'Mira', color: '#34C759' },
  { name: 'Leo', color: '#FF9F0A' },
];

export default function SwipeDeckScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <SwipeDeck
          data={PROFILES}
          renderCard={(item) => (
            <View style={[styles.card, { backgroundColor: item.color }]}>
              <ThemedText style={styles.cardName}>{item.name}</ThemedText>
            </View>
          )}
          onSwipe={(item, _index, direction) => {
            console.log(`Swiped ${item.name} ${direction}`);
          }}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: Spacing.four },
  card: {
    flex: 1,
    borderRadius: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardName: { fontSize: 32, fontWeight: '700', color: '#fff' },
});
