import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ title, onPress, variant = 'primary', size = 'md', disabled, style, textStyle }: ButtonProps) {
  const theme = useTheme();
  const { container, text } = getStyles(theme, variant, size, disabled);
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[container, style]}
      android_ripple={{ color: '#ffffff22' }}>
      <Text style={[text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

function getStyles(theme: ReturnType<typeof useTheme>, variant: Variant, size: Size, disabled?: boolean) {
  const base: ViewStyle = {
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center'
  };
  const paddings: Record<Size, ViewStyle> = {
    sm: { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md },
    md: { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.lg },
    lg: { paddingVertical: theme.spacing.lg, paddingHorizontal: theme.spacing.xl }
  };
  const colors: Record<Variant, ViewStyle> = {
    primary: { backgroundColor: disabled ? `${theme.colors.primary}88` : theme.colors.primary },
    secondary: { backgroundColor: theme.colors.secondary },
    outline: { borderColor: theme.colors.border, borderWidth: 1, backgroundColor: 'transparent' },
    ghost: { backgroundColor: 'transparent' }
  };
  const textBase: TextStyle = {
    color: variant === 'outline' || variant === 'ghost' ? theme.colors.text : '#fff',
    fontFamily: theme.typography.fontPrimaryMedium,
    fontSize: theme.typography.sizes.lg
  };

  return StyleSheet.create({
    container: { ...base, ...paddings[size], ...colors[variant] },
    text: textBase
  });
}

export default Button;

