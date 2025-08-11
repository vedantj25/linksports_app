import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from '../navigation';
import { useAuthStore } from '../stores/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={client}>
        <RootNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

