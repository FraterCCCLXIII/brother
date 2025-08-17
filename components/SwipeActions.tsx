import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SwipeActionsProps {
  onPass: () => void;
  onLike: () => void;
}

export const SwipeActions: React.FC<SwipeActionsProps> = ({ onPass, onLike }) => {
  return (
    <View className="absolute bottom-8 left-0 right-0 flex-row justify-center items-center space-x-8">
      {/* Pass Button */}
      <TouchableOpacity
        onPress={onPass}
        className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg"
        accessibilityLabel="Pass on this profile"
        accessibilityRole="button"
      >
        <Ionicons name="close" size={32} color="#F87171" />
      </TouchableOpacity>
      
      {/* Like Button */}
      <TouchableOpacity
        onPress={onLike}
        className="w-16 h-16 bg-accent rounded-full items-center justify-center shadow-lg"
        accessibilityLabel="Like this profile"
        accessibilityRole="button"
      >
        <Ionicons name="heart" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};
