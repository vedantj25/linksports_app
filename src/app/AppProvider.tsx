import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from '../navigation';
import { useAuthStore } from '../stores/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
        <RootNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

