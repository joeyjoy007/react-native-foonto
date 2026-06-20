import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSearch, IconX } from '@tabler/icons-react-native';
import { SearchBar } from 'react-native-foonto';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const FRUITS = [
  'Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Cranberry',
  'Date', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange', 'Peach',
  'Pear', 'Pineapple', 'Plum', 'Raspberry', 'Strawberry', 'Watermelon',
];

export default function SearchBarScreen() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FRUITS;
    return FRUITS.filter((f) => f.toLowerCase().includes(q));
  }, [query]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <View style={styles.bar}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search fruit…"
            renderIcon={(color) => <IconSearch size={22} color={color} />}
            renderClearIcon={() => <IconX size={20} color="#71717a" />}
          />
        </View>

        <View style={styles.list}>
          {results.map((item) => (
            <ThemedView key={item} type="backgroundElement" style={styles.item}>
              <ThemedText>{item}</ThemedText>
            </ThemedView>
          ))}
          {results.length === 0 && (
            <ThemedText themeColor="textSecondary" style={styles.empty}>
              No matches for “{query}”.
            </ThemedText>
          )}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, padding: Spacing.four, gap: Spacing.four },
  bar: { alignItems: 'flex-end' },
  list: { gap: Spacing.two },
  item: { padding: Spacing.three, borderRadius: Spacing.two },
  empty: { textAlign: 'center', marginTop: Spacing.four },
});
