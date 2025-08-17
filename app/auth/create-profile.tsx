import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { TopBar } from '../../components/TopBar';
import { FormField } from '../../components/FormField';
import { Chip } from '../../components/Chip';
import { Ionicons } from '@expo/vector-icons';

const availableIntents = [
  'Workout Buddy', 'Coffee Friend', 'Hiking Partner', 'Board Game Night',
  'Tech Discussion', 'Weekend Trips', 'Jam Session', 'Food Adventures',
  'Concert Buddy', 'Sports Team', 'Trivia Night', 'Gym Partner',
  'Creative Collaboration', 'Coffee Shop Hang', 'Gallery Visits',
  'Book Club', 'Podcast Discussion', 'City Exploration', 'Gaming Session',
  'Anime Watch Party', 'Convention Buddy', 'Accountability Partner',
  'Networking'
];

const availableInterests = [
  'Fitness', 'Outdoors', 'Craft Beer', 'Photography', 'Technology',
  'Board Games', 'Travel', 'Philosophy', 'Music', 'Food', 'Live Events',
  'Cooking', 'Sports', 'Trivia', 'Art', 'Coffee', 'Design', 'Museums',
  'Reading', 'Podcasts', 'Urban Exploration', 'Gaming', 'Anime',
  'Comics', 'Business', 'Self-Development'
];

export default function CreateProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleIntentToggle = (intent: string) => {
    setSelectedIntents(prev => 
      prev.includes(intent) 
        ? prev.filter(i => i !== intent)
        : [...prev, intent]
    );
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    
    if (!age.trim() || parseInt(age) < 18) {
      Alert.alert('Error', 'You must be at least 18 years old');
      return;
    }
    
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter your city');
      return;
    }
    
    if (!bio.trim()) {
      Alert.alert('Error', 'Please write a short bio');
      return;
    }
    
    if (selectedIntents.length === 0) {
      Alert.alert('Error', 'Please select at least one intent');
      return;
    }
    
    if (selectedInterests.length === 0) {
      Alert.alert('Error', 'Please select at least one interest');
      return;
    }

    setLoading(true);
    
    // Simulate profile creation
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Profile Created!',
        'Welcome to Brother! Start swiping to make connections.',
        [
          {
            text: 'Get Started',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
    }, 1000);
  };

  return (
    <View className="flex-1 bg-bg">
      <TopBar title="Create Profile" showBack />
      
      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-accent rounded-full items-center justify-center mb-4">
            <Ionicons name="person" size={40} color="black" />
          </View>
          <Text className="text-text text-2xl font-bold text-center mb-2">
            Tell us about yourself
          </Text>
          <Text className="text-sub text-base text-center">
            Help others get to know you better
          </Text>
        </View>

        {/* Basic Info */}
        <FormField
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          required
        />
        
        <FormField
          label="Age"
          placeholder="Enter your age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          maxLength={2}
          required
        />
        
        <FormField
          label="City"
          placeholder="Enter your city"
          value={city}
          onChangeText={setCity}
          autoCapitalize="words"
          required
        />
        
        <FormField
          label="Bio"
          placeholder="Tell us about yourself, what you're looking for, etc."
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          required
        />

        {/* Intents */}
        <View className="mb-6">
          <Text className="text-text text-base font-medium mb-3">
            What are you looking for? *
          </Text>
          <Text className="text-sub text-sm mb-3">
            Select up to 5 intents
          </Text>
          <View className="flex-row flex-wrap">
            {availableIntents.map((intent) => (
              <Chip
                key={intent}
                label={intent}
                selected={selectedIntents.includes(intent)}
                onPress={() => handleIntentToggle(intent)}
                disabled={selectedIntents.length >= 5 && !selectedIntents.includes(intent)}
              />
            ))}
          </View>
        </View>

        {/* Interests */}
        <View className="mb-8">
          <Text className="text-text text-base font-medium mb-3">
            What are your interests? *
          </Text>
          <Text className="text-sub text-sm mb-3">
            Select up to 8 interests
          </Text>
          <View className="flex-row flex-wrap">
            {availableInterests.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                selected={selectedInterests.includes(interest)}
                onPress={() => handleInterestToggle(interest)}
                disabled={selectedInterests.length >= 8 && !selectedInterests.includes(interest)}
              />
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className={`
            bg-accent py-4 rounded-2xl items-center mb-8
            ${loading ? 'opacity-50' : ''}
          `}
        >
          <Text className="text-black text-lg font-semibold">
            {loading ? 'Creating Profile...' : 'Create Profile'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
