import { useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { OtpCell } from './OtpCell';
import type { OtpInputProps } from './types';

/**
 * A segmented OTP / PIN field. A single hidden TextInput captures input while
 * the visible cells render each digit and bounce as they fill.
 */
export function OtpInput({
  length = 4,
  value,
  onChange,
  onComplete,
  autoFocus = false,
  secure = false,
  cellSize = 56,
  cellGap = 12,
  focusColor = '#6d28d9',
  style,
}: OtpInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  function handleChange(text: string) {
    const next = text.replace(/[^0-9]/g, '').slice(0, length);
    onChange(next);
    if (next.length === length) onComplete?.(next);
  }

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      style={[styles.row, { gap: cellGap }, style]}
    >
      {Array.from({ length }).map((_, i) => (
        <OtpCell
          key={i}
          char={value[i] ?? ''}
          filled={i < value.length}
          active={focused && i === value.length}
          size={cellSize}
          focusColor={focusColor}
          secure={secure}
        />
      ))}

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        maxLength={length}
        autoFocus={autoFocus}
        caretHidden
        style={styles.hiddenInput}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
