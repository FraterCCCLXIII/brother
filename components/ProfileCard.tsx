import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Profile } from '../lib/types';
import { SwipeActions } from './SwipeActions';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.75;

interface ProfileCardProps {
  profile: Profile;
  onPress?: () => void;
  onPass?: () => void;
  onLike?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onPress, onPass, onLike }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardPress = () => {
    setIsExpanded(true);
  };

  const closeExpanded = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleCardPress}
        style={{
          width: width * 0.9,
          height: CARD_HEIGHT,
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          overflow: 'hidden',
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
        activeOpacity={0.95}
      >
        {/* Image Placeholder */}
        <View style={{
          width: '100%',
          height: CARD_HEIGHT * 0.7,
          backgroundColor: '#F8F9FA',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Ionicons name="person" size={80} color="#6C757D" />
        </View>

        {/* Info Overlay */}
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: 20,
          paddingBottom: 24,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{
              color: '#000000',
              fontSize: 24,
              fontWeight: 'bold',
              marginRight: 12,
            }}>
              {profile.name}, {profile.age}
            </Text>
            <View style={{
              width: 8,
              height: 8,
              backgroundColor: '#28A745',
              borderRadius: 4,
            }} />
          </View>
          
          <Text style={{
            color: '#6C757D',
            fontSize: 16,
            marginBottom: 16,
          }}>
            {profile.city} • {profile.distance}km away
          </Text>
          
          <Text style={{
            color: '#000000',
            fontSize: 16,
            lineHeight: 22,
            marginBottom: 16,
          }}>
            {profile.bio}
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {profile.intents.slice(0, 3).map((intent, index) => (
              <View key={index} style={{
                backgroundColor: '#000000',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                marginRight: 8,
                marginBottom: 8,
              }}>
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                  {intent}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tap to expand hint */}
        <View style={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 6,
        }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: '600',
          }}>
            Tap to expand
          </Text>
        </View>
      </TouchableOpacity>

      {/* Expanded Modal */}
      <Modal
        visible={isExpanded}
        transparent={true}
        animationType="slide"
        onRequestClose={closeExpanded}
      >
        <View style={{
          flex: 1,
          backgroundColor: '#000000',
        }}>
          {/* Close Button */}
          <TouchableOpacity
            onPress={closeExpanded}
            style={{
              position: 'absolute',
              top: 60,
              right: 20,
              zIndex: 1000,
              width: 44,
              height: 44,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {/* Full Screen Image */}
            <View style={{
              width: '100%',
              height: height * 0.6,
              backgroundColor: '#F8F9FA',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Ionicons name="person" size={120} color="#6C757D" />
            </View>

            {/* Profile Details */}
            <View style={{
              backgroundColor: '#FFFFFF',
              padding: 24,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              marginTop: -24,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{
                  color: '#000000',
                  fontSize: 28,
                  fontWeight: 'bold',
                  marginRight: 16,
                }}>
                  {profile.name}, {profile.age}
                </Text>
                <View style={{
                  width: 12,
                  height: 12,
                  backgroundColor: '#28A745',
                  borderRadius: 6,
                }} />
              </View>
              
              <Text style={{
                color: '#6C757D',
                fontSize: 18,
                marginBottom: 24,
              }}>
                {profile.city} • {profile.distance}km away
              </Text>
              
              <Text style={{
                color: '#000000',
                fontSize: 18,
                lineHeight: 26,
                marginBottom: 24,
              }}>
                {profile.bio}
              </Text>

              {/* Intents Section */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 16,
                }}>
                  Looking for
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {profile.intents.map((intent, index) => (
                    <View key={index} style={{
                      backgroundColor: '#000000',
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      marginRight: 12,
                      marginBottom: 12,
                    }}>
                      <Text style={{
                        color: '#FFFFFF',
                        fontSize: 14,
                        fontWeight: '600',
                      }}>
                        {intent}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Interests Section */}
              <View style={{ marginBottom: 32 }}>
                <Text style={{
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 16,
                }}>
                  Interests
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {profile.interests.map((interest, index) => (
                    <View key={index} style={{
                      backgroundColor: '#F8F9FA',
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      marginRight: 12,
                      marginBottom: 12,
                      borderWidth: 1,
                      borderColor: '#E9ECEF',
                    }}>
                      <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                        {interest}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Swipe Actions over expanded modal */}
          {onPass && onLike && (
            <SwipeActions onPass={onPass} onLike={onLike} isExpanded={true} />
          )}
        </View>
      </Modal>
    </>
  );
};
