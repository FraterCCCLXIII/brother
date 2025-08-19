import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../lib/firebase';
// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../lib/firebase';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const router = useRouter();

  const recaptchaVerifier = React.useRef(null);

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handleSendCode = async () => {
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length !== 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement phone authentication
      // For now, simulate the process
      setTimeout(() => {
        setVerificationId('mock-verification-id');
        setIsCodeSent(true);
        setIsLoading(false);
        Alert.alert('Code Sent', 'A verification code has been sent to your phone.');
      }, 2000);
    } catch (error) {
      console.error('Error sending code:', error);
      Alert.alert('Error', 'Failed to send verification code. Please try again.');
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter the 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement code verification
      // For now, simulate successful verification
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to profile creation
        router.push('/auth/create-profile');
      }, 2000);
    } catch (error) {
      console.error('Error verifying code:', error);
      Alert.alert('Error', 'Invalid verification code. Please try again.');
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    setVerificationCode('');
    setIsCodeSent(false);
    handleSendCode();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          /> */}

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons name="people" size={48} color="#007AFF" />
            </View>
            <Text style={styles.title}>Welcome to Brother</Text>
            <Text style={styles.subtitle}>
              Connect with like-minded men in your area
            </Text>
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>+1</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="(555) 123-4567"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
                keyboardType="phone-pad"
                maxLength={14}
                editable={!isCodeSent}
              />
            </View>
          </View>

          {/* Verification Code Input */}
          {isCodeSent && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Verification Code</Text>
              <TextInput
                style={styles.codeInput}
                placeholder="123456"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
              />
              <Text style={styles.codeHint}>
                Enter the 6-digit code sent to your phone
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {!isCodeSent ? (
              <TouchableOpacity
                style={[styles.primaryButton, isLoading && styles.disabledButton]}
                onPress={handleSendCode}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Text style={styles.buttonText}>Sending...</Text>
                ) : (
                  <Text style={styles.buttonText}>Send Code</Text>
                )}
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.primaryButton, isLoading && styles.disabledButton]}
                  onPress={handleVerifyCode}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Text style={styles.buttonText}>Verifying...</Text>
                  ) : (
                    <Text style={styles.buttonText}>Verify Code</Text>
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleResendCode}
                  disabled={isLoading}
                >
                  <Text style={styles.secondaryButtonText}>Resend Code</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Terms and Privacy */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: '#E5E5EA',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#000000',
  },
  codeInput: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    color: '#000000',
    letterSpacing: 8,
  },
  codeHint: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },
  buttonContainer: {
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#C7C7CC',
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
