import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Swiper from 'react-native-deck-swiper';
import { TopBar } from '../../components/TopBar';
import { ProfileCard } from '../../components/ProfileCard';
import { SwipeActions } from '../../components/SwipeActions';
import { api } from '../../lib/api';
import { Profile, Match } from '../../lib/types';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const candidates = await api.fetchCandidates(20);
      setProfiles(candidates);
    } catch (error) {
      console.error('Error loading profiles:', error);
      Alert.alert('Error', 'Failed to load profiles');
    }
  };

  const handleSwipedRight = async (index: number) => {
    const profile = profiles[index];
    if (!profile) return;

    try {
      // Haptic feedback on like
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      const result = await api.like(profile.id);
      
      if (result.matched) {
        // Navigate to chat on match
        router.push(`/chat/${result.matched.id}`);
      }
    } catch (error) {
      console.error('Error liking profile:', error);
    }
  };

  const handleSwipedLeft = async (index: number) => {
    const profile = profiles[index];
    if (!profile) return;

    try {
      await api.passOn(profile.id);
    } catch (error) {
      console.error('Error passing on profile:', error);
    }
  };

  const handlePass = () => {
    if (currentIndex < profiles.length) {
      // Trigger swipe left programmatically
      // This is a workaround since the swiper doesn't have a direct method
      // In a real app, you might want to use a ref to call swiper methods
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleLike = () => {
    if (currentIndex < profiles.length) {
      // Trigger swipe right programmatically
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (profiles.length === 0) {
    return (
      <View className="flex-1 bg-bg">
        <TopBar title="Brother" />
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-text text-lg text-center">
            No more profiles to show right now.
          </Text>
          <Text className="text-sub text-base text-center mt-2">
            Check back later for new connections!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-bg">
      <TopBar title="Brother" />
      
      <View className="flex-1 items-center justify-center">
        <Swiper
          cards={profiles}
          renderCard={(profile: Profile) => (
            <ProfileCard profile={profile} />
          )}
          onSwipedLeft={handleSwipedLeft}
          onSwipedRight={handleSwipedRight}
          onSwipedAll={() => {
            setProfiles([]);
          }}
          cardIndex={currentIndex}
          backgroundColor="transparent"
          stackSize={3}
          cardVerticalMargin={20}
          cardHorizontalMargin={20}
          goBackToPreviousCardOnSwipeRight={false}
          goBackToPreviousCardOnSwipeLeft={false}
        />
      </View>
      
      <SwipeActions onPass={handlePass} onLike={handleLike} />
    </View>
  );
}
