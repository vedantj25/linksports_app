import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { searchProfiles } from '../../api/profile';
import { fetchSports } from '../../api/sports';
import EmptyState from '../../components/ui/EmptyState';
import Screen from '../../components/ui/Screen';
import Skeleton from '../../components/ui/Skeleton';
import Input from '../../components/ui/Input';
import { useTheme } from '../../theme/ThemeProvider';

export default function DiscoverScreen() {
  const theme = useTheme();
  const [query, setQuery] = React.useState('');
  const [location, setLocation] = React.useState('');
  const { data, isLoading } = useQuery({ queryKey: ['profiles', query, location], queryFn: () => searchProfiles({ q: query, location, offset: 0 }) });
  const items = data?.profiles || [];

  return (
    <Screen style={[styles.container]}>
      <View style={{ paddingHorizontal: theme.spacing.lg }}>
        <Text style={{ fontFamily: theme.typography.fontPrimaryBold, fontSize: theme.typography.sizes.xl, marginBottom: theme.spacing.md, color: theme.colors.text }}>Discover</Text>
        <Input placeholder="Search by name or bio" value={query} onChangeText={setQuery} />
        <Input placeholder="Location" value={location} onChangeText={setLocation} />
      </View>
      {isLoading ? (
        <View style={{ paddingTop: theme.spacing.sm, paddingHorizontal: theme.spacing.lg }}>
          {[...Array(6)].map((_, i) => (
            <View key={i} style={{ marginBottom: theme.spacing.lg }}>
              <Skeleton width={220} height={14} />
              <View style={{ height: theme.spacing.xs }} />
              <Skeleton width={'100%'} height={48} radius={12} />
            </View>
          ))}
        </View>
      ) : items.length === 0 ? (
        <EmptyState
          icon="people-outline"
          title="No matching profiles"
          description="Try adjusting your search or location filters."
        />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentInsetAdjustmentBehavior="never"
          scrollIndicatorInsets={{ top: 0, bottom: 0 }}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.lg, borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
              <Text style={{ fontWeight: '600', color: theme.colors.text }}>{item.display_name || `${item.first_name} ${item.last_name}`}</Text>
              <Text style={{ color: theme.colors.secondaryText }}>{item.location_city}{item.location_state ? `, ${item.location_state}` : ''}</Text>
            </View>
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

