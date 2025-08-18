import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Logo } from '../../components/Logo';

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
      {/* App Logo */}
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 48,
      }}>
        <Logo type="text" size={80} color="#000000" />
      </View>

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
