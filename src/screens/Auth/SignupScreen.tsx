import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';
import { useAuthStore } from '../../stores/auth';

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
      alert('Registered. Please verify your email.');
    } catch (e: any) {
      setError(e?.response?.data?.error?.message || 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>Create account</Text>
      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <Text style={{ marginBottom: 8 }}>User Type (player/coach/club): {userType}</Text>
      {/* Simple toggle for MVP */}
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        {(['player','coach','club'] as const).map(t => (
          <View key={t} style={{ marginRight: 8 }}>
            <Button title={t} onPress={() => setUserType(t)} color={userType === t ? '#FF6B00' : undefined} />
          </View>
        ))}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Sign up" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#e5e5e5', padding: 12, borderRadius: 8, marginBottom: 12, backgroundColor: '#fff' },
  error: { color: 'red', marginBottom: 8 }
});

