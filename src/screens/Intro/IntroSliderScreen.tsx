import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';
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
  const nav = useNavigation<any>();
  const [index, setIndex] = React.useState(0);
  const isLast = index === slides.length - 1;

  const onNext = () => setIndex((i) => Math.min(i + 1, slides.length - 1));
  const onSkip = () => nav.navigate('Auth' as never);
  const onGetStarted = () => nav.navigate('Auth' as never);

  const slide = slides[index];

  return (
    <LinearGradient colors={["#0b1930", "#06101f"]} style={styles.container}>
      <View style={styles.topActions}>
        <Pressable onPress={onSkip} hitSlop={12}><Text style={styles.skip}>Skip</Text></Pressable>
      </View>

      <View style={styles.slideContainer}>
        <View style={styles.iconWrap}>
          <Ionicons name={slide.icon as any} size={64} color="#FF6B00" />
        </View>
        <LoaderLottie size={72} />
        <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>{slide.title}</Text>
        <Text style={[styles.subtitle, { fontFamily: theme.typography.fontSecondary }]}>{slide.body}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        {!isLast ? (
          <Pressable style={styles.cta} onPress={onNext} android_ripple={{ color: '#ffffff22' }}>
            <Text style={styles.ctaText}>Next</Text>
          </Pressable>
        ) : (
          <View style={{ width: '100%' }}>
            <Pressable style={[styles.cta, styles.ctaPrimary]} onPress={onGetStarted} android_ripple={{ color: '#ffffff22' }}>
              <Text style={styles.ctaPrimaryText}>Continue with email</Text>
            </Pressable>
            <View style={{ height: 12 }} />
            <Pressable style={styles.cta} onPress={onSkip} android_ripple={{ color: '#ffffff22' }}>
              <Text style={styles.ctaText}>I already have an account</Text>
            </Pressable>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 48 },
  topActions: { alignItems: 'flex-end' },
  skip: { color: '#B8C4D9' },
  slideContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconWrap: {
    width: 96, height: 96, borderRadius: 48, backgroundColor: '#ffffff10',
    alignItems: 'center', justifyContent: 'center', marginBottom: 24
  },
  title: { fontSize: 28, color: '#FFFFFF', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#B8C4D9', textAlign: 'center', paddingHorizontal: 16 },
  footer: { paddingBottom: 16 },
  dots: { flexDirection: 'row', alignSelf: 'center', marginBottom: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ffffff33', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#FF6B00' },
  cta: {
    width: '100%', paddingVertical: 14, borderRadius: 12,
    borderWidth: 1, borderColor: '#2b3a55', alignItems: 'center'
  },
  ctaText: { color: '#D6DEED', fontSize: 16 },
  ctaPrimary: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  ctaPrimaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', textAlign: 'center' }
});

