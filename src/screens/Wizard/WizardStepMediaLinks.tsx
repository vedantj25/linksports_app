import React from 'react';
import { View, ScrollView } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMyProfile, updateProfile } from '../../api/profile';
import { StepHeader, StepFooter } from './WizardShared';
import Input from '../../components/ui/Input';

export default function WizardStepMediaLinks({ navigation }: any) {
  const { data: me } = useQuery({ queryKey: ['meProfile'], queryFn: fetchMyProfile });
  const [form, setForm] = React.useState<any>({});

  React.useEffect(() => {
    if (me?.id) {
      setForm({
        website_url: me.website_url || '',
        instagram_url: me.instagram_url || '',
        youtube_url: me.youtube_url || ''
      });
    }
  }, [me]);

  const mut = useMutation({
    mutationFn: async () => updateProfile(me.id, form),
    onSuccess: () => navigation.navigate('WizardRole')
  });

  return (
    <View style={{ flex: 1 }}>
      <StepHeader title="Media & Links" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Input label="Website" value={form.website_url} onChangeText={(v) => setForm((p: any) => ({ ...p, website_url: v }))} />
        <Input label="Instagram" value={form.instagram_url} onChangeText={(v) => setForm((p: any) => ({ ...p, instagram_url: v }))} />
        <Input label="YouTube" value={form.youtube_url} onChangeText={(v) => setForm((p: any) => ({ ...p, youtube_url: v }))} />
      </ScrollView>
      <StepFooter onPrev={() => navigation.goBack()} onNext={() => mut.mutate()} />
    </View>
  );
}

