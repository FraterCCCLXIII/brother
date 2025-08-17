import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface SwipeActionsProps {
  onPass: () => void;
  onLike: () => void;
  isExpanded?: boolean;
}

export const SwipeActions: React.FC<SwipeActionsProps> = ({ onPass, onLike, isExpanded = false }) => {
  return (
    <View style={{
      position: 'absolute',
      bottom: isExpanded ? 80 : 80, // Same position for both contexts
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: isExpanded ? 2000 : 1000, // Higher z-index when expanded
    }}>
      {/* Dislike/Pass Button */}
      <TouchableOpacity
        onPress={onPass}
        style={{
          width: 56,
          height: 56,
          backgroundColor: '#FFFFFF',
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: width * 0.1,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          borderWidth: 2,
          borderColor: '#E9ECEF',
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="close" size={28} color="#DC3545" />
      </TouchableOpacity>

      {/* Like Button */}
      <TouchableOpacity
        onPress={onLike}
        style={{
          width: 56,
          height: 56,
          backgroundColor: '#000000',
          borderRadius: 28,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: width * 0.1,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="checkmark" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};
