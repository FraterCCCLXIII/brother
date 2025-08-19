import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { userApi } from '../../lib/api';
import { User, INTEREST_CATEGORIES } from '../../lib/types';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      // TODO: Get current user ID from auth
      const userProfile = await userApi.getUser('currentUserId');
      if (userProfile) {
        setUser(userProfile);
      } else {
        // Load mock data for development
        setUser(getMockUser());
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUser(getMockUser());
    } finally {
      setLoading(false);
    }
  };

  const getMockUser = (): User => ({
    id: 'currentUserId',
    displayName: 'Alex',
    age: 28,
    photos: [
      'https://via.placeholder.com/400x400/007AFF/FFFFFF?text=Alex',
      'https://via.placeholder.com/400x400/34C759/FFFFFF?text=Photo+2',
    ],
    selfieVerified: true,
    interests: ['gym', 'hiking', 'startup', 'coffee'],
    prompts: [
      { id: '1', text: 'Weekend vibe: Hiking and coffee with friends' },
      { id: '2', text: 'Looking for someone who: Loves the outdoors and deep conversations' },
    ],
    location: {
      geohash: '9q8yy',
      lat: 32.7157,
      lng: -117.1611,
    },
    discovery: {
      minAge: 25,
      maxAge: 35,
      radiusKm: 50,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    updatedAt: new Date(),
    pushTokens: [],
    city: 'San Diego',
    bio: 'Passionate about fitness, entrepreneurship, and building meaningful connections. Always up for an adventure or deep conversation over coffee.',
  });

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (error) {
              console.error('Error signing out:', error);
            }
          },
        },
      ]
    );
  };

  const getInterestCategory = (interest: string) => {
    for (const [category, interests] of Object.entries(INTEREST_CATEGORIES)) {
      if (interests.includes(interest)) {
        return category;
      }
    }
    return 'OTHER';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Photos */}
        <View style={styles.photosSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {user.photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.profilePhoto} />
            ))}
            {user.photos.length < 6 && (
              <TouchableOpacity style={styles.addPhotoButton}>
                <Ionicons name="add" size={32} color="#8E8E93" />
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <View style={styles.basicInfo}>
            <Text style={styles.name}>{user.displayName}, {user.age}</Text>
            {user.selfieVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
          <Text style={styles.location}>{user.city}</Text>
          {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
        </View>

        {/* Prompts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prompts</Text>
          {user.prompts.map((prompt) => (
            <View key={prompt.id} style={styles.promptItem}>
              <Text style={styles.promptText}>{prompt.text}</Text>
            </View>
          ))}
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {user.interests.map((interest) => (
              <View key={interest} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Discovery Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discovery Settings</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Age Range</Text>
            <Text style={styles.settingValue}>
              {user.discovery.minAge} - {user.discovery.maxAge}
            </Text>
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Distance</Text>
            <Text style={styles.settingValue}>{user.discovery.radiusKm} km</Text>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
            <Text style={styles.actionButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  editButton: {
    padding: 8,
  },
  photosSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  addPhotoButton: {
    width: 120,
    height: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: '#F8F9FA',
  },
  section: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 8,
  },
  basicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginRight: 12,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FFF0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34C759',
    marginLeft: 4,
  },
  location: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  promptItem: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  promptText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1976D2',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#000000',
  },
  settingValue: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FF3B30',
    marginLeft: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
  },
});
