import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>Discover</Text>
      <Text>Search players, coaches and clubs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 }
});

