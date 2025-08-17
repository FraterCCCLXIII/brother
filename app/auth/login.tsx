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
      Alert.alert('OTP Sent', 'Check your email for the verification code\n\n💡 Tip: Use 000000 as the default code for testing');
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setLoading(true);
    
    // Simulate OTP verification - accept 000000 as default
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

  const handleUseDefaultCode = () => {
    setOtp('000000');
    handleVerifyOTP();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <TopBar title="Login" showBack />
      
      <View style={{ flex: 1, padding: 24 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <View style={{ 
              width: 80, 
              height: 80, 
              backgroundColor: '#000000', 
              borderRadius: 40, 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: 16 
            }}>
              <Ionicons name="mail" size={40} color="white" />
            </View>
            <Text style={{ 
              color: '#000000', 
              fontSize: 24, 
              fontWeight: 'bold', 
              textAlign: 'center', 
              marginBottom: 8 
            }}>
              Welcome to Brother
            </Text>
            <Text style={{ 
              color: '#6C757D', 
              fontSize: 16, 
              textAlign: 'center' 
            }}>
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
                style={{
                  backgroundColor: loading ? '#CCCCCC' : '#000000',
                  paddingVertical: 16,
                  borderRadius: 16,
                  alignItems: 'center',
                  marginTop: 24,
                }}
              >
                <Text style={{ 
                  color: '#FFFFFF', 
                  fontSize: 18, 
                  fontWeight: '600' 
                }}>
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
                style={{
                  backgroundColor: loading ? '#CCCCCC' : '#000000',
                  paddingVertical: 16,
                  borderRadius: 16,
                  alignItems: 'center',
                  marginTop: 24,
                }}
              >
                <Text style={{ 
                  color: '#FFFFFF', 
                  fontSize: 18, 
                  fontWeight: '600' 
                }}>
                  {loading ? 'Verifying...' : 'Verify Code'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleUseDefaultCode}
                style={{
                  backgroundColor: '#E9ECEF',
                  paddingVertical: 12,
                  borderRadius: 16,
                  alignItems: 'center',
                  marginTop: 16,
                }}
              >
                <Text style={{ 
                  color: '#000000', 
                  fontSize: 16, 
                  fontWeight: '500' 
                }}>
                  Use Default Code (000000)
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleBackToEmail}
                style={{
                  paddingVertical: 16,
                  alignItems: 'center',
                  marginTop: 16,
                }}
              >
                <Text style={{ 
                  color: '#000000', 
                  fontSize: 16 
                }}>
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
