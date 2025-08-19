export interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  distance: number; // miles
  photo?: string; // Made optional since we're using placeholders
  bio: string;
  intents: string[];
  interests: string[];
}

export interface Match {
  id: string;
  users: string[]; // Array of profile IDs
  lastMessage: string; // last message preview
  timestamp: string; // ISO string
  unreadCount: number;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string; // profile ID
  text: string;
  timestamp: string; // ISO string
}
