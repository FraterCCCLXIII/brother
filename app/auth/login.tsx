import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { TopBar } from '../../components/TopBar';
import { FormField } from '../../components/FormField';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOTP = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    
    // Simulate OTP sending
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
    
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      if (otp === '000000' || otp === '123456') {
        // For demo purposes, skip profile creation and go directly to main app
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Invalid verification code');
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    // Demo login - skip everything and go to main app
    router.replace('/(tabs)');
  };

  if (step === 'email') {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <TopBar title="Welcome to Brother" showBack={false} />
        
        <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', marginBottom: 48 }}>
            <View style={{
              width: 80,
              height: 80,
              backgroundColor: '#000000',
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}>
              <Text style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 'bold' }}>🫂</Text>
            </View>
            <Text style={{
              color: '#000000',
              fontSize: 28,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 12,
            }}>
              Get Started
            </Text>
            <Text style={{
              color: '#6C757D',
              fontSize: 16,
              textAlign: 'center',
              lineHeight: 24,
            }}>
              Enter your email to begin your journey
            </Text>
          </View>

          <FormField
            label="Email"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
              marginTop: 32,
              marginBottom: 16,
            }}
          >
            <Text style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: '600',
            }}>
              {loading ? 'Sending...' : 'Send Verification Code'}
            </Text>
          </TouchableOpacity>

          {/* Demo Login Button */}
          <TouchableOpacity
            onPress={handleDemoLogin}
            style={{
              backgroundColor: '#F8F9FA',
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E9ECEF',
            }}
          >
            <Text style={{
              color: '#000000',
              fontSize: 18,
              fontWeight: '600',
            }}>
              Demo - Skip Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <TopBar title="Verify Email" showBack={false} />
      
      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 48 }}>
          <View style={{
            width: 80,
            height: 80,
            backgroundColor: '#000000',
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            <Text style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 'bold' }}>📧</Text>
          </View>
          <Text style={{
            color: '#000000',
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 12,
          }}>
            Check Your Email
          </Text>
          <Text style={{
            color: '#6C757D',
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 24,
          }}>
            We sent a verification code to {email}
          </Text>
        </View>

        <FormField
          label="Verification Code"
          placeholder="Enter the 6-digit code"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
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
            marginTop: 32,
            marginBottom: 16,
          }}
        >
          <Text style={{
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: '600',
          }}>
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </Text>
        </TouchableOpacity>

        {/* Demo Login Button */}
        <TouchableOpacity
          onPress={handleDemoLogin}
          style={{
            backgroundColor: '#F8F9FA',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#E9ECEF',
          }}
        >
          <Text style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: '600',
          }}>
            Demo - Skip Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
