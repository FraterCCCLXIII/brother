export interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  distance: number; // miles
  photo: string;
  bio: string;
  intents: string[];
  interests: string[];
}

export interface Match {
  id: string;
  a: string; // profile ID
  b: string; // profile ID
  last?: string; // last message preview
}

export interface Message {
  id: string;
  matchId: string;
  sender: string; // profile ID
  body: string;
  createdAt: number; // epoch ms
}

export interface IMessage {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
}
