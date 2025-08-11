import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../stores/auth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/ui/Screen';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const theme = useTheme();
  const login = useAuthStore((s) => s.login);
  const [identifier, setIdentifier] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async () => {
    setError(null);
    try {
      await login(identifier, password);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Toast.show({ type: 'success', text1: 'Signed in' });
    } catch (e: any) {
      setError(e?.response?.data?.error?.message || 'Login failed');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Toast.show({ type: 'error', text1: 'Login failed', text2: 'Please check your credentials' });
    }
  };

  return (
    <Screen style={[styles.container, { padding: theme.spacing.lg }]}>
      <Text style={{ fontFamily: theme.typography.fontPrimaryBold, fontSize: theme.typography.sizes.xl, marginBottom: theme.spacing.md, color: theme.colors.text }}>Sign in</Text>
      <Input
        placeholder="Email or Username"
        autoCapitalize="none"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <View>
        <Input
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable style={[styles.eye, { right: theme.spacing.md, top: 44 }]} onPress={() => setShowPassword(p => !p)} hitSlop={12}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={theme.colors.secondaryText} />
        </Pressable>
      </View>
      <Pressable hitSlop={8}>
        <Text style={{ color: theme.colors.secondary, alignSelf: 'flex-end', marginBottom: theme.spacing.sm }}>Forgot password?</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Sign in" onPress={onSubmit} style={{ width: '100%', marginTop: theme.spacing.xs }} />
      <Pressable style={{ marginTop: theme.spacing.sm }} hitSlop={8}>
        <Text style={{ color: theme.colors.text, opacity: 0.7, textAlign: 'center' }}>Create account</Text>
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
  eye: { position: 'absolute' }
});

