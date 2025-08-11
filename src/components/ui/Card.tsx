import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export function Card({ style, ...props }: ViewProps) {
  const theme = useTheme();
  return <View style={[{
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg
  }, style]} {...props} />;
}

const styles = StyleSheet.create({});

export default Card;

