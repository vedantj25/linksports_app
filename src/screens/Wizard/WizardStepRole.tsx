import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMyProfile, updateProfile } from '../../api/profile';
import { StepHeader, StepFooter } from './WizardShared';
import Input from '../../components/ui/Input';

export default function WizardStepRole({ navigation }: any) {
  const { data: me } = useQuery({ queryKey: ['meProfile'], queryFn: fetchMyProfile });
  const [form, setForm] = React.useState<any>({});

  const type = me?.type as 'PlayerProfile' | 'CoachProfile' | 'ClubProfile' | undefined;

  const mut = useMutation({
    mutationFn: async () => updateProfile(me.id, form),
    onSuccess: () => navigation.navigate('WizardReview')
  });

  return (
    <View style={{ flex: 1 }}>
      <StepHeader title="Role Details" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {type === 'PlayerProfile' && (
          <>
            <Input label="Height (cm)" keyboardType="numeric" onChangeText={(v) => setForm((p: any) => ({ ...p, height_cm: Number(v) }))} />
            <Input label="Weight (kg)" keyboardType="numeric" onChangeText={(v) => setForm((p: any) => ({ ...p, weight_kg: Number(v) }))} />
          </>
        )}
        {type === 'CoachProfile' && (
          <>
            <Input label="Experience (years)" keyboardType="numeric" onChangeText={(v) => setForm((p: any) => ({ ...p, experience_years: Number(v) }))} />
            <Input label="Hourly Rate" keyboardType="numeric" onChangeText={(v) => setForm((p: any) => ({ ...p, hourly_rate: Number(v) }))} />
          </>
        )}
        {type === 'ClubProfile' && (
          <>
            <Input label="Club Name" onChangeText={(v) => setForm((p: any) => ({ ...p, club_name: v }))} />
            <Input label="Establishment Year" keyboardType="numeric" onChangeText={(v) => setForm((p: any) => ({ ...p, establishment_year: Number(v) }))} />
          </>
        )}
        {!type && <Text>Select a role on web or contact support</Text>}
      </ScrollView>
      <StepFooter onPrev={() => navigation.goBack()} onNext={() => mut.mutate()} />
    </View>
  );
}

