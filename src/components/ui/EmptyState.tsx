import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { lightTheme as theme } from '../../theme/theme';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  ctaText?: string;
  onPressCta?: () => void;
}

export default function EmptyState({ icon = 'information-circle-outline', title, description, ctaText, onPressCta }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={48} color={theme.colors.secondaryAlt} />
      </View>
      <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>{title}</Text>
      {!!description && <Text style={styles.desc}>{description}</Text>}
      {!!ctaText && !!onPressCta && (
        <Button title={ctaText} onPress={onPressCta} style={{ marginTop: 12 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 16 },
  iconWrap: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: '#f1f5ff',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12
  },
  title: { fontSize: 18, color: theme.colors.text, textAlign: 'center' },
  desc: { color: theme.colors.secondaryText, marginTop: 6, textAlign: 'center' }
});


