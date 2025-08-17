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

type ProfileStep = 'basic' | 'bio' | 'intents' | 'interests' | 'review';

export default function CreateProfileScreen() {
  const [currentStep, setCurrentStep] = useState<ProfileStep>('basic');
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

  const nextStep = () => {
    if (currentStep === 'basic') {
      if (!name.trim() || !age.trim() || !city.trim()) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      if (parseInt(age) < 18) {
        Alert.alert('Error', 'You must be at least 18 years old');
        return;
      }
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
      setCurrentStep('review');
    }
  };

  const prevStep = () => {
    if (currentStep === 'bio') setCurrentStep('basic');
    else if (currentStep === 'intents') setCurrentStep('bio');
    else if (currentStep === 'interests') setCurrentStep('intents');
    else if (currentStep === 'review') setCurrentStep('interests');
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

  const renderStepIndicator = () => {
    const steps = ['basic', 'bio', 'intents', 'interests', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
      }}>
        {steps.map((step, index) => (
          <View key={step} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: index <= currentIndex ? '#000000' : '#E9ECEF',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 4,
            }}>
              <Text style={{
                color: index <= currentIndex ? '#FFFFFF' : '#6C757D',
                fontSize: 14,
                fontWeight: '600',
              }}>
                {index + 1}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View style={{
                width: 20,
                height: 2,
                backgroundColor: index < currentIndex ? '#000000' : '#E9ECEF',
                marginHorizontal: 4,
              }} />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderBasicInfo = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: '#000000',
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}>
          <Ionicons name="person" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 8,
        }}>
          Basic Information
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
        }}>
          Let's start with the basics
        </Text>
      </View>

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

      <TouchableOpacity
        onPress={nextStep}
        style={{
          backgroundColor: '#000000',
          paddingVertical: 16,
          borderRadius: 16,
          alignItems: 'center',
          marginTop: 32,
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
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: '#000000',
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}>
          <Ionicons name="chatbubble" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 8,
        }}>
          Tell Us About Yourself
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
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

      <View style={{ flexDirection: 'row', marginTop: 32 }}>
        <TouchableOpacity
          onPress={prevStep}
          style={{
            flex: 1,
            backgroundColor: '#F8F9FA',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            marginRight: 12,
            borderWidth: 1,
            borderColor: '#E9ECEF',
          }}
        >
          <Text style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: '600',
          }}>
            Back
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={nextStep}
          style={{
            flex: 1,
            backgroundColor: '#000000',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            marginLeft: 12,
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
    </View>
  );

  const renderIntents = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: '#000000',
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}>
          <Ionicons name="heart" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 8,
        }}>
          What Are You Looking For?
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
        }}>
          Select up to 5 intents
        </Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 32 }}>
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

      <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
        <TouchableOpacity
          onPress={prevStep}
          style={{
            flex: 1,
            backgroundColor: '#F8F9FA',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            marginRight: 12,
            borderWidth: 1,
            borderColor: '#E9ECEF',
          }}
        >
          <Text style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: '600',
          }}>
            Back
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={nextStep}
          style={{
            flex: 1,
            backgroundColor: '#000000',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            marginLeft: 12,
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
    </View>
  );

  const renderInterests = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: '#000000',
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}>
          <Ionicons name="star" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 8,
        }}>
          What Are Your Interests?
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
        }}>
          Select up to 8 interests
        </Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 32 }}>
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

      <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
        <TouchableOpacity
          onPress={prevStep}
          style={{
            flex: 1,
            backgroundColor: '#F8F9FA',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            marginRight: 12,
            borderWidth: 1,
            borderColor: '#E9ECEF',
          }}
        >
          <Text style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: '600',
          }}>
            Back
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={nextStep}
          style={{
            flex: 1,
            backgroundColor: '#000000',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            marginLeft: 12,
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
    </View>
  );

  const renderReview = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: '#000000',
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}>
          <Ionicons name="checkmark-circle" size={40} color="white" />
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 8,
        }}>
          Review Your Profile
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
        }}>
          Make sure everything looks good
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{
          backgroundColor: '#F8F9FA',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}>
          <Text style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 16,
          }}>
            Basic Info
          </Text>
          <Text style={{ color: '#6C757D', fontSize: 16, marginBottom: 4 }}>
            <Text style={{ fontWeight: '600' }}>Name:</Text> {name}
          </Text>
          <Text style={{ color: '#6C757D', fontSize: 16, marginBottom: 4 }}>
            <Text style={{ fontWeight: '600' }}>Age:</Text> {age}
          </Text>
          <Text style={{ color: '#6C757D', fontSize: 16, marginBottom: 16 }}>
            <Text style={{ fontWeight: '600' }}>City:</Text> {city}
          </Text>
          
          <Text style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 16,
          }}>
            Bio
          </Text>
          <Text style={{ color: '#6C757D', fontSize: 16, marginBottom: 16 }}>
            {bio}
          </Text>
          
          <Text style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 16,
          }}>
            Intents ({selectedIntents.length}/5)
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
            {selectedIntents.map((intent, index) => (
              <Chip
                key={index}
                label={intent}
                selected={true}
                disabled={true}
              />
            ))}
          </View>
          
          <Text style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 16,
          }}>
            Interests ({selectedInterests.length}/8)
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedInterests.map((interest, index) => (
              <Chip
                key={index}
                label={interest}
                selected={true}
                disabled={true}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <TouchableOpacity
          onPress={prevStep}
          style={{
            flex: 1,
            backgroundColor: '#F8F9FA',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            marginRight: 12,
            borderWidth: 1,
            borderColor: '#E9ECEF',
          }}
        >
          <Text style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: '600',
          }}>
            Back
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={{
            flex: 1,
            backgroundColor: loading ? '#CCCCCC' : '#000000',
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
            marginLeft: 12,
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
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'basic':
        return renderBasicInfo();
      case 'bio':
        return renderBio();
      case 'intents':
        return renderIntents();
      case 'interests':
        return renderInterests();
      case 'review':
        return renderReview();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <TopBar 
        title={`Step ${['basic', 'bio', 'intents', 'interests', 'review'].indexOf(currentStep) + 1} of 5`} 
        showBack={currentStep !== 'basic'}
      />
      
      {renderStepIndicator()}
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {renderCurrentStep()}
      </ScrollView>
    </View>
  );
}
