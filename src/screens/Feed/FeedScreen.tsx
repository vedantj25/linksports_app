import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';
import { useAuthStore } from '../../stores/auth';
import ProfileIncompleteBanner from '../../components/Banners/ProfileIncompleteBanner';

export default function FeedScreen({ navigation }: any) {
  const user = useAuthStore((s) => s.user);
  const incomplete = !user?.profile_completed;
  return (
    <View style={styles.container}>
      {incomplete && (
        <ProfileIncompleteBanner onPress={() => navigation.navigate('Wizard')} />
      )}
      <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>Feed</Text>
      <Text>Coming soon: posts list</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 }
});

