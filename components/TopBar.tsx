import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ title, showBack = false, onBack }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Check if we can go back, otherwise go to a safe screen
      if (router.canGoBack()) {
        router.back();
      } else {
        // Navigate to a safe default screen
        router.replace('/(tabs)');
      }
    }
  };

  return (
    <View 
      style={{
        paddingTop: insets.top,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
      }}
    >
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 16, 
        paddingVertical: 12 
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {showBack && (
            <TouchableOpacity
              onPress={handleBack}
              style={{ marginRight: 12, padding: 8, marginLeft: -8 }}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Ionicons name="chevron-back" size={24} color="#000000" />
            </TouchableOpacity>
          )}
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '600', 
            color: '#000000', 
            flex: 1 
          }}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};
