import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

export default function IntroSliderScreen() {
  const nav = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>Connect. Grow. Play.</Text>
      <Text style={[styles.subtitle, { fontFamily: theme.typography.fontSecondary }]}>
        Discover players, coaches and clubs. Showcase achievements. Build your sports network.
      </Text>
      <View style={{ height: 20 }} />
      <Button title="Login" onPress={() => nav.navigate('Auth' as never)} />
      <View style={{ height: 8 }} />
      <Button title="Sign up" color="#FF6B00" onPress={() => nav.navigate('Auth' as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center' }
});

