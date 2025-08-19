import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { userApi, swipeApi, matchApi } from '../../lib/api';
import { UserCard } from '../../lib/types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = screenHeight * 0.7;

export default function DiscoverScreen() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState<UserCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Animated values for card movement
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      // TODO: Get user's location and preferences
      const mockLocation = { lat: 32.7157, lng: -117.1611 }; // San Diego
      const potentialMatches = await userApi.getPotentialMatches(
        'currentUserId', // TODO: Get from auth
        mockLocation,
        50, // 50km radius
        20
      );
      setCards(potentialMatches);
    } catch (error) {
      console.error('Error loading cards:', error);
      // Load mock data for development
      setCards(getMockCards());
    } finally {
      setLoading(false);
    }
  };

  const getMockCards = (): UserCard[] => [
    {
      id: '1',
      displayName: 'Evan',
      age: 28,
      photos: ['https://via.placeholder.com/400x600/007AFF/FFFFFF?text=Evan'],
      distanceKm: 2,
      sharedInterests: ['gym', 'hiking'],
      prompts: [
        { id: '1', text: 'Weekend vibe: Hiking and coffee' },
        { id: '2', text: 'Looking for someone who: Loves the outdoors' },
      ],
      score: 85,
      createdAt: new Date(),
    },
    {
      id: '2',
      displayName: 'Max',
      age: 31,
      photos: ['https://via.placeholder.com/400x600/34C759/FFFFFF?text=Max'],
      distanceKm: 5,
      sharedInterests: ['startup', 'coffee'],
      prompts: [
        { id: '1', text: 'Weekend vibe: Coffee and deep conversations' },
        { id: '2', text: 'Looking for someone who: Is passionate about ideas' },
      ],
      score: 92,
      createdAt: new Date(),
    },
  ];

  const handleSwipe = async (direction: 'like' | 'pass') => {
    if (currentCardIndex >= cards.length) return;

    const currentCard = cards[currentCardIndex];
    
    try {
      // Record swipe in Firebase
      await swipeApi.recordSwipe(
        'currentUserId', // TODO: Get from auth
        currentCard.id,
        direction
      );

      // Check for mutual match
      if (direction === 'like') {
        const isMatch = await swipeApi.checkForMatch(
          'currentUserId',
          currentCard.id
        );
        
        if (isMatch) {
          // Create match
          await matchApi.createMatch('currentUserId', currentCard.id);
          Alert.alert('It\'s a match! 🎉', `You and ${currentCard.displayName} liked each other!`);
        }
      }
    } catch (error) {
      console.error('Error recording swipe:', error);
    }

    // Move to next card
    setCurrentCardIndex(prev => prev + 1);
    resetCardAnimation();
  };

  const resetCardAnimation = () => {
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
    rotate.value = 0;
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
      
      // Add rotation based on horizontal movement
      rotate.value = (event.translationX / screenWidth) * 20;
      
      // Scale down slightly during drag
      scale.value = 0.95;
    },
    onEnd: (event) => {
      const shouldSwipe = Math.abs(event.translationX) > screenWidth * 0.4;
      
      if (shouldSwipe) {
        const direction = event.translationX > 0 ? 'like' : 'pass';
        
        // Animate card off screen
        translateX.value = withSpring(
          event.translationX > 0 ? screenWidth : -screenWidth,
          { damping: 15 }
        );
        translateY.value = withSpring(0);
        scale.value = withSpring(0.8);
        rotate.value = withSpring(event.translationX > 0 ? 30 : -30);
        
        // Handle swipe after animation
        runOnJS(handleSwipe)(direction);
      } else {
        // Snap back to center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
        rotate.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading potential matches...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (currentCardIndex >= cards.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#8E8E93" />
          <Text style={styles.emptyTitle}>No more profiles</Text>
          <Text style={styles.emptySubtitle}>
            Check back later for new potential matches!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentCard = cards[currentCardIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>

      <View style={styles.cardContainer}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.card, cardStyle]}>
            <Image source={{ uri: currentCard.photos[0] }} style={styles.cardImage} />
            <View style={styles.cardOverlay}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>
                  {currentCard.displayName}, {currentCard.age}
                </Text>
                <Text style={styles.cardDistance}>
                  {currentCard.distanceKm} km away
                </Text>
                
                {currentCard.prompts.slice(0, 2).map((prompt) => (
                  <View key={prompt.id} style={styles.promptContainer}>
                    <Text style={styles.promptText}>{prompt.text}</Text>
                  </View>
                ))}
                
                <View style={styles.interestsContainer}>
                  {currentCard.sharedInterests.slice(0, 3).map((interest) => (
                    <View key={interest} style={styles.interestTag}>
                      <Text style={styles.interestText}>{interest}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={() => handleSwipe('pass')}
        >
          <Ionicons name="close" size={32} color="#FF3B30" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => handleSwipe('like')}
        >
          <Ionicons name="heart" size={32} color="#34C759" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  cardInfo: {
    gap: 8,
  },
  cardName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardDistance: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  promptContainer: {
    marginTop: 8,
  },
  promptText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  interestTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 40,
    paddingBottom: 40,
    gap: 40,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  passButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  likeButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#34C759',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },
});
