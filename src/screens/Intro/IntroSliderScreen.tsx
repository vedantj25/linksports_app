import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import LoaderLottie from '../../components/ui/LoaderLottie';

const slides = [
  {
    title: 'Discover talent',
    body: 'Find players, coaches and clubs that match your goals.',
    icon: 'search'
  },
  {
    title: 'Grow your network',
    body: 'Connect and build meaningful sports relationships.',
    icon: 'people'
  },
  {
    title: 'Showcase achievements',
    body: 'Share highlights and track your progress over time.',
    icon: 'trophy'
  }
];

export default function IntroSliderScreen() {
  const theme = useTheme();
  const nav = useNavigation<any>();
  const [index, setIndex] = React.useState(0);
  const isLast = index === slides.length - 1;

  const onNext = () => setIndex((i) => Math.min(i + 1, slides.length - 1));
  const onSkip = () => nav.navigate('Auth' as never);
  const onGetStarted = () => nav.navigate('Auth' as never);

  const slide = slides[index];

  return (
    <LinearGradient colors={[theme.colors.brandGradientStart, theme.colors.brandGradientEnd]} style={[styles.container, { padding: theme.spacing.lg, paddingTop: theme.spacing.xl }]}>
      <View style={styles.topActions}>
        <Pressable onPress={onSkip} hitSlop={12}><Text style={{ color: '#B8C4D9' }}>Skip</Text></Pressable>
      </View>

      <View style={styles.slideContainer}>
        <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: '#ffffff10', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <Ionicons name={slide.icon as any} size={64} color="#FF6B00" />
        </View>
        <LoaderLottie size={72} />
        <Text style={{ fontSize: 28, color: '#FFFFFF', marginBottom: theme.spacing.sm, textAlign: 'center', fontFamily: theme.typography.fontPrimaryBold }}>{slide.title}</Text>
        <Text style={{ fontSize: 16, color: '#B8C4D9', textAlign: 'center', paddingHorizontal: theme.spacing.lg, fontFamily: theme.typography.fontSecondary }}>{slide.body}</Text>
      </View>

      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: theme.spacing.md }}>
          {slides.map((_, i) => (
            <View key={i} style={[{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#ffffff33', marginHorizontal: 4 }, i === index && { backgroundColor: '#FF6B00' }]} />
          ))}
        </View>
        {!isLast ? (
          <Pressable style={{ width: '100%', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: '#2b3a55', alignItems: 'center' }} onPress={onNext} android_ripple={{ color: '#ffffff22' }}>
            <Text style={{ color: '#D6DEED', fontSize: 16 }}>Next</Text>
          </Pressable>
        ) : (
          <View style={{ width: '100%' }}>
            <Pressable style={{ width: '100%', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: '#FF6B00', backgroundColor: '#FF6B00', alignItems: 'center' }} onPress={onGetStarted} android_ripple={{ color: '#ffffff22' }}>
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>Continue with email</Text>
            </Pressable>
            <View style={{ height: theme.spacing.sm }} />
            <Pressable style={{ width: '100%', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: '#2b3a55', alignItems: 'center' }} onPress={onSkip} android_ripple={{ color: '#ffffff22' }}>
              <Text style={{ color: '#D6DEED', fontSize: 16 }}>I already have an account</Text>
            </Pressable>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topActions: { alignItems: 'flex-end' },
  slideContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footer: { paddingBottom: 16 }
});

