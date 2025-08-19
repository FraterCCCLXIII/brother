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
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#E9ECEF',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <View style={{
          width: 40,
          height: 40,
          backgroundColor: '#F8F9FA',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}>
          <Ionicons name={icon as any} size={20} color="#000000" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{
            color: '#000000',
            fontSize: 16,
            fontWeight: '500',
          }}>
            {title}
          </Text>
          {subtitle && (
            <Text style={{
              color: '#6C757D',
              fontSize: 14,
              marginTop: 4,
            }}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {children}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <TopBar title="Settings" />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Account Settings */}
        <View style={{ marginTop: 16 }}>
          <Text style={{
            color: '#6C757D',
            fontSize: 14,
            fontWeight: '500',
            paddingHorizontal: 16,
            marginBottom: 8,
          }}>
            ACCOUNT
          </Text>
          
          <SettingItem
            icon="pause-circle"
            title="Pause Account"
            subtitle="Hide your profile from other users"
          >
            <Switch
              value={isPaused}
              onValueChange={handlePauseAccount}
              trackColor={{ false: '#E9ECEF', true: '#000000' }}
              thumbColor={isPaused ? '#FFFFFF' : '#FFFFFF'}
            />
          </SettingItem>
        </View>

        {/* Preferences */}
        <View style={{ marginTop: 24 }}>
          <Text style={{
            color: '#6C757D',
            fontSize: 14,
            fontWeight: '500',
            paddingHorizontal: 16,
            marginBottom: 8,
          }}>
            PREFERENCES
          </Text>
          
          <SettingItem
            icon="location"
            title="Distance Radius"
            subtitle={`${distanceRadius} miles`}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => handleDistanceChange(Math.max(1, distanceRadius - 5))}
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: '#F8F9FA',
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8,
                }}
              >
                <Ionicons name="remove" size={16} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDistanceChange(Math.min(100, distanceRadius + 5))}
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: '#F8F9FA',
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="add" size={16} color="#000000" />
              </TouchableOpacity>
            </View>
          </SettingItem>
        </View>

        {/* Danger Zone */}
        <View style={{ marginTop: 24, marginBottom: 32 }}>
          <Text style={{
            color: '#6C757D',
            fontSize: 14,
            fontWeight: '500',
            paddingHorizontal: 16,
            marginBottom: 8,
          }}>
            DANGER ZONE
          </Text>
          
          <TouchableOpacity
            onPress={handleDeleteAccount}
            style={{
              padding: 16,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#FECACA',
              marginHorizontal: 16,
              borderRadius: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: '#FEE2E2',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Ionicons name="trash" size={20} color="#DC2626" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  color: '#DC2626',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                  Delete Account
                </Text>
                <Text style={{
                  color: '#6C757D',
                  fontSize: 14,
                  marginTop: 4,
                }}>
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
