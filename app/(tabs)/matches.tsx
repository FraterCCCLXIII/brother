import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { TopBar } from '../../components/TopBar';
import { ListItemMatch } from '../../components/ListItemMatch';
import { api } from '../../lib/api';
import { Match } from '../../lib/types';

export default function MatchesScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const userMatches = await api.getMatches('me');
      setMatches(userMatches);
    } catch (error) {
      console.error('Error loading matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMatchPress = (match: Match) => {
    // Navigate to chat screen
    router.push(`/chat/${match.id}`);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000000', fontSize: 16 }}>Loading matches...</Text>
      </View>
    );
  }

  if (matches.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <TopBar title="Matches" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
          <View style={{
            width: 80,
            height: 80,
            backgroundColor: '#F8F9FA',
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            <Text style={{ color: '#6C757D', fontSize: 32, fontWeight: 'bold' }}>💬</Text>
          </View>
          <Text style={{
            color: '#000000',
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 12,
          }}>
            No Matches Yet
          </Text>
          <Text style={{
            color: '#6C757D',
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 24,
          }}>
            Start swiping to find new connections!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <TopBar title="Matches" />
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItemMatch
            match={item}
            onPress={() => handleMatchPress(item)}
          />
        )}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
}
