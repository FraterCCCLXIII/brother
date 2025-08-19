import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { matchApi } from '../../lib/api';
import { Match } from '../../lib/types';

export default function MatchesScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      // TODO: Get current user ID from auth
      const userMatches = await matchApi.getUserMatches('currentUserId');
      setMatches(userMatches);
    } catch (error) {
      console.error('Error loading matches:', error);
      // Load mock data for development
      setMatches(getMockMatches());
    } finally {
      setLoading(false);
    }
  };

  const getMockMatches = (): Match[] => [
    {
      id: 'match1',
      users: ['currentUserId', 'user1'],
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      lastMessage: 'Hey! How\'s it going?',
      unreadCount: 1,
    },
    {
      id: 'match2',
      users: ['currentUserId', 'user2'],
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      lastMessage: 'That sounds great! Let\'s meet up',
      unreadCount: 0,
    },
  ];

  const handleMatchPress = (match: Match) => {
    router.push(`/chat/${match.id}`);
  };

  const handleUnmatch = (match: Match) => {
    Alert.alert(
      'Unmatch',
      'Are you sure you want to unmatch? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unmatch',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement unmatch functionality
            setMatches(prev => prev.filter(m => m.id !== match.id));
          },
        },
      ]
    );
  };

  const renderMatch = ({ item: match }: { item: Match }) => {
    // TODO: Get the other user's profile data
    const otherUserId = match.users.find(id => id !== 'currentUserId') || '';
    const otherUserName = `User ${otherUserId.slice(-4)}`; // Temporary display name

    return (
      <TouchableOpacity
        style={styles.matchItem}
        onPress={() => handleMatchPress(match)}
        activeOpacity={0.7}
      >
        <View style={styles.matchContent}>
          <Image
            source={{ uri: `https://via.placeholder.com/60x60/007AFF/FFFFFF?text=${otherUserName.charAt(0)}` }}
            style={styles.avatar}
          />
          
          <View style={styles.matchInfo}>
            <Text style={styles.matchName}>{otherUserName}</Text>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {match.lastMessage || 'Start a conversation!'}
            </Text>
            <Text style={styles.timestamp}>
              {formatTimestamp(match.lastMessageAt)}
            </Text>
          </View>

          {match.unreadCount && match.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {match.unreadCount > 99 ? '99+' : match.unreadCount}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.unmatchButton}
            onPress={() => handleUnmatch(match)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close-circle" size={24} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading matches...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
        <Text style={styles.matchCount}>{matches.length} match{matches.length !== 1 ? 'es' : ''}</Text>
      </View>

      {matches.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={64} color="#8E8E93" />
          <Text style={styles.emptyTitle}>No matches yet</Text>
          <Text style={styles.emptySubtitle}>
            Start swiping to find your first match!
          </Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.matchesList}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  matchCount: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
  },
  matchesList: {
    paddingVertical: 8,
  },
  matchItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  matchInfo: {
    flex: 1,
    marginRight: 12,
  },
  matchName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#C7C7CC',
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  unmatchButton: {
    padding: 4,
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
