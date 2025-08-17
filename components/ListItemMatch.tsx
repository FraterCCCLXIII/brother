import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Match, Profile } from '../lib/types';
import { mockProfiles } from '../lib/mock';

interface ListItemMatchProps {
  match: Match;
  onPress: () => void;
}

export const ListItemMatch: React.FC<ListItemMatchProps> = ({ match, onPress }) => {
  // Find the other person's profile (not the current user)
  const otherProfileId = match.a === 'current_user' ? match.b : match.a;
  const otherProfile = mockProfiles.find(p => p.id === otherProfileId);
  
  if (!otherProfile) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-4 bg-card border-b border-gray-800"
      accessibilityLabel={`Chat with ${otherProfile.name}`}
      accessibilityRole="button"
    >
      {/* Avatar */}
      <View className="w-14 h-14 rounded-full overflow-hidden mr-4">
        <Image
          source={{ uri: otherProfile.photo }}
          className="w-full h-full"
          contentFit="cover"
          cachePolicy="memory-disk"
        />
      </View>
      
      {/* Profile Info */}
      <View className="flex-1">
        <Text className="text-text text-lg font-semibold mb-1">
          {otherProfile.name}
        </Text>
        <Text className="text-sub text-sm mb-1">
          {otherProfile.age} • {otherProfile.city}
        </Text>
        {match.last && (
          <Text className="text-text text-sm" numberOfLines={1}>
            {match.last}
          </Text>
        )}
      </View>
      
      {/* Arrow */}
      <View className="ml-2">
        <Text className="text-sub text-lg">›</Text>
      </View>
    </TouchableOpacity>
  );
};
