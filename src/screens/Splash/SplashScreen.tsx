import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import LoaderLottie from '../../components/ui/LoaderLottie';

export default function SplashScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Move into the unauthenticated flow
      navigation.reset({ index: 0, routes: [{ name: 'Intro' as never }] });
    }, 400);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={[theme.colors.brandGradientStart, theme.colors.brandGradientEnd]} style={styles.container}>
      <Text style={[styles.logo, { fontFamily: theme.typography.fontPrimaryBold }]}>LinkSports</Text>
      <LoaderLottie size={120} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 34, fontWeight: '800', marginBottom: 16, color: '#FFFFFF' }
});

