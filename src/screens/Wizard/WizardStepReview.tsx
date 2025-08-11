import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMyProfile, completeProfileSetup } from '../../api/profile';
import { StepHeader, StepFooter } from './WizardShared';

export default function WizardStepReview({ navigation }: any) {
  const { data: me } = useQuery({ queryKey: ['meProfile'], queryFn: fetchMyProfile });
  const qc = useQueryClient();
  const mut = useMutation({
    mutationFn: async () => completeProfileSetup(me.id, {}),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['meProfile'] });
      navigation.reset({ index: 0, routes: [{ name: 'App' }] });
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <StepHeader title="Review & Finish" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text>Review your details and finish setup.</Text>
      </ScrollView>
      <StepFooter onPrev={() => navigation.goBack()} onNext={() => mut.mutate()} nextLabel="Finish" />
    </View>
  );
}

