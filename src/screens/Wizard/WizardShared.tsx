import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/ui/Button';
import { lightTheme as theme } from '../../theme/theme';

export function StepHeader({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>{title}</Text>
    </View>
  );
}

export function StepFooter({ onPrev, onNext, nextLabel = 'Next', prevLabel = 'Back' }: { onPrev?: () => void; onNext?: () => void; nextLabel?: string; prevLabel?: string }) {
  return (
    <View style={styles.footer}>
      {onPrev ? <Button title={prevLabel} variant="outline" onPress={onPrev} /> : <View style={{ width: 100 }} />}
      {onNext ? <Button title={nextLabel} onPress={onNext} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 16 },
  title: { fontSize: 22 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }
});

