import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  size?: number;
  name?: string;
  uri?: string | null;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Avatar({ size = 48, name, uri, style, textStyle }: Props) {
  const initials = React.useMemo(() => {
    const n = (name || '').trim();
    if (!n) return '';
    const parts = n.split(' ').filter(Boolean);
    const first = parts[0]?.[0] || '';
    const last = parts[1]?.[0] || '';
    return (first + last).toUpperCase();
  }, [name]);

  if (uri) {
    return <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }, style]} />;
  }

  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }, style]}>
      {initials ? (
        <Text style={[styles.initials, { fontSize: size * 0.38 }, textStyle]}>{initials}</Text>
      ) : (
        <Ionicons name="person" size={size * 0.6} color="#9AA6B2" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: '#e9eef5' },
  fallback: { backgroundColor: '#e9eef5', alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#4B5563', fontWeight: '700' }
});


