import { useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { CloseIcon, SearchIcon } from './icons';
import { useSearchExpand } from './useSearchExpand';
import type { SearchBarProps } from './types';

/**
 * A search field that grows from a round icon button into a full-width input.
 * The whole bar's width animates between the collapsed size and the measured
 * container width; the input and clear button fade in with progress.
 */
export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
  onSubmit,
  collapsedSize = 48,
  duration = 280,
  tint = '#6d28d9',
  background = '#f4f4f5',
  textColor = '#18181b',
  placeholderColor = '#a1a1aa',
  clearOnCollapse = true,
  renderIcon,
  renderClearIcon,
  style,
}: SearchBarProps) {
  const inputRef = useRef<TextInput>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const { progress, open, expand, collapse } = useSearchExpand(duration);

  function onLayout(e: LayoutChangeEvent) {
    setMaxWidth(e.nativeEvent.layout.width);
  }

  function handleOpen() {
    expand();
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function handleClose() {
    inputRef.current?.blur();
    if (clearOnCollapse) onChangeText('');
    collapse();
  }

  const barStyle = useAnimatedStyle(() => ({
    width: maxWidth
      ? interpolate(progress.value, [0, 1], [collapsedSize, maxWidth])
      : collapsedSize,
  }));

  const fadeStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

  return (
    <View style={[styles.wrapper, style]} onLayout={onLayout}>
      <Animated.View
        style={[
          styles.bar,
          { height: collapsedSize, borderRadius: collapsedSize / 2, backgroundColor: background },
          barStyle,
        ]}
      >
        <Pressable
          onPress={open ? () => onSubmit?.(value) : handleOpen}
          style={[styles.iconButton, { width: collapsedSize, height: collapsedSize }]}
          hitSlop={6}
        >
          {renderIcon ? renderIcon(tint) : <SearchIcon color={tint} />}
        </Pressable>

        <Animated.View style={[styles.inputWrap, fadeStyle]} pointerEvents={open ? 'auto' : 'none'}>
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={() => onSubmit?.(value)}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            selectionColor={tint}
            returnKeyType="search"
            style={[styles.input, { color: textColor }]}
          />
        </Animated.View>

        {open && (
          <Pressable onPress={handleClose} style={styles.closeButton} hitSlop={6}>
            {renderClearIcon ? renderClearIcon() : <CloseIcon color="#71717a" />}
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  iconButton: { alignItems: 'center', justifyContent: 'center' },
  inputWrap: { flex: 1 },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#18181b',
    paddingVertical: 0,
  },
  closeButton: { paddingHorizontal: 14, height: '100%', justifyContent: 'center' },
});
