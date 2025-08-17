import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { TopBar } from '../../components/TopBar';
import { FormField } from '../../components/FormField';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOTP = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      Alert.alert('OTP Sent', 'Check your email for the verification code');
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      // Navigate to profile creation
      router.push('/auth/create-profile');
    }, 1000);
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
  };

  return (
    <View className="flex-1 bg-bg">
      <TopBar title="Login" showBack />
      
      <View className="flex-1 p-6">
        <View className="flex-1 justify-center">
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-accent rounded-full items-center justify-center mb-4">
              <Ionicons name="mail" size={40} color="black" />
            </View>
            <Text className="text-text text-2xl font-bold text-center mb-2">
              Welcome to Brother
            </Text>
            <Text className="text-sub text-base text-center">
              {step === 'email' 
                ? 'Enter your email to get started' 
                : 'Enter the verification code sent to your email'
              }
            </Text>
          </View>

          {step === 'email' ? (
            <View>
              <FormField
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                required
              />
              
              <TouchableOpacity
                onPress={handleSendOTP}
                disabled={loading}
                className={`
                  bg-accent py-4 rounded-2xl items-center mt-6
                  ${loading ? 'opacity-50' : ''}
                `}
              >
                <Text className="text-black text-lg font-semibold">
                  {loading ? 'Sending...' : 'Send Verification Code'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <FormField
                label="Verification Code"
                placeholder="Enter 6-digit code"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                required
              />
              
              <TouchableOpacity
                onPress={handleVerifyOTP}
                disabled={loading}
                className={`
                  bg-accent py-4 rounded-2xl items-center mt-6
                  ${loading ? 'opacity-50' : ''}
                `}
              >
                <Text className="text-black text-lg font-semibold">
                  {loading ? 'Verifying...' : 'Verify Code'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleBackToEmail}
                className="py-4 items-center mt-4"
              >
                <Text className="text-accent text-base">
                  Use different email
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
