// Core user profile interface
export interface User {
  id: string;
  displayName: string;
  age: number;
  photos: string[]; // storage URLs
  selfieVerified: boolean;
  interests: string[];
  prompts: { id: string; text: string }[];
  location: {
    geohash: string;
    lat: number;
    lng: number;
  };
  discovery: {
    minAge: number;
    maxAge: number;
    radiusKm: number;
  };
  createdAt: Date;
  updatedAt: Date;
  pushTokens: string[];
  city: string; // human-readable city name
  bio?: string;
}

// User card for swipe deck (denormalized for performance)
export interface UserCard {
  id: string;
  displayName: string;
  age: number;
  photos: string[];
  distanceKm: number;
  sharedInterests: string[];
  prompts: { id: string; text: string }[];
  score: number;
  createdAt: Date;
}

// Swipe interaction
export interface Swipe {
  id: string; // userId_otherUserId
  fromUserId: string;
  toUserId: string;
  direction: 'like' | 'pass';
  createdAt: Date;
}

// Match between users
export interface Match {
  id: string;
  users: [string, string]; // exactly 2 user IDs
  lastMessageAt: Date;
  createdAt: Date;
  lastMessage?: string;
  unreadCount?: number;
}

// Chat message
export interface Message {
  id: string;
  matchId: string;
  from: string; // userId
  text: string;
  imageUrl?: string;
  createdAt: Date;
}

// Report for moderation
export interface Report {
  id: string;
  reporter: string; // userId
  accused: string; // userId
  reason: string;
  context?: {
    messageId?: string;
    matchId?: string;
  };
  createdAt: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}

// Interest categories for the app
export const INTEREST_CATEGORIES = {
  ACTIVITIES: ['gym', 'hiking', 'running', 'cycling', 'swimming', 'basketball', 'soccer', 'tennis'],
  LIFESTYLE: ['startup', 'entrepreneur', 'dad-life', 'single', 'married', 'student', 'professional'],
  HOBBIES: ['gaming', 'reading', 'music', 'cooking', 'travel', 'photography', 'art', 'writing'],
  SOCIAL: ['networking', 'mentoring', 'coffee-chats', 'group-activities', 'volunteering'],
} as const;

// Prompt templates for user profiles
export const PROMPT_TEMPLATES = [
  "Weekend vibe:",
  "Looking for someone who:",
  "Best conversation starter:",
  "Life goal I'm working on:",
  "Something I'm passionate about:",
  "Perfect day would be:",
] as const;

// App configuration
export interface AppConfig {
  maxDailyLikes: number;
  maxPhotos: number;
  minAge: number;
  maxAge: number;
  maxDistanceKm: number;
  swipeCooldownHours: number;
}
