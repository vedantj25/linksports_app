import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { lightTheme as theme } from '../../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import LoaderLottie from '../../components/ui/LoaderLottie';

export default function SplashScreen() {
  const navigation = useNavigation();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Move into the unauthenticated flow
      navigation.reset({ index: 0, routes: [{ name: 'Intro' as never }] });
    }, 400);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={["#0b1930", "#06101f"]} style={styles.container}>
      <Text style={[styles.logo, { fontFamily: theme.typography.fontPrimaryBold }]}>LinkSports</Text>
      <LoaderLottie size={120} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 34, fontWeight: '800', marginBottom: 16, color: '#FFFFFF' }
});

