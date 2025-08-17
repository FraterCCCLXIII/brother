import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TopBar } from '../../components/TopBar';
import { Chip } from '../../components/Chip';
import { Ionicons } from '@expo/vector-icons';

const reportReasons = [
  'Harassment',
  'Spam',
  'Misrepresentation',
  'Inappropriate content',
  'Fake profile',
  'Other'
];

export default function ReportScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReasonToggle = (reason: string) => {
    setSelectedReasons(prev => 
      prev.includes(reason) 
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = async () => {
    if (selectedReasons.length === 0) {
      Alert.alert('Error', 'Please select at least one reason');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Report Submitted',
        'Thank you for your report. We will review it and take appropriate action.',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    }, 1000);
  };

  const handleBlock = () => {
    Alert.alert(
      'Block User',
      'Are you sure you want to block this user? You won\'t see their profile again.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Block', 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'User Blocked',
              'This user has been blocked. You won\'t see their profile again.',
              [{ text: 'OK', onPress: () => router.back() }]
            );
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-bg">
      <TopBar title="Report User" showBack />
      
      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-danger/20 rounded-full items-center justify-center mb-4">
            <Ionicons name="warning" size={40} color="#F87171" />
          </View>
          <Text className="text-text text-2xl font-bold text-center mb-2">
            Report User
          </Text>
          <Text className="text-sub text-base text-center">
            Help us keep Brother safe by reporting inappropriate behavior
          </Text>
        </View>

        {/* Report Reasons */}
        <View className="mb-8">
          <Text className="text-text text-lg font-semibold mb-4">
            What's the issue? *
          </Text>
          <Text className="text-sub text-sm mb-4">
            Select all that apply
          </Text>
          <View className="flex-row flex-wrap">
            {reportReasons.map((reason) => (
              <Chip
                key={reason}
                label={reason}
                selected={selectedReasons.includes(reason)}
                onPress={() => handleReasonToggle(reason)}
              />
            ))}
          </View>
        </View>

        {/* Additional Notes */}
        <View className="mb-8">
          <Text className="text-text text-base font-medium mb-3">
            Additional Details (Optional)
          </Text>
          <View className="bg-card border border-gray-600 rounded-2xl p-4">
            <Text className="text-sub text-sm">
              Your report will be reviewed by our team. Please provide any additional context that might help us understand the situation better.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-4 mb-8">
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`
              bg-danger py-4 rounded-2xl items-center
              ${loading ? 'opacity-50' : ''}
            `}
          >
            <Text className="text-white text-lg font-semibold">
              {loading ? 'Submitting...' : 'Submit Report'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleBlock}
            className="bg-gray-700 py-4 rounded-2xl items-center border border-gray-600"
          >
            <Text className="text-text text-lg font-semibold">
              Block User
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View className="bg-gray-800/50 rounded-2xl p-4">
          <Text className="text-sub text-sm text-center leading-5">
            Reports are reviewed within 24 hours. We take all reports seriously and will take appropriate action to maintain a safe community.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
