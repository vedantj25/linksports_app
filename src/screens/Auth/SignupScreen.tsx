import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';
import { useAuthStore } from '../../stores/auth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Screen from '../../components/ui/Screen';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';

export default function SignupScreen() {
  const register = useAuthStore((s) => s.register);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userType, setUserType] = React.useState<'player' | 'coach' | 'club'>('player');
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    try {
      await register({ email, password, user_type: userType });
      // Typically redirect to verify email screen; for now show message
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Toast.show({ type: 'success', text1: 'Registered', text2: 'Please verify your email' });
    } catch (e: any) {
      setError(e?.response?.data?.error?.message || 'Registration failed');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Toast.show({ type: 'error', text1: 'Registration failed' });
    }
  };

  return (
    <Screen style={styles.container}>
      <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>Create account</Text>
      <Input placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Text style={{ marginBottom: 8 }}>I am a</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        {(['player', 'coach', 'club'] as const).map(t => (
          <Pressable key={t} onPress={() => setUserType(t)} style={[styles.chip, userType === t && styles.chipActive]}>
            <Text style={[styles.chipText, userType === t && styles.chipTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Create account" onPress={onSubmit} style={{ width: '100%' }} />
      <Pressable style={{ marginTop: 12 }} hitSlop={8}>
        <Text style={styles.ghostLink}>I already have an account</Text>
      </Pressable>
      <View style={styles.legal}>
        <Text style={styles.legalText}>By continuing you agree to our <Text style={styles.legalLink}>Terms</Text> and <Text style={styles.legalLink}>Privacy Policy</Text>.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 12 },
  error: { color: 'red', marginBottom: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: '#E6E6E6', marginRight: 8 },
  chipActive: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  chipText: { color: '#121212', textTransform: 'capitalize' },
  chipTextActive: { color: '#FFFFFF' },
  ghostLink: { color: '#121212', opacity: 0.7, textAlign: 'center' },
  legal: { marginTop: 24 },
  legalText: { color: '#666', textAlign: 'center' },
  legalLink: { color: '#005BBB' }
});

