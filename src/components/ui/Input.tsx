import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: Props) {
  const theme = useTheme();
  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      {label ? <Text style={[styles.label, { fontFamily: theme.typography.fontSecondarySemibold, marginBottom: theme.spacing.xs, color: theme.colors.secondaryText }]}>{label}</Text> : null}
      <TextInput
        style={[
          {
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.card,
            padding: theme.spacing.md,
            borderRadius: theme.radius.md,
            color: theme.colors.text,
            fontSize: theme.typography.sizes.md
          },
          style
        ]}
        placeholderTextColor={theme.colors.secondaryText}
        {...props}
      />
      {error ? <Text style={[styles.error, { color: '#D91E18', marginTop: theme.spacing.xs }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {},
  error: {}
});

export default Input;

