import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  size?: number;
  name?: string;
  uri?: string | null;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Avatar({ size = 48, name, uri, style, textStyle }: Props) {
  const theme = useTheme();
  const initials = React.useMemo(() => {
    const n = (name || '').trim();
    if (!n) return '';
    const parts = n.split(' ').filter(Boolean);
    const first = parts[0]?.[0] || '';
    const last = parts[1]?.[0] || '';
    return (first + last).toUpperCase();
  }, [name]);

  if (uri) {
    return <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2, backgroundColor: theme.colors.border }, style]} />;
  }

  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2, backgroundColor: theme.colors.card }, style]}>
      {initials ? (
        <Text style={[styles.initials, { fontSize: size * 0.38, color: theme.colors.text }, textStyle]}>{initials}</Text>
      ) : (
        <Ionicons name="person" size={size * 0.6} color={theme.colors.secondaryText} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {},
  fallback: { alignItems: 'center', justifyContent: 'center' },
  initials: { fontWeight: '700' }
});


