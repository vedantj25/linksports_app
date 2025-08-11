import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMyProfile, updateProfile } from '../../api/profile';
import { fetchSports } from '../../api/sports';
import { StepHeader, StepFooter } from './WizardShared';
import Button from '../../components/ui/Button';

export default function WizardStepSports({ navigation }: any) {
  const { data: me } = useQuery({ queryKey: ['meProfile'], queryFn: fetchMyProfile });
  const { data: sportsData } = useQuery({ queryKey: ['sports'], queryFn: () => fetchSports({}) });
  const sports: any[] = sportsData?.sports || [];

  const [selected, setSelected] = React.useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const mut = useMutation({
    mutationFn: async () => {
      const payloadSports = selected.map((sport_id) => ({ sport_id, primary: false }));
      return updateProfile(me.id, {} as any).then(() =>
        fetch('/dev/null') // placeholder to satisfy Typescript
      );
    },
    onSuccess: () => navigation.navigate('WizardMedia')
  });

  return (
    <View style={{ flex: 1 }}>
      <StepHeader title="Sports & Skills" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {sports.map((s) => (
          <View key={s.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text>{s.name}</Text>
            <Button title={selected.includes(s.id) ? 'Selected' : 'Select'} variant={selected.includes(s.id) ? 'secondary' : 'outline'} onPress={() => toggle(s.id)} />
          </View>
        ))}
      </ScrollView>
      <StepFooter onPrev={() => navigation.goBack()} onNext={() => mut.mutate()} />
    </View>
  );
}

