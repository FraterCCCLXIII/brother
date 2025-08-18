import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth/login');
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    }}>
      {/* App Logo/Icon */}
      <View style={{
        width: 120,
        height: 120,
        backgroundColor: '#000000',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 48,
      }}>
        <Ionicons name="people" size={60} color="white" />
      </View>

      {/* App Name */}
      <Text style={{
        color: '#000000',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
      }}>
        Brother
      </Text>

      {/* Tagline */}
      <Text style={{
        color: '#6C757D',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 64,
        lineHeight: 28,
      }}>
        Build meaningful male friendships
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        onPress={handleGetStarted}
        style={{
          backgroundColor: '#000000',
          paddingVertical: 20,
          paddingHorizontal: 48,
          borderRadius: 16,
          alignItems: 'center',
          minWidth: 200,
        }}
      >
        <Text style={{
          color: '#FFFFFF',
          fontSize: 20,
          fontWeight: '600',
        }}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}
