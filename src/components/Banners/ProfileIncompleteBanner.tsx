import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../ui/Button';
import { useTheme } from '../../theme/ThemeProvider';

export default function ProfileIncompleteBanner({ onPress }: { onPress: () => void }) {
  const theme = useTheme();
  return (
    <View style={{
      borderRadius: theme.radius.md,
      backgroundColor: `${theme.colors.primary}10`,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: `${theme.colors.primary}30`,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md
    }}>
      <Text style={{ color: theme.colors.primary, fontFamily: theme.typography.fontSecondarySemibold }}>Your profile is incomplete</Text>
      <Button title="Complete now" onPress={onPress} variant="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({});

