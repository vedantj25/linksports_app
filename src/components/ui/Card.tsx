import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';

export function Card({ style, ...props }: ViewProps) {
  return <View style={[styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16
  }
});

export default Card;

