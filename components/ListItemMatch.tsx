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
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
      }}
      accessibilityLabel={`Chat with ${otherProfile.name}`}
      accessibilityRole="button"
    >
      {/* Avatar - Grey placeholder */}
      <View style={{
        width: 56,
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
        backgroundColor: '#F8F9FA',
        marginRight: 16,
      }}>
        <Image
          source={{ uri: otherProfile.photo }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          cachePolicy="memory-disk"
          placeholder="#F8F9FA"
        />
      </View>
      
      {/* Profile Info */}
      <View style={{ flex: 1 }}>
        <Text style={{
          color: '#000000',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 4,
        }}>
          {otherProfile.name}
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 14,
          marginBottom: 4,
        }}>
          {otherProfile.age} • {otherProfile.city}
        </Text>
        {match.last && (
          <Text style={{
            color: '#000000',
            fontSize: 14,
          }} numberOfLines={1}>
            {match.last}
          </Text>
        )}
      </View>
      
      {/* Arrow */}
      <View style={{ marginLeft: 8 }}>
        <Text style={{ color: '#6C757D', fontSize: 18 }}>›</Text>
      </View>
    </TouchableOpacity>
  );
};
