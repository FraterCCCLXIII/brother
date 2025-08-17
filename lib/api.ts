import { Profile, Match, Message } from './types';
import { mockProfiles } from './mock';

// In-memory storage for MVP
let profiles = [...mockProfiles];
let likes: string[] = [];
let matches: Match[] = [
  // Create some demo matches
  {
    id: 'match1',
    a: 'current_user',
    b: '1',
    last: 'Hey! Would love to grab coffee sometime!'
  },
  {
    id: 'match2',
    a: 'current_user',
    b: '3',
    last: 'That hiking trip sounds amazing!'
  },
  {
    id: 'match3',
    a: 'current_user',
    b: '5',
    last: 'Love your design work!'
  }
];
let messages: Message[] = [
  // Add some demo messages
  {
    id: 'msg1',
    matchId: 'match1',
    sender: '1',
    body: 'Hey! Would love to grab coffee sometime!',
    createdAt: Date.now() - 3600000 // 1 hour ago
  },
  {
    id: 'msg2',
    matchId: 'match1',
    sender: 'current_user',
    body: 'Absolutely! Coffee sounds great. When are you free?',
    createdAt: Date.now() - 1800000 // 30 minutes ago
  },
  {
    id: 'msg3',
    matchId: 'match2',
    sender: '3',
    body: 'That hiking trip sounds amazing!',
    createdAt: Date.now() - 7200000 // 2 hours ago
  },
  {
    id: 'msg4',
    matchId: 'match3',
    sender: '5',
    body: 'Love your design work!',
    createdAt: Date.now() - 10800000 // 3 hours ago
  }
];

export const api = {
  async fetchCandidates(batch: number = 20): Promise<Profile[]> {
    // Return profiles that haven't been liked or matched yet
    const availableProfiles = profiles.filter(profile => 
      !likes.includes(profile.id) && 
      !matches.some(match => 
        (match.a === profile.id || match.b === profile.id) && 
        (match.a === 'current_user' || match.b === 'current_user')
      )
    );
    
    return availableProfiles.slice(0, batch);
  },

  async like(targetId: string): Promise<{ matched?: Match }> {
    likes.push(targetId);
    
    // 20% chance of mutual match for demo purposes
    if (Math.random() < 0.2) {
      const newMatch: Match = {
        id: `match_${Date.now()}`,
        a: 'current_user',
        b: targetId,
        last: 'You matched!'
      };
      
      matches.push(newMatch);
      return { matched: newMatch };
    }
    
    return {};
  },

  async passOn(targetId: string): Promise<void> {
    // Just track that we passed on this profile
    // In a real app, this might be used for recommendations
  },

  async listMatches(): Promise<Match[]> {
    return matches;
  },

  async listMessages(matchId: string): Promise<Message[]> {
    return messages.filter(msg => msg.matchId === matchId);
  },

  async sendMessage(matchId: string, body: string): Promise<Message> {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      matchId,
      sender: 'current_user',
      body,
      createdAt: Date.now()
    };
    
    messages.push(newMessage);
    
    // Update the last message in the match
    const match = matches.find(m => m.id === matchId);
    if (match) {
      match.last = body;
    }
    
    return newMessage;
  },

  resetData(): void {
    profiles = [...mockProfiles];
    likes = [];
    matches = [
      {
        id: 'match1',
        a: 'current_user',
        b: '1',
        last: 'Hey! Would love to grab coffee sometime!'
      },
      {
        id: 'match2',
        a: 'current_user',
        b: '3',
        last: 'That hiking trip sounds amazing!'
      },
      {
        id: 'match3',
        a: 'current_user',
        b: '5',
        last: 'Love your design work!'
      }
    ];
    messages = [
      {
        id: 'msg1',
        matchId: 'match1',
        sender: '1',
        body: 'Hey! Would love to grab coffee sometime!',
        createdAt: Date.now() - 3600000
      },
      {
        id: 'msg2',
        matchId: 'match1',
        sender: 'current_user',
        body: 'Absolutely! Coffee sounds great. When are you free?',
        createdAt: Date.now() - 1800000
      },
      {
        id: 'msg3',
        matchId: 'match2',
        sender: '3',
        body: 'That hiking trip sounds amazing!',
        createdAt: Date.now() - 7200000
      },
      {
        id: 'msg4',
        matchId: 'match3',
        sender: '5',
        body: 'Love your design work!',
        createdAt: Date.now() - 10800000
      }
    ];
  }
};
