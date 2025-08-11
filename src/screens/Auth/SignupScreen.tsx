import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../stores/auth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Screen from '../../components/ui/Screen';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';

export default function SignupScreen() {
  const theme = useTheme();
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
    <Screen style={[styles.container, { padding: theme.spacing.lg }]}>
      <Text style={{ fontFamily: theme.typography.fontPrimaryBold, fontSize: theme.typography.sizes.xl, marginBottom: theme.spacing.md, color: theme.colors.text }}>Create account</Text>
      <Input placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Text style={{ marginBottom: theme.spacing.xs, color: theme.colors.text }}>I am a</Text>
      <View style={{ flexDirection: 'row', marginBottom: theme.spacing.md }}>
        {(['player', 'coach', 'club'] as const).map(t => (
          <Pressable
            key={t}
            onPress={() => setUserType(t)}
            style={{
              paddingVertical: theme.spacing.sm,
              paddingHorizontal: theme.spacing.md,
              borderRadius: theme.radius.lg,
              borderWidth: 1,
              borderColor: userType === t ? theme.colors.primary : theme.colors.border,
              backgroundColor: userType === t ? theme.colors.primary : theme.colors.card,
              marginRight: theme.spacing.sm
            }}
          >
            <Text style={{ color: userType === t ? '#FFFFFF' : theme.colors.text, textTransform: 'capitalize', fontSize: theme.typography.sizes.sm }}>{t}</Text>
          </Pressable>
        ))}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Create account" onPress={onSubmit} style={{ width: '100%' }} />
      <Pressable style={{ marginTop: theme.spacing.sm }} hitSlop={8}>
        <Text style={{ color: theme.colors.text, opacity: 0.7, textAlign: 'center' }}>I already have an account</Text>
      </Pressable>
      <View style={{ marginTop: theme.spacing.xl }}>
        <Text style={{ color: theme.colors.secondaryText, textAlign: 'center' }}>By continuing you agree to our <Text style={{ color: theme.colors.secondary }}>Terms</Text> and <Text style={{ color: theme.colors.secondary }}>Privacy Policy</Text>.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  error: { color: 'red', marginBottom: 8 },
  ghostLink: { color: '#121212', opacity: 0.7, textAlign: 'center' }
});

