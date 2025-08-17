import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TopBar } from '../../components/TopBar';
import { ListItemMatch } from '../../components/ListItemMatch';
import { api } from '../../lib/api';
import { Match } from '../../lib/types';

export default function MatchesScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const matchList = await api.listMatches();
      setMatches(matchList);
    } catch (error) {
      console.error('Error loading matches:', error);
      Alert.alert('Error', 'Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  // Reload matches when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadMatches();
    }, [])
  );

  const handleMatchPress = (match: Match) => {
    // Navigate to chat
    // This will be handled by the ListItemMatch component
  };

  const renderMatch = ({ item }: { item: Match }) => (
    <ListItemMatch match={item} onPress={() => handleMatchPress(item)} />
  );

  if (loading) {
    return (
      <View className="flex-1 bg-bg">
        <TopBar title="Matches" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text text-lg">Loading matches...</Text>
        </View>
      </View>
    );
  }

  if (matches.length === 0) {
    return (
      <View className="flex-1 bg-bg">
        <TopBar title="Matches" />
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-text text-xl text-center mb-2">
            No matches yet
          </Text>
          <Text className="text-sub text-base text-center">
            Start swiping to make connections!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-bg">
      <TopBar title="Matches" />
      <FlatList
        data={matches}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
