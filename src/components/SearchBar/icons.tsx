import { StyleSheet, View } from 'react-native';

/** A magnifier glass drawn from two Views — no SVG dependency. */
export function SearchIcon({ color, size = 18 }: { color: string; size?: number }) {
  const ring = size * 0.7;
  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          width: ring,
          height: ring,
          borderRadius: ring / 2,
          borderWidth: 2,
          borderColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: size * 0.34,
          height: 2,
          borderRadius: 1,
          backgroundColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}

/** A small ✕ drawn from two crossed bars. */
export function CloseIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={[styles.bar, { width: size, backgroundColor: color, transform: [{ rotate: '45deg' }] }]} />
      <View style={[styles.bar, { width: size, backgroundColor: color, transform: [{ rotate: '-45deg' }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { position: 'absolute', height: 2, borderRadius: 1 },
});
