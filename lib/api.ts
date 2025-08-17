import { Profile, Match, Message } from './types';
import { mockProfiles } from './mock';

// In-memory storage for MVP
let profiles = [...mockProfiles];
let likes: string[] = [];
let matches: Match[] = [];
let messages: Message[] = [];

export const api = {
  // Fetch candidates for swiping
  async fetchCandidates(batch: number = 20): Promise<Profile[]> {
    // Filter out already liked/passed profiles
    const availableProfiles = profiles.filter(p => !likes.includes(p.id));
    return availableProfiles.slice(0, batch);
  },

  // Like a profile - 20% chance of match
  async like(targetId: string): Promise<{ matched?: Match }> {
    likes.push(targetId);
    
    // 20% chance of mutual like (match)
    if (Math.random() < 0.2) {
      const newMatch: Match = {
        id: `match_${Date.now()}`,
        a: 'current_user', // In real app, this would be the logged-in user's ID
        b: targetId,
      };
      matches.push(newMatch);
      return { matched: newMatch };
    }
    
    return {};
  },

  // Pass on a profile
  async passOn(targetId: string): Promise<void> {
    // In a real app, we might track passes to avoid showing the same profile again
    // For MVP, we just add to likes array to filter them out
    likes.push(targetId);
  },

  // List all matches
  async listMatches(): Promise<Match[]> {
    return matches;
  },

  // List messages for a specific match
  async listMessages(matchId: string): Promise<Message[]> {
    return messages.filter(m => m.matchId === matchId);
  },

  // Send a message
  async sendMessage(matchId: string, body: string): Promise<Message> {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      matchId,
      sender: 'current_user', // In real app, this would be the logged-in user's ID
      body,
      createdAt: Date.now(),
    };
    
    messages.push(newMessage);
    
    // Update the last message preview in the match
    const matchIndex = matches.findIndex(m => m.id === matchId);
    if (matchIndex !== -1) {
      matches[matchIndex].last = body;
    }
    
    return newMessage;
  },

  // Reset data for testing (useful for development)
  resetData(): void {
    likes = [];
    matches = [];
    messages = [];
    profiles = [...mockProfiles];
  }
};
