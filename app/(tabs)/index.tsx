import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ProfileCard } from '../../components/ProfileCard';
import { api } from '../../lib/api';
import { Profile } from '../../lib/types';

export default function HomeScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    
    const loadProfiles = async () => {
      try {
        const candidates = await api.fetchCandidates(20);
        if (isMounted) {
          setProfiles(candidates);
        }
      } catch (error) {
        console.error('Error loading profiles:', error);
        if (isMounted) {
          setProfiles([]);
        }
      }
    };

    loadProfiles();
    
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handlePass = () => {
    if (isMounted && currentIndex < profiles.length) {
      const currentProfile = profiles[currentIndex];
      if (currentProfile) {
        api.pass('me', currentProfile.id);
      }
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleLike = () => {
    if (isMounted && currentIndex < profiles.length) {
      const currentProfile = profiles[currentIndex];
      if (currentProfile) {
        api.like('me', currentProfile.id);
      }
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (profiles.length === 0) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}>
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: '#F8F9FA',
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}>
          <Text style={{
            color: '#6C757D',
            fontSize: 32,
            fontWeight: 'bold',
          }}>
            😔
          </Text>
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          No More Profiles
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 24,
          marginBottom: 32,
        }}>
          Check back later for new connections in your area!
        </Text>
        
        <TouchableOpacity
          onPress={() => {
            if (isMounted) {
              setProfiles([]);
              setCurrentIndex(0);
              api.fetchCandidates(20).then(candidates => {
                if (isMounted) {
                  setProfiles(candidates);
                }
              }).catch(error => {
                console.error('Error refreshing profiles:', error);
              });
            }
          }}
          style={{
            backgroundColor: '#000000',
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
          }}>
            Refresh Profiles
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}>
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: '#F8F9FA',
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}>
          <Text style={{
            color: '#6C757D',
            fontSize: 32,
            fontWeight: 'bold',
          }}>
            😔
          </Text>
        </View>
        <Text style={{
          color: '#000000',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          No More Profiles
        </Text>
        <Text style={{
          color: '#6C757D',
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 24,
          marginBottom: 32,
        }}>
          Check back later for new connections in your area!
        </Text>
        
        <TouchableOpacity
          onPress={() => {
            if (isMounted) {
              setProfiles([]);
              setCurrentIndex(0);
              api.fetchCandidates(20).then(candidates => {
                if (isMounted) {
                  setProfiles(candidates);
                }
              }).catch(error => {
                console.error('Error refreshing profiles:', error);
              });
            }
          }}
          style={{
            backgroundColor: '#000000',
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
          }}>
            Refresh Profiles
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
    }}>
      <View style={{
        padding: 20,
        alignItems: 'center',
      }}>
        {/* Profile Counter */}
        <View style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 8,
          marginBottom: 20,
        }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: '600',
          }}>
            {currentIndex + 1} / {profiles.length}
          </Text>
        </View>

        {/* Current Profile */}
        <ProfileCard 
          profile={currentProfile}
          onPress={() => {
            // This will trigger the card expansion modal
          }}
          onPass={handlePass}
          onLike={handleLike}
        />

        {/* Action Buttons */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginTop: 30,
          paddingHorizontal: 20,
        }}>
          <TouchableOpacity
            onPress={handlePass}
            style={{
              backgroundColor: '#FFFFFF',
              padding: 20,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: '#E9ECEF',
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{
              color: '#DC3545',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
              ✕
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLike}
            style={{
              backgroundColor: '#000000',
              padding: 20,
              borderRadius: 50,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{
              color: '#FFFFFF',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
              ✓
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
