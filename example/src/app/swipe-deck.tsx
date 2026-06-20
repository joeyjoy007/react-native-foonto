import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeDeck } from 'react-native-foonto';

import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type Profile = { name: string; age: number; bio: string; color: string; emoji: string };

const PROFILES: Profile[] = [
  { name: 'Aria', age: 24, bio: 'Coffee & climbing', color: '#FF5864', emoji: '🧗‍♀️' },
  { name: 'Kai', age: 27, bio: 'Surfs at sunrise', color: '#208AEF', emoji: '🏄' },
  { name: 'Mira', age: 23, bio: 'Plant mom', color: '#34C759', emoji: '🪴' },
  { name: 'Leo', age: 29, bio: 'Amateur chef', color: '#FF9F0A', emoji: '🍳' },
  { name: 'Noa', age: 25, bio: 'Vinyl collector', color: '#AF52DE', emoji: '🎧' },
  { name: 'Sora', age: 26, bio: 'Night photographer', color: '#5AC8FA', emoji: '📷' },
  { name: 'Eli', age: 28, bio: 'Trail runner', color: '#FF6482', emoji: '🏃' },
  { name: 'Tara', age: 22, bio: 'Ceramics & tea', color: '#30B0C7', emoji: '🍵' },
  { name: 'Finn', age: 31, bio: 'Sailing the coast', color: '#FFD60A', emoji: '⛵' },
  { name: 'Zoe', age: 24, bio: 'Indie game dev', color: '#BF5AF2', emoji: '🎮' },
  { name: 'Ravi', age: 30, bio: 'Street food hunter', color: '#FF9500', emoji: '🌮' },
  { name: 'Luna', age: 26, bio: 'Astronomy nerd', color: '#64D2FF', emoji: '🔭' },
  { name: 'Theo', age: 27, bio: 'Jazz on weekends', color: '#FF453A', emoji: '🎷' },
  { name: 'Ivy', age: 25, bio: 'Watercolor artist', color: '#32D74B', emoji: '🎨' },
];

export default function SwipeDeckScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <SwipeDeck
          data={PROFILES}
          renderCard={(item) => (
            <View style={[styles.card, { backgroundColor: item.color }]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.65)']}
                style={styles.scrim}>
                <Text style={styles.name}>
                  {item.name}
                  <Text style={styles.age}>  {item.age}</Text>
                </Text>
                <Text style={styles.bio}>{item.bio}</Text>
              </LinearGradient>
            </View>
          )}
          onSwipe={(item, _index, direction) => {
            console.log(`Swiped ${item.name} ${direction}`);
          }}
          onEnd={() => console.log('Deck finished')}
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
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 96 },
  scrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.four,
    gap: Spacing.half,
  },
  name: { color: '#fff', fontSize: 30, fontWeight: '700' },
  age: { fontSize: 24, fontWeight: '400' },
  bio: { color: 'rgba(255,255,255,0.9)', fontSize: 15 },
});
