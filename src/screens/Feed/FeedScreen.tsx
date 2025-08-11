import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>Feed</Text>
      <Text>Coming soon: posts list</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 }
});

