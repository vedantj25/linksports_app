import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuthStore } from '../../stores/auth';
import ProfileIncompleteBanner from '../../components/Banners/ProfileIncompleteBanner';
import EmptyState from '../../components/ui/EmptyState';
import Screen from '../../components/ui/Screen';
import Skeleton from '../../components/ui/Skeleton';

export default function FeedScreen({ navigation }: any) {
  const theme = useTheme();
  const user = useAuthStore((s) => s.user);
  const incomplete = !user?.profile_completed;
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    const t = setTimeout(() => { setLoading(false); setItems([]); }, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <Screen style={[styles.container, { padding: theme.spacing.lg }]}>
      {incomplete && (
        <ProfileIncompleteBanner onPress={() => navigation.navigate('Wizard')} />
      )}
      <Text style={{ fontFamily: theme.typography.fontPrimaryBold, fontSize: theme.typography.sizes.xl, marginBottom: theme.spacing.md, color: theme.colors.text }}>Feed</Text>
      {loading ? (
        <View style={{ paddingTop: theme.spacing.sm }}>
          {[...Array(6)].map((_, i) => (
            <View key={i} style={{ marginBottom: theme.spacing.lg }}>
              <Skeleton width={160} height={14} />
              <View style={{ height: theme.spacing.xs }} />
              <Skeleton width={'100%'} height={80} radius={12} />
            </View>
          ))}
        </View>
      ) : items.length === 0 ? (
        <EmptyState
          icon="newspaper-outline"
          title="No posts yet"
          description="Follow more people or come back later to see new posts."
          ctaText="Discover profiles"
          onPressCta={() => navigation.navigate('Discover')}
        />
      ) : (
        <Text>Posts will render here.</Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

