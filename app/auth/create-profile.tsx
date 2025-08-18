import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { TopBar } from '../../components/TopBar';
import { FormField } from '../../components/FormField';
import { Chip } from '../../components/Chip';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

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

type ProfileStep = 'name' | 'birthdate' | 'location' | 'photos' | 'bio' | 'intents' | 'interests';

export default function CreateProfileScreen() {
  const [currentStep, setCurrentStep] = useState<ProfileStep>('name');
  const [name, setName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
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

  const nextStep = () => {
    if (currentStep === 'name') {
      if (!name.trim()) {
        Alert.alert('Error', 'Please enter your name');
        return;
      }
      setCurrentStep('birthdate');
    } else if (currentStep === 'birthdate') {
      if (!birthMonth || !birthDay || !birthYear) {
        Alert.alert('Error', 'Please fill in all birthdate fields');
        return;
      }
      const age = new Date().getFullYear() - parseInt(birthYear);
      if (age < 18) {
        Alert.alert('Error', 'You must be at least 18 years old');
        return;
      }
      setCurrentStep('location');
    } else if (currentStep === 'location') {
      if (!city.trim()) {
        Alert.alert('Error', 'Please set your location');
        return;
      }
      setCurrentStep('photos');
    } else if (currentStep === 'photos') {
      setCurrentStep('bio');
    } else if (currentStep === 'bio') {
      if (!bio.trim()) {
        Alert.alert('Error', 'Please write a short bio');
        return;
      }
      setCurrentStep('intents');
    } else if (currentStep === 'intents') {
      if (selectedIntents.length === 0) {
        Alert.alert('Error', 'Please select at least one intent');
        return;
      }
      setCurrentStep('interests');
    } else if (currentStep === 'interests') {
      if (selectedInterests.length === 0) {
        Alert.alert('Error', 'Please select at least one interest');
        return;
      }
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
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

  const renderProgressBar = () => {
    const steps = ['name', 'birthdate', 'location', 'photos', 'bio', 'intents', 'interests'];
    const currentIndex = steps.indexOf(currentStep);
    const progress = (currentIndex + 1) / steps.length;
    
    return (
      <View style={{
        paddingHorizontal: 24,
        paddingVertical: 16,
      }}>
        <View style={{
          width: '100%',
          height: 4,
          backgroundColor: '#E9ECEF',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <View style={{
            width: `${progress * 100}%`,
            height: '100%',
            backgroundColor: '#000000',
            borderRadius: 2,
          }} />
        </View>
        <Text style={{
          color: '#6C757D',
          fontSize: 14,
          textAlign: 'center',
          marginTop: 8,
        }}>
          Step {currentIndex + 1} of {steps.length}
        </Text>
      </View>
    );
  };

  const renderName = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
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
          <Ionicons name="person" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          What's your name?
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 24,
        }}>
          This is how other users will see you
        </Text>
      </View>

      <FormField
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        required
      />

      <View style={{ flex: 1 }} />
      
      <TouchableOpacity
        onPress={nextStep}
        style={{
          backgroundColor: '#000000',
          paddingVertical: 16,
          borderRadius: 16,
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <Text style={{
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: '600',
        }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderBirthdate = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
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
          <Ionicons name="calendar" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          When's your birthday?
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 24,
        }}>
          Only your age will be displayed to other users
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <FormField
            label="Month"
            placeholder="MM"
            value={birthMonth}
            onChangeText={setBirthMonth}
            keyboardType="numeric"
            maxLength={2}
            required
          />
        </View>
        <View style={{ flex: 1 }}>
          <FormField
            label="Day"
            placeholder="DD"
            value={birthDay}
            onChangeText={setBirthDay}
            keyboardType="numeric"
            maxLength={2}
            required
          />
        </View>
        <View style={{ flex: 1 }}>
          <FormField
            label="Year"
            placeholder="YYYY"
            value={birthYear}
            onChangeText={setBirthYear}
            keyboardType="numeric"
            maxLength={4}
            required
          />
        </View>
      </View>

      <View style={{ flex: 1 }} />
      
      <TouchableOpacity
        onPress={nextStep}
        style={{
          backgroundColor: '#000000',
          paddingVertical: 16,
          borderRadius: 16,
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <Text style={{
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: '600',
        }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderLocation = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
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
          <Ionicons name="location" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          Set your location
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 24,
        }}>
          Help others find you nearby
        </Text>
      </View>

      <FormField
        label="City"
        placeholder="Enter your city"
        value={city}
        onChangeText={setCity}
        autoCapitalize="words"
        required
      />

      <View style={{ flex: 1 }} />
      
      <TouchableOpacity
        onPress={nextStep}
        style={{
          backgroundColor: '#000000',
          paddingVertical: 16,
          borderRadius: 16,
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <Text style={{
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: '600',
        }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPhotos = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
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
          <Ionicons name="camera" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          Add photos
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 24,
        }}>
          Show others who you are
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 32 }}>
        {[1, 2, 3, 4].map((index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: (width - 72) / 4,
              height: (width - 72) / 4,
              backgroundColor: '#F8F9FA',
              borderRadius: 16,
              borderWidth: 2,
              borderColor: '#E9ECEF',
              borderStyle: 'dashed',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="add" size={32} color="#6C757D" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }} />
      
      <TouchableOpacity
        onPress={nextStep}
        style={{
          backgroundColor: '#000000',
          paddingVertical: 16,
          borderRadius: 16,
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <Text style={{
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: '600',
        }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderBio = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
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
          <Ionicons name="chatbubble" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          Tell us about yourself
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 24,
        }}>
          Help others get to know you better
        </Text>
      </View>

      <FormField
        label="Bio"
        placeholder="Tell us about yourself, what you're looking for, etc."
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        required
      />

      <View style={{ flex: 1 }} />
      
      <TouchableOpacity
        onPress={nextStep}
        style={{
          backgroundColor: '#000000',
          paddingVertical: 16,
          borderRadius: 16,
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <Text style={{
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: '600',
        }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderIntents = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
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
          <Ionicons name="search" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          What are you looking for?
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 24,
        }}>
          Select up to 5 intents
        </Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
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

      <View style={{ flex: 1 }} />
      
      <TouchableOpacity
        onPress={nextStep}
        style={{
          backgroundColor: '#000000',
          paddingVertical: 16,
          borderRadius: 16,
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <Text style={{
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: '600',
        }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderInterests = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
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
          <Ionicons name="star" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          What are your interests?
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 24,
        }}>
          Select up to 8 interests
        </Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
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

      <View style={{ flex: 1 }} />
      
      <TouchableOpacity
        onPress={nextStep}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#CCCCCC' : '#000000',
          paddingVertical: 16,
          borderRadius: 16,
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <Text style={{
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: '600',
        }}>
          {loading ? 'Creating...' : 'Create Profile'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'name':
        return renderName();
      case 'birthdate':
        return renderBirthdate();
      case 'location':
        return renderLocation();
      case 'photos':
        return renderPhotos();
      case 'bio':
        return renderBio();
      case 'intents':
        return renderIntents();
      case 'interests':
        return renderInterests();
      default:
        return renderName();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <TopBar 
        title={`Step ${['name', 'birthdate', 'location', 'photos', 'bio', 'intents', 'interests'].indexOf(currentStep) + 1} of 7`} 
        showBack={false}
      />
      
      {renderProgressBar()}
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {renderCurrentStep()}
      </ScrollView>
    </View>
  );
}
