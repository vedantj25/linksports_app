import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from '../navigation';
import { useAuthStore } from '../stores/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ThemeProvider } from '../theme/ThemeProvider';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../theme/theme';

import { useFonts as useRoboto, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts as useOpenSans, OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { Text } from 'react-native';

const client = new QueryClient();

export function AppProvider() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const [ready, setReady] = React.useState(false);
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  React.useEffect(() => {
    (async () => {
      await hydrate();
      setReady(true);
    })();
  }, [hydrate]);

  const [robotoLoaded] = useRoboto({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });
  const [openSansLoaded] = useOpenSans({ OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold });

  if (!ready || !robotoLoaded || !openSansLoaded) return null;

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: theme.colors.primary, backgroundColor: theme.colors.card }}
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
        text1Style={{ fontSize: theme.typography.sizes.md, fontWeight: '700', color: theme.colors.text }}
        text2Style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.secondaryText }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: theme.colors.error, backgroundColor: theme.colors.card }}
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
        text1Style={{ fontSize: theme.typography.sizes.md, fontWeight: '700', color: theme.colors.text }}
        text2Style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.secondaryText }}
      />
    ),
    info: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: theme.colors.secondary, backgroundColor: theme.colors.card }}
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
        text1Style={{ fontSize: theme.typography.sizes.md, fontWeight: '700', color: theme.colors.text }}
        text2Style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.secondaryText }}
      />
    )
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryClientProvider client={client}>
          <StatusBar style="auto" />
          <RootNavigator />
          <Toast config={toastConfig} topOffset={theme.spacing.md} visibilityTime={2500} />
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

