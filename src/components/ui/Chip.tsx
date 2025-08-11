import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Props {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Chip({ label, selected, onPress, style, textStyle }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.base, selected ? styles.selected : styles.unselected, style]}
      android_ripple={{ color: '#00000011', borderless: false }}>
      <Text style={[styles.text, selected ? styles.textSelected : styles.textUnselected, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1 },
  unselected: { borderColor: '#e6e6e6', backgroundColor: '#ffffff' },
  selected: { borderColor: '#FF6B00', backgroundColor: '#FF6B00' },
  text: { fontSize: 12, textTransform: 'capitalize' },
  textUnselected: { color: '#121212' },
  textSelected: { color: '#ffffff' }
});


