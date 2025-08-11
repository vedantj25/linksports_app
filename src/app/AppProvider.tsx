import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from '../navigation';
import { useAuthStore } from '../stores/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { lightTheme as theme } from '../theme/theme';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.primary, backgroundColor: '#FFFFFF' }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{ fontSize: 15, fontWeight: '700', color: theme.colors.text }}
      text2Style={{ fontSize: 13, color: '#666' }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#D91E18', backgroundColor: '#FFFFFF' }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{ fontSize: 15, fontWeight: '700', color: theme.colors.text }}
      text2Style={{ fontSize: 13, color: '#666' }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.secondary, backgroundColor: '#FFFFFF' }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{ fontSize: 15, fontWeight: '700', color: theme.colors.text }}
      text2Style={{ fontSize: 13, color: '#666' }}
    />
  )
};
import { useFonts as useRoboto, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts as useOpenSans, OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { Text } from 'react-native';

const client = new QueryClient();

export function AppProvider() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await hydrate();
      setReady(true);
    })();
  }, [hydrate]);

  const [robotoLoaded] = useRoboto({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });
  const [openSansLoaded] = useOpenSans({ OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold });

  if (!ready || !robotoLoaded || !openSansLoaded) return null;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={client}>
        <StatusBar style="auto" />
        <RootNavigator />
        <Toast config={toastConfig} topOffset={12} visibilityTime={2500} />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

