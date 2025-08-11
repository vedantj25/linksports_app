import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface Props {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Chip({ label, selected, onPress, style, textStyle }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md, borderRadius: theme.radius.lg },
        selected
          ? { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary }
          : { borderColor: theme.colors.border, backgroundColor: theme.colors.card },
        style
      ]}
      android_ripple={{ color: '#00000011', borderless: false }}
    >
      <Text
        style={[
          styles.text,
          { fontSize: theme.typography.sizes.sm },
          selected ? { color: '#ffffff' } : { color: theme.colors.text },
          textStyle
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderWidth: 1 },
  text: { textTransform: 'capitalize' }
});


