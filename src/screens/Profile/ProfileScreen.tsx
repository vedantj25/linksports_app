import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { lightTheme as theme } from '../../theme/theme';
import { useAuthStore } from '../../stores/auth';
import ProfileIncompleteBanner from '../../components/Banners/ProfileIncompleteBanner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMyProfile, updateProfile } from '../../api/profile';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Screen from '../../components/ui/Screen';
import Avatar from '../../components/ui/Avatar';
import Chip from '../../components/ui/Chip';

export default function ProfileScreen({ navigation }: any) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const incomplete = !user?.profile_completed;
  const qc = useQueryClient();

  const { data: me, isLoading } = useQuery({ queryKey: ['meProfile'], queryFn: fetchMyProfile });
  const [editing, setEditing] = React.useState(false);
  const [form, setForm] = React.useState<any>({});

  React.useEffect(() => {
    if (me?.id) {
      setForm({
        display_name: me.display_name || '',
        bio: me.bio || '',
        location_city: me.location_city || '',
        location_state: me.location_state || '',
        website_url: me.website_url || '',
        instagram_url: me.instagram_url || '',
        youtube_url: me.youtube_url || ''
      });
    }
  }, [me]);

  const saveMutation = useMutation({
    mutationFn: async () => updateProfile(me.id, form),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['meProfile'] });
      setEditing(false);
      Alert.alert('Saved', 'Profile updated successfully');
    },
    onError: (e: any) => {
      Alert.alert('Error', e?.response?.data?.error?.message || 'Failed to update');
    }
  });

  if (isLoading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!me) {
    return (
      <Screen style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <EmptyState
          icon="alert-circle-outline"
          title="Failed to load profile"
          description="Please check your connection and try again."
          ctaText="Retry"
          onPressCta={() => qc.invalidateQueries({ queryKey: ['meProfile'] })}
        />
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      {incomplete && <ProfileIncompleteBanner onPress={() => navigation.navigate('Wizard')} />}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>Profile</Text>
        <Button title="Logout" variant="outline" onPress={logout} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Avatar size={64} name={me.display_name || `${me.first_name || ''} ${me.last_name || ''}`.trim()} uri={(me as any)?.avatar_url} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>{me.display_name || `${me.first_name || ''} ${me.last_name || ''}`}</Text>
          <View style={{ height: 6 }} />
          <Chip label={String(me.type)} selected style={{ alignSelf: 'flex-start' }} />
        </View>
      </View>

      {!editing ? (
        <ScrollView>
          <Card style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Basic</Text>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{me.display_name || `${me.first_name || ''} ${me.last_name || ''}`}</Text>
            <Text style={styles.label}>Bio</Text>
            <Text style={styles.value}>{me.bio || '-'}</Text>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{[me.location_city, me.location_state].filter(Boolean).join(', ') || '-'}</Text>
          </Card>

          <Card style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Links</Text>
            <Text style={styles.label}>Website</Text>
            <Text style={styles.value}>{me.website_url || '-'}</Text>
            <Text style={styles.label}>Instagram</Text>
            <Text style={styles.value}>{me.instagram_url || '-'}</Text>
            <Text style={styles.label}>YouTube</Text>
            <Text style={styles.value}>{me.youtube_url || '-'}</Text>
          </Card>

          <Card style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Role</Text>
            <Text style={styles.value}>{me.type}</Text>
          </Card>

          <Button title="Edit" onPress={() => setEditing(true)} />
        </ScrollView>
      ) : (
        <ScrollView>
          <Card style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Edit Profile</Text>
            <Input label="Display name" value={form.display_name} onChangeText={(v) => setForm((p: any) => ({ ...p, display_name: v }))} />
            <Input label="Bio" value={form.bio} onChangeText={(v) => setForm((p: any) => ({ ...p, bio: v }))} multiline />
            <Input label="City" value={form.location_city} onChangeText={(v) => setForm((p: any) => ({ ...p, location_city: v }))} />
            <Input label="State" value={form.location_state} onChangeText={(v) => setForm((p: any) => ({ ...p, location_state: v }))} />
          </Card>

          <Card style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Links</Text>
            <Input label="Website" value={form.website_url} onChangeText={(v) => setForm((p: any) => ({ ...p, website_url: v }))} />
            <Input label="Instagram" value={form.instagram_url} onChangeText={(v) => setForm((p: any) => ({ ...p, instagram_url: v }))} />
            <Input label="YouTube" value={form.youtube_url} onChangeText={(v) => setForm((p: any) => ({ ...p, youtube_url: v }))} />
          </Card>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Cancel" variant="outline" onPress={() => setEditing(false)} />
            <Button title={saveMutation.isPending ? 'Saving...' : 'Save'} onPress={() => saveMutation.mutate()} />
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  label: { color: '#666', marginTop: 8 },
  value: { color: theme.colors.text, marginTop: 2 }
});

