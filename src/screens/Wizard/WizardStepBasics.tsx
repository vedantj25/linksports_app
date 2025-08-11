import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMyProfile, updateProfile } from '../../api/profile';
import { StepHeader, StepFooter } from './WizardShared';
import Input from '../../components/ui/Input';

export default function WizardStepBasics({ navigation }: any) {
  const { data: me } = useQuery({ queryKey: ['meProfile'], queryFn: fetchMyProfile });
  const [form, setForm] = React.useState<any>({});

  React.useEffect(() => {
    if (me?.id) {
      setForm({
        first_name: me.first_name || '',
        last_name: me.last_name || '',
        display_name: me.display_name || '',
        location_city: me.location_city || '',
        location_state: me.location_state || ''
      });
    }
  }, [me]);

  const mut = useMutation({
    mutationFn: async () => updateProfile(me.id, form),
    onSuccess: () => navigation.navigate('WizardSports')
  });

  return (
    <View style={{ flex: 1 }}>
      <StepHeader title="Basic Information" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Input label="First name" value={form.first_name} onChangeText={(v) => setForm((p: any) => ({ ...p, first_name: v }))} />
        <Input label="Last name" value={form.last_name} onChangeText={(v) => setForm((p: any) => ({ ...p, last_name: v }))} />
        <Input label="Display name" value={form.display_name} onChangeText={(v) => setForm((p: any) => ({ ...p, display_name: v }))} />
        <Input label="City" value={form.location_city} onChangeText={(v) => setForm((p: any) => ({ ...p, location_city: v }))} />
        <Input label="State" value={form.location_state} onChangeText={(v) => setForm((p: any) => ({ ...p, location_state: v }))} />
      </ScrollView>
      <StepFooter onNext={() => mut.mutate()} />
    </View>
  );
}

