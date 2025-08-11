import React from 'react';
import { ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen({ style, children, ...props }: ViewProps) {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }, style]} edges={["top", "left", "right"]} {...props}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});


