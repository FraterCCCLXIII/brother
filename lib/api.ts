import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  writeBatch,
  serverTimestamp,
  GeoPoint,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from './firebase';
import { User, UserCard, Swipe, Match, Message, Report } from './types';

// User Management
export const userApi = {
  // Create or update user profile
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const userRef = collection(db, 'users');
    const docRef = await addDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // Get user by ID
  async getUser(userId: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as User;
    }
    return null;
  },

  // Update user profile
  async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  // Get potential matches for user
  async getPotentialMatches(
    userId: string,
    userLocation: { lat: number; lng: number },
    radiusKm: number,
    limitCount: number = 20
  ): Promise<UserCard[]> {
    // In a real app, you'd use geohashing for efficient location queries
    // For MVP, we'll get all users and filter by distance
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('id', '!=', userId),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    
    // Filter by distance and convert to UserCard format
    return users
      .filter(user => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          user.location.lat,
          user.location.lng
        );
        return distance <= radiusKm;
      })
      .map(user => ({
        id: user.id,
        displayName: user.displayName,
        age: user.age,
        photos: user.photos,
        distanceKm: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          user.location.lat,
          user.location.lng
        ),
        sharedInterests: [], // TODO: Calculate shared interests
        prompts: user.prompts,
        score: 0, // TODO: Implement scoring algorithm
        createdAt: user.createdAt,
      }));
  },
};

// Swipe Management
export const swipeApi = {
  // Record a swipe
  async recordSwipe(fromUserId: string, toUserId: string, direction: 'like' | 'pass'): Promise<void> {
    const swipeId = `${fromUserId}_${toUserId}`;
    const swipeRef = doc(db, 'swipes', swipeId);
    
    await setDoc(swipeRef, {
      fromUserId,
      toUserId,
      direction,
      createdAt: serverTimestamp(),
    }, { merge: true });
  },

  // Check if there's a mutual match
  async checkForMatch(userId1: string, userId2: string): Promise<boolean> {
    const swipe1 = await getDoc(doc(db, 'swipes', `${userId1}_${userId2}`));
    const swipe2 = await getDoc(doc(db, 'swipes', `${userId2}_${userId1}`));
    
    return swipe1.exists() && swipe2.exists() && 
           swipe1.data()?.direction === 'like' && 
           swipe2.data()?.direction === 'like';
  },

  // Get user's swipes
  async getUserSwipes(userId: string): Promise<Swipe[]> {
    const swipesRef = collection(db, 'swipes');
    const q = query(
      swipesRef,
      where('fromUserId', '==', userId)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Swipe));
  },
};

// Match Management
export const matchApi = {
  // Create a new match
  async createMatch(userId1: string, userId2: string): Promise<string> {
    const matchRef = collection(db, 'matches');
    const docRef = await addDoc(matchRef, {
      users: [userId1, userId2],
      lastMessageAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // Get user's matches
  async getUserMatches(userId: string): Promise<Match[]> {
    const matchesRef = collection(db, 'matches');
    const q = query(
      matchesRef,
      where('users', 'array-contains', userId),
      orderBy('lastMessageAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match));
  },

  // Get match by ID
  async getMatch(matchId: string): Promise<Match | null> {
    const matchDoc = await getDoc(doc(db, 'matches', matchId));
    if (matchDoc.exists()) {
      return { id: matchDoc.id, ...matchDoc.data() } as Match;
    }
    return null;
  },
};

// Chat Management
export const chatApi = {
  // Send a message
  async sendMessage(matchId: string, fromUserId: string, text: string, imageUrl?: string): Promise<string> {
    const messagesRef = collection(db, 'chats', matchId, 'messages');
    const docRef = await addDoc(messagesRef, {
      from: fromUserId,
      text,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    // Update match's lastMessageAt
    const matchRef = doc(db, 'matches', matchId);
    await updateDoc(matchRef, {
      lastMessageAt: serverTimestamp(),
      lastMessage: text,
    });

    return docRef.id;
  },

  // Get messages for a match
  async getMessages(matchId: string, limitCount: number = 50): Promise<Message[]> {
    const messagesRef = collection(db, 'chats', matchId, 'messages');
    const q = query(
      messagesRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Message))
      .reverse(); // Show oldest first
  },

  // Listen to messages in real-time
  subscribeToMessages(matchId: string, callback: (messages: Message[]) => void) {
    const messagesRef = collection(db, 'chats', matchId, 'messages');
    const q = query(
      messagesRef,
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Message))
        .reverse();
      callback(messages);
    });
  },
};

// Storage Management
export const storageApi = {
  // Upload photo
  async uploadPhoto(userId: string, photoBlob: Blob, photoIndex: number): Promise<string> {
    const photoRef = ref(storage, `users/${userId}/photos/${photoIndex}.jpg`);
    await uploadBytes(photoRef, photoBlob);
    return await getDownloadURL(photoRef);
  },

  // Upload selfie for verification
  async uploadSelfie(userId: string, selfieBlob: Blob): Promise<string> {
    const selfieRef = ref(storage, `users/${userId}/selfie.jpg`);
    await uploadBytes(selfieRef, selfieBlob);
    return await getDownloadURL(selfieRef);
  },
};

// Report Management
export const reportApi = {
  // Create a report
  async createReport(report: Omit<Report, 'id' | 'createdAt' | 'status'>): Promise<string> {
    const reportRef = collection(db, 'reports');
    const docRef = await addDoc(reportRef, {
      ...report,
      createdAt: serverTimestamp(),
      status: 'pending',
    });
    return docRef.id;
  },
};

// Utility functions
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
