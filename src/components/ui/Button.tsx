import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';

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
  const { container, text } = getStyles(variant, size, disabled);
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[container, style]}
      android_ripple={{ color: '#ffffff22' }}>
      <Text style={[text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

function getStyles(variant: Variant, size: Size, disabled?: boolean) {
  const base: ViewStyle = {
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center'
  };
  const paddings: Record<Size, ViewStyle> = {
    sm: { paddingVertical: 8, paddingHorizontal: 12 },
    md: { paddingVertical: 12, paddingHorizontal: 16 },
    lg: { paddingVertical: 16, paddingHorizontal: 20 }
  };
  const colors: Record<Variant, ViewStyle> = {
    primary: { backgroundColor: disabled ? '#ff6b0088' : theme.colors.primary },
    secondary: { backgroundColor: theme.colors.secondary },
    outline: { borderColor: theme.colors.border, borderWidth: 1, backgroundColor: 'transparent' },
    ghost: { backgroundColor: 'transparent' }
  };
  const textBase: TextStyle = {
    color: variant === 'outline' || variant === 'ghost' ? theme.colors.text : '#fff',
    fontFamily: theme.typography.fontPrimaryMedium,
    fontSize: 16
  };

  return StyleSheet.create({
    container: { ...base, ...paddings[size], ...colors[variant] },
    text: textBase
  });
}

export default Button;

