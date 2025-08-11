import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';
import { useAuthStore } from '../../stores/auth';

export default function LoginScreen() {
  const login = useAuthStore((s) => s.login);
  const [identifier, setIdentifier] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    try {
      await login(identifier, password);
    } catch (e: any) {
      setError(e?.response?.data?.error?.message || 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>Sign in</Text>
      <TextInput placeholder="Email or Username" style={styles.input} autoCapitalize="none" value={identifier} onChangeText={setIdentifier} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#e5e5e5', padding: 12, borderRadius: 8, marginBottom: 12, backgroundColor: '#fff' },
  error: { color: 'red', marginBottom: 8 }
});

