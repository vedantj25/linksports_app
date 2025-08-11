import React from 'react';
import { ViewProps, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen({ style, children, ...props }: ViewProps) {
  return (
    <SafeAreaView style={[styles.container, style]} edges={["top", "bottom", "left", "right"]} {...props}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});


