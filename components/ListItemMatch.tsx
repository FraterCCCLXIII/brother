import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Match } from '../lib/types';

const { width } = Dimensions.get('window');

interface ListItemMatchProps {
  match: Match;
  onPress: () => void;
}

export const ListItemMatch: React.FC<ListItemMatchProps> = ({ match, onPress }) => {
  // For now, we'll show a placeholder since we don't have the other user's profile
  // In a real app, you'd fetch the other user's profile data
  const otherUserId = match.users.find(id => id !== 'me') || 'unknown';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
        backgroundColor: '#FFFFFF',
      }}
      activeOpacity={0.7}
    >
      {/* Avatar Placeholder */}
      <View style={{
        width: 60,
        height: 60,
        backgroundColor: '#F8F9FA',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        <Text style={{ color: '#6C757D', fontSize: 24, fontWeight: 'bold' }}>
          {otherUserId.charAt(0).toUpperCase()}
        </Text>
      </View>

      {/* Match Info */}
      <View style={{ flex: 1 }}>
        <Text style={{
          color: '#000000',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 4,
        }}>
          User {otherUserId}
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 14,
          marginBottom: 4,
        }}>
          {match.lastMessage}
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 12,
        }}>
          {new Date(match.timestamp).toLocaleDateString()}
        </Text>
      </View>

      {/* Unread Badge */}
      {match.unreadCount > 0 && (
        <View style={{
          backgroundColor: '#000000',
          borderRadius: 10,
          minWidth: 20,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: '600',
          }}>
            {match.unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
