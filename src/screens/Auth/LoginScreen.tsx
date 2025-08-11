import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';
import { useAuthStore } from '../../stores/auth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/ui/Screen';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
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
    <Screen style={styles.container}>
      <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>Sign in</Text>
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
        <Pressable style={styles.eye} onPress={() => setShowPassword(p => !p)} hitSlop={12}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#8A8A8A" />
        </Pressable>
      </View>
      <Pressable hitSlop={8}>
        <Text style={styles.link}>Forgot password?</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Sign in" onPress={onSubmit} style={{ width: '100%', marginTop: 4 }} />
      <Pressable style={{ marginTop: 12 }} hitSlop={8}>
        <Text style={styles.ghostLink}>Create account</Text>
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
  link: { color: '#005BBB', alignSelf: 'flex-end', marginBottom: 8 },
  ghostLink: { color: '#121212', opacity: 0.7, textAlign: 'center' },
  eye: { position: 'absolute', right: 12, top: 44 },
  legal: { marginTop: 24 },
  legalText: { color: '#666', textAlign: 'center' },
  legalLink: { color: '#005BBB' }
});

