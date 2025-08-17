import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ title, showBack = false, onBack }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-card border-b border-gray-800">
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            className="mr-3 p-2 -ml-2"
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Ionicons name="chevron-back" size={24} color="#F2F2F7" />
          </TouchableOpacity>
        )}
        <Text className="text-xl font-semibold text-text flex-1">{title}</Text>
      </View>
    </View>
  );
};
