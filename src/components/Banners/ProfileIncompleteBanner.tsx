import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../ui/Button';
import { lightTheme as theme } from '../../theme/theme';

export default function ProfileIncompleteBanner({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontFamily: theme.typography.fontSecondarySemibold }]}>Your profile is incomplete</Text>
      <Button title="Complete now" onPress={onPress} variant="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.md,
    backgroundColor: '#FFF3E8',
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFE0C2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  text: { color: '#A15A00' }
});

