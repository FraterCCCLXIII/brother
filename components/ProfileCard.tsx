import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Chip } from './Chip';
import { Profile } from '../lib/types';

interface ProfileCardProps {
  profile: Profile;
}

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.7;

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <View 
      className="bg-card rounded-3xl overflow-hidden shadow-2xl"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      {/* Profile Image */}
      <View className="flex-1">
        <Image
          source={{ uri: profile.photo }}
          className="w-full h-full"
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
        />
      </View>
      
      {/* Profile Info Overlay */}
      <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        {/* Name and Age */}
        <View className="flex-row items-center mb-2">
          <Text className="text-2xl font-bold text-text mr-3">
            {profile.name}
          </Text>
          <Text className="text-lg text-sub">
            {profile.age}
          </Text>
        </View>
        
        {/* Location and Distance */}
        <View className="flex-row items-center mb-3">
          <Text className="text-sub text-base">
            {profile.city} • {profile.distance} miles away
          </Text>
        </View>
        
        {/* Bio */}
        <Text className="text-text text-base mb-4 leading-5">
          {profile.bio}
        </Text>
        
        {/* Intents */}
        <View className="flex-row flex-wrap">
          {profile.intents.slice(0, 3).map((intent, index) => (
            <Chip
              key={index}
              label={intent}
              selected={true}
              disabled={true}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
