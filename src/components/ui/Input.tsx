import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: Props) {
  return (
    <View style={styles.container}>
      {label ? <Text style={[styles.label, { fontFamily: theme.typography.fontSecondarySemibold }]}>{label}</Text> : null}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={theme.colors.secondaryText}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { marginBottom: 6, color: '#666' },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: theme.colors.card,
    padding: 12,
    borderRadius: theme.radius.md,
    color: theme.colors.text
  },
  error: { marginTop: 6, color: 'red' }
});

export default Input;

