import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Profile, Match, Message } from './types';

// Collection names
const COLLECTIONS = {
  PROFILES: 'profiles',
  SWIPES: 'swipes',
  MATCHES: 'matches',
  MESSAGES: 'messages'
} as const;

// Mock data for development (fallback)
const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Evan',
    age: 28,
    city: 'San Diego',
    distance: 2,
    bio: 'Looking for workout buddies and hiking partners. Love the outdoors and staying active!',
    intents: ['gym', 'hiking', 'outdoor activities'],
    interests: ['fitness', 'nature', 'adventure', 'health']
  },
  {
    id: '2',
    name: 'Max',
    age: 31,
    city: 'La Jolla',
    distance: 5,
    bio: 'Coffee enthusiast and startup founder. Always down for deep conversations and networking.',
    intents: ['study', 'coffee', 'networking'],
    interests: ['startups', 'books', 'entrepreneurship', 'technology']
  },
  {
    id: '3',
    name: 'Alex',
    age: 26,
    city: 'Pacific Beach',
    distance: 3,
    bio: 'Board game night organizer and trivia master. Looking for fellow nerds to hang with!',
    intents: ['board games', 'trivia', 'social events'],
    interests: ['games', 'puzzles', 'socializing', 'strategy']
  },
  {
    id: '4',
    name: 'Jordan',
    age: 29,
    city: 'Ocean Beach',
    distance: 7,
    bio: 'Surf instructor and beach lover. Want to find people who appreciate the ocean lifestyle.',
    intents: ['surfing', 'beach activities', 'water sports'],
    interests: ['ocean', 'surfing', 'beach', 'lifestyle']
  },
  {
    id: '5',
    name: 'Sam',
    age: 33,
    city: 'Downtown',
    distance: 1,
    bio: 'Tech geek and podcast host. Love discussing AI, startups, and the future of technology.',
    intents: ['tech discussion', 'podcasts', 'innovation'],
    interests: ['artificial intelligence', 'technology', 'innovation', 'podcasting']
  }
];

// Initialize with mock data for development
let profiles = [...mockProfiles];
let matches: Match[] = [
  {
    id: 'match1',
    users: ['me', '1'],
    lastMessage: 'Hey! How\'s it going?',
    timestamp: new Date().toISOString(),
    unreadCount: 1
  }
];
let messages: Message[] = [
  {
    id: 'msg1',
    matchId: 'match1',
    senderId: '1',
    text: 'Hey! How\'s it going?',
    timestamp: new Date().toISOString()
  }
];

// Helper function to check if Firebase is configured
const isFirebaseConfigured = () => {
  try {
    return db && typeof db !== 'undefined';
  } catch {
    return false;
  }
};

// API functions
export const api = {
  // Fetch candidate profiles
  async fetchCandidates(count: number = 20): Promise<Profile[]> {
    if (isFirebaseConfigured()) {
      try {
        const profilesRef = collection(db, COLLECTIONS.PROFILES);
        const q = query(profilesRef, limit(count));
        const snapshot = await getDocs(q);
        
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Profile[];
      } catch (error) {
        console.error('Firebase error, falling back to mock data:', error);
        return profiles.slice(0, count);
      }
    }
    
    // Fallback to mock data
    return profiles.slice(0, count);
  },

  // Like a profile
  async like(swiperId: string, targetId: string): Promise<boolean> {
    if (isFirebaseConfigured()) {
      try {
        // Add swipe record
        await addDoc(collection(db, COLLECTIONS.SWIPES), {
          swiperId,
          targetId,
          decision: 'like',
          timestamp: serverTimestamp()
        });

        // Check for mutual match
        const matchQuery = query(
          collection(db, COLLECTIONS.SWIPES),
          where('swiperId', '==', targetId),
          where('targetId', '==', swiperId),
          where('decision', '==', 'like')
        );
        
        const matchSnapshot = await getDocs(matchQuery);
        
        if (!matchSnapshot.empty) {
          // Create match
          const matchData = {
            users: [swiperId, targetId],
            timestamp: serverTimestamp(),
            lastMessage: 'You matched!',
            unreadCount: 0
          };
          
          await addDoc(collection(db, COLLECTIONS.MATCHES), matchData);
          
          // Add to local matches for immediate UI update
          const newMatch: Match = {
            id: `match_${Date.now()}`,
            users: [swiperId, targetId],
            lastMessage: 'You matched!',
            timestamp: new Date().toISOString(),
            unreadCount: 0
          };
          matches.push(newMatch);
        }

        return true;
      } catch (error) {
        console.error('Firebase error:', error);
        return false;
      }
    }

    // Mock implementation
    const targetProfile = profiles.find(p => p.id === targetId);
    if (targetProfile) {
      // Simulate match creation
      const newMatch: Match = {
        id: `match_${Date.now()}`,
        users: [swiperId, targetId],
        lastMessage: 'You matched!',
        timestamp: new Date().toISOString(),
        unreadCount: 0
      };
      matches.push(newMatch);
    }
    
    return true;
  },

  // Pass on a profile
  async pass(swiperId: string, targetId: string): Promise<boolean> {
    if (isFirebaseConfigured()) {
      try {
        await addDoc(collection(db, COLLECTIONS.SWIPES), {
          swiperId,
          targetId,
          decision: 'pass',
          timestamp: serverTimestamp()
        });
        return true;
      } catch (error) {
        console.error('Firebase error:', error);
        return false;
      }
    }
    
    return true;
  },

  // Get user matches
  async getMatches(userId: string): Promise<Match[]> {
    if (isFirebaseConfigured()) {
      try {
        const matchesRef = collection(db, COLLECTIONS.MATCHES);
        const q = query(
          matchesRef,
          where('users', 'array-contains', userId),
          orderBy('timestamp', 'desc')
        );
        
        const snapshot = await getDocs(q);
        
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
        })) as Match[];
      } catch (error) {
        console.error('Firebase error, falling back to mock data:', error);
        return matches.filter(m => m.users.includes(userId));
      }
    }
    
    return matches.filter(m => m.users.includes(userId));
  },

  // Get messages for a match
  async getMessages(matchId: string): Promise<Message[]> {
    if (isFirebaseConfigured()) {
      try {
        const messagesRef = collection(db, COLLECTIONS.MESSAGES);
        const q = query(
          messagesRef,
          where('matchId', '==', matchId),
          orderBy('timestamp', 'asc')
        );
        
        const snapshot = await getDocs(q);
        
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
        })) as Message[];
      } catch (error) {
        console.error('Firebase error, falling back to mock data:', error);
        return messages.filter(m => m.matchId === matchId);
      }
    }
    
    return messages.filter(m => m.matchId === matchId);
  },

  // Send a message
  async sendMessage(matchId: string, senderId: string, text: string): Promise<boolean> {
    if (isFirebaseConfigured()) {
      try {
        await addDoc(collection(db, COLLECTIONS.MESSAGES), {
          matchId,
          senderId,
          text,
          timestamp: serverTimestamp()
        });

        // Update match with last message
        const matchQuery = query(
          collection(db, COLLECTIONS.MATCHES),
          where('__name__', '==', matchId)
        );
        
        const matchSnapshot = await getDocs(matchQuery);
        if (!matchSnapshot.empty) {
          const matchDoc = matchSnapshot.docs[0];
          await updateDoc(doc(db, COLLECTIONS.MATCHES, matchDoc.id), {
            lastMessage: text,
            timestamp: serverTimestamp()
          });
        }

        return true;
      } catch (error) {
        console.error('Firebase error:', error);
        return false;
      }
    }

    // Mock implementation
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      matchId,
      senderId,
      text,
      timestamp: new Date().toISOString()
    };
    messages.push(newMessage);
    
    // Update match
    const match = matches.find(m => m.id === matchId);
    if (match) {
      match.lastMessage = text;
      match.timestamp = new Date().toISOString();
    }
    
    return true;
  },

  // Reset data (for development)
  resetData() {
    profiles = [...mockProfiles];
    matches = [
      {
        id: 'match1',
        users: ['me', '1'],
        lastMessage: 'Hey! How\'s it going?',
        timestamp: new Date().toISOString(),
        unreadCount: 1
      }
    ];
    messages = [
      {
        id: 'msg1',
        matchId: 'match1',
        senderId: '1',
        text: 'Hey! How\'s it going?',
        timestamp: new Date().toISOString()
      }
    ];
  }
};
