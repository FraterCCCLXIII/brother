import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { TopBar } from '../../components/TopBar';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [isPaused, setIsPaused] = useState(false);
  const [distanceRadius, setDistanceRadius] = useState(25);

  const handlePauseAccount = (value: boolean) => {
    setIsPaused(value);
    // In a real app, this would call an API
    Alert.alert(
      value ? 'Account Paused' : 'Account Resumed',
      value 
        ? 'Your profile is now hidden from other users.' 
        : 'Your profile is now visible to other users.'
    );
  };

  const handleDistanceChange = (value: number) => {
    setDistanceRadius(value);
    // In a real app, this would call an API
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
          }
        }
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    children 
  }: { 
    icon: string; 
    title: string; 
    subtitle?: string; 
    children?: React.ReactNode; 
  }) => (
    <View className="flex-row items-center justify-between p-4 bg-card border-b border-gray-800">
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 bg-gray-700 rounded-full items-center justify-center mr-4">
          <Ionicons name={icon as any} size={20} color="#F2F2F7" />
        </View>
        <View className="flex-1">
          <Text className="text-text text-base font-medium">{title}</Text>
          {subtitle && (
            <Text className="text-sub text-sm mt-1">{subtitle}</Text>
          )}
        </View>
      </View>
      {children}
    </View>
  );

  return (
    <View className="flex-1 bg-bg">
      <TopBar title="Settings" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Account Settings */}
        <View className="mt-4">
          <Text className="text-sub text-sm font-medium px-4 mb-2">ACCOUNT</Text>
          
          <SettingItem
            icon="pause-circle"
            title="Pause Account"
            subtitle="Hide your profile from other users"
          >
            <Switch
              value={isPaused}
              onValueChange={handlePauseAccount}
              trackColor={{ false: '#374151', true: '#4ADE80' }}
              thumbColor={isPaused ? '#FFFFFF' : '#F3F4F6'}
            />
          </SettingItem>
        </View>

        {/* Preferences */}
        <View className="mt-6">
          <Text className="text-sub text-sm font-medium px-4 mb-2">PREFERENCES</Text>
          
          <SettingItem
            icon="location"
            title="Distance Radius"
            subtitle={`${distanceRadius} miles`}
          >
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => handleDistanceChange(Math.max(1, distanceRadius - 5))}
                className="w-8 h-8 bg-gray-700 rounded-full items-center justify-center mr-2"
              >
                <Ionicons name="remove" size={16} color="#F2F2F7" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDistanceChange(Math.min(100, distanceRadius + 5))}
                className="w-8 h-8 bg-gray-700 rounded-full items-center justify-center"
              >
                <Ionicons name="add" size={16} color="#F2F2F7" />
              </TouchableOpacity>
            </View>
          </SettingItem>
        </View>

        {/* Danger Zone */}
        <View className="mt-6 mb-8">
          <Text className="text-sub text-sm font-medium px-4 mb-2">DANGER ZONE</Text>
          
          <TouchableOpacity
            onPress={handleDeleteAccount}
            className="p-4 bg-card border border-danger/20"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-danger/20 rounded-full items-center justify-center mr-4">
                <Ionicons name="trash" size={20} color="#F87171" />
              </View>
              <View className="flex-1">
                <Text className="text-danger text-base font-medium">Delete Account</Text>
                <Text className="text-sub text-sm mt-1">
                  Permanently remove your account and all data
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
