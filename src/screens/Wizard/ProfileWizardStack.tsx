import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WizardStepBasics from './WizardStepBasics';
import WizardStepSports from './WizardStepSports';
import WizardStepMediaLinks from './WizardStepMediaLinks';
import WizardStepRole from './WizardStepRole';
import WizardStepReview from './WizardStepReview';

const Stack = createNativeStackNavigator();

export default function ProfileWizardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WizardBasics" component={WizardStepBasics} />
      <Stack.Screen name="WizardSports" component={WizardStepSports} />
      <Stack.Screen name="WizardMedia" component={WizardStepMediaLinks} />
      <Stack.Screen name="WizardRole" component={WizardStepRole} />
      <Stack.Screen name="WizardReview" component={WizardStepReview} />
    </Stack.Navigator>
  );
}

