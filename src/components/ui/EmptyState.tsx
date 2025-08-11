import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';
import { useTheme } from '../../theme/ThemeProvider';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  ctaText?: string;
  onPressCta?: () => void;
}

export default function EmptyState({ icon = 'information-circle-outline', title, description, ctaText, onPressCta }: EmptyStateProps) {
  const theme = useTheme();
  return (
    <View style={[styles.container, { paddingVertical: theme.spacing.xl, paddingHorizontal: theme.spacing.lg }]}>
      <View style={[styles.iconWrap, { backgroundColor: `${theme.colors.secondaryAlt}20` }]}>
        <Ionicons name={icon} size={48} color={theme.colors.secondaryAlt} />
      </View>
      <Text style={{ fontFamily: theme.typography.fontPrimaryBold, fontSize: theme.typography.sizes.lg, color: theme.colors.text, textAlign: 'center' }}>{title}</Text>
      {!!description && <Text style={{ color: theme.colors.secondaryText, marginTop: theme.spacing.xs, textAlign: 'center' }}>{description}</Text>}
      {!!ctaText && !!onPressCta && (
        <Button title={ctaText} onPress={onPressCta} style={{ marginTop: theme.spacing.md }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  iconWrap: {
    width: 72, height: 72, borderRadius: 36,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12
  }
});


