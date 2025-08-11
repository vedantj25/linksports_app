import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { searchProfiles } from '../../api/profile';
import { fetchSports } from '../../api/sports';
import EmptyState from '../../components/ui/EmptyState';
import Screen from '../../components/ui/Screen';
import Skeleton from '../../components/ui/Skeleton';
import Input from '../../components/ui/Input';
import { lightTheme as theme } from '../../theme/theme';

export default function DiscoverScreen() {
  const [query, setQuery] = React.useState('');
  const [location, setLocation] = React.useState('');
  const { data, isLoading } = useQuery({ queryKey: ['profiles', query, location], queryFn: () => searchProfiles({ q: query, location, offset: 0 }) });
  const items = data?.profiles || [];

  return (
    <Screen style={styles.container}>
      <Text style={[styles.title, { fontFamily: theme.typography.fontPrimaryBold }]}>Discover</Text>
      <Input placeholder="Search by name or bio" value={query} onChangeText={setQuery} />
      <Input placeholder="Location" value={location} onChangeText={setLocation} />
      {isLoading ? (
        <View style={{ paddingTop: 8 }}>
          {[...Array(6)].map((_, i) => (
            <View key={i} style={{ marginBottom: 16 }}>
              <Skeleton width={220} height={14} />
              <View style={{ height: 8 }} />
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
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
              <Text style={{ fontWeight: '600' }}>{item.display_name || `${item.first_name} ${item.last_name}`}</Text>
              <Text style={{ color: '#666' }}>{item.location_city}{item.location_state ? `, ${item.location_state}` : ''}</Text>
            </View>
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 }
});

