import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SwipeActions } from '../../components/SwipeActions';
import { ProfileCard } from '../../components/ProfileCard';
import { api } from '../../lib/api';
import { Profile } from '../../lib/types';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const swiperRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const candidates = await api.fetchCandidates(20);
      setProfiles(candidates);
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  };

  const handlePass = () => {
    if (swiperRef.current && profiles.length > 0) {
      swiperRef.current.swipeLeft();
    }
  };

  const handleLike = () => {
    if (swiperRef.current && profiles.length > 0) {
      swiperRef.current.swipeRight();
    }
  };

  const renderCard = (profile: Profile, index: number) => {
    // Add null check to prevent the error
    if (!profile || !profile.id) {
      return null;
    }
    
    return (
      <ProfileCard 
        key={profile.id} 
        profile={profile}
        onPress={() => {
          // This will trigger the card expansion modal
        }}
        onPass={() => {
          // Handle pass from expanded card
          if (swiperRef.current) {
            swiperRef.current.swipeLeft();
            closeExpandedCard();
          }
        }}
        onLike={() => {
          // Handle like from expanded card
          if (swiperRef.current) {
            swiperRef.current.swipeRight();
            closeExpandedCard();
          }
        }}
      />
    );
  };

  const closeExpandedCard = () => {
    // This will be called when a swipe action is performed from expanded state
    // The modal will close automatically due to the swipe
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
        
        {/* Refresh Button */}
        <TouchableOpacity
          onPress={loadProfiles}
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

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Swiper
        ref={swiperRef}
        cards={profiles}
        renderCard={renderCard}
        onSwiped={(cardIndex) => {
          setCurrentIndex(cardIndex + 1);
        }}
        cardIndex={0}
        backgroundColor="transparent"
        stackSize={3}
        cardVerticalMargin={height * 0.05}
        cardHorizontalMargin={width * 0.05}
        animateOverlayLabelsOpacity
        overlayLabels={{
          left: {
            element: (
              <View style={{
                backgroundColor: '#DC3545',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#FFFFFF',
              }}>
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                  PASS
                </Text>
              </View>
            ),
            style: {
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: -30,
              },
            },
          },
          right: {
            element: (
              <View style={{
                backgroundColor: '#28A745',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: '#FFFFFF',
              }}>
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                  LIKE
                </Text>
              </View>
            ),
            style: {
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 30,
                marginLeft: 30,
              },
            },
          },
        }}
        onSwipedAll={() => {
          // Handle when all cards are swiped
          setProfiles([]); // Clear profiles when all are swiped
        }}
        onSwipedTop={() => {
          // Handle slide up gesture - could expand the card
          if (swiperRef.current && currentIndex < profiles.length) {
            // Trigger card expansion
            const currentProfile = profiles[currentIndex];
            // You could add a callback here to expand the current card
          }
        }}
        onSwipedBottom={() => {
          // Handle pull down gesture - pass on the profile
          if (swiperRef.current && currentIndex < profiles.length) {
            // Pass on the current profile
            handlePass();
          }
        }}
        swipeAnimationDuration={300}
        disableTopSwipe={false}
        disableBottomSwipe={false}
        disableLeftSwipe={false}
        disableRightSwipe={false}
      />
      
      {/* Only show swipe actions when there are profiles */}
      {profiles.length > 0 && (
        <SwipeActions onPass={handlePass} onLike={handleLike} />
      )}
      
      {/* Profile Counter - only show when there are profiles */}
      {profiles.length > 0 && (
        <View style={{
          position: 'absolute',
          top: height * 0.1,
          right: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: '600',
          }}>
            {currentIndex + 1} / {profiles.length}
          </Text>
        </View>
      )}
    </View>
  );
}
