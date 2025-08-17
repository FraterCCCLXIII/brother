import { api } from '../lib/api';

describe('Mock API', () => {
  beforeEach(() => {
    // Reset data before each test
    api.resetData();
  });

  describe('fetchCandidates', () => {
    it('should return available profiles', async () => {
      const candidates = await api.fetchCandidates(5);
      expect(candidates).toHaveLength(5);
      expect(candidates[0]).toHaveProperty('id');
      expect(candidates[0]).toHaveProperty('name');
    });

    it('should filter out already liked profiles', async () => {
      // Like a profile first
      await api.like('1');
      
      const candidates = await api.fetchCandidates(10);
      const hasLikedProfile = candidates.some(p => p.id === '1');
      expect(hasLikedProfile).toBe(false);
    });
  });

  describe('like', () => {
    it('should add profile to likes', async () => {
      const result = await api.like('1');
      expect(result).toBeDefined();
      
      // Check that profile is now filtered out
      const candidates = await api.fetchCandidates(10);
      const hasLikedProfile = candidates.some(p => p.id === '1');
      expect(hasLikedProfile).toBe(false);
    });

    it('should sometimes create a match', async () => {
      // Test multiple likes to see if we get a match
      let hasMatch = false;
      for (let i = 0; i < 20; i++) {
        const result = await api.like(`test_${i}`);
        if (result.matched) {
          hasMatch = true;
          break;
        }
      }
      
      // With 20% probability, we should get at least one match in 20 attempts
      expect(hasMatch).toBe(true);
    });
  });

  describe('passOn', () => {
    it('should filter out passed profiles', async () => {
      await api.passOn('1');
      
      const candidates = await api.fetchCandidates(10);
      const hasPassedProfile = candidates.some(p => p.id === '1');
      expect(hasPassedProfile).toBe(false);
    });
  });

  describe('listMatches', () => {
    it('should return empty array initially', async () => {
      const matches = await api.listMatches();
      expect(matches).toHaveLength(0);
    });

    it('should return matches after liking', async () => {
      // Like multiple profiles until we get a match
      let match: any = null;
      for (let i = 0; i < 20; i++) {
        const result = await api.like(`test_${i}`);
        if (result.matched) {
          match = result.matched;
          break;
        }
      }
      
      if (match) {
        const matches = await api.listMatches();
        expect(matches).toHaveLength(1);
        expect(matches[0].id).toBe(match.id);
      }
    });
  });

  describe('sendMessage', () => {
    it('should create and return a message', async () => {
      // First create a match
      let match: any = null;
      for (let i = 0; i < 20; i++) {
        const result = await api.like(`test_${i}`);
        if (result.matched) {
          match = result.matched;
          break;
        }
      }
      
      if (match) {
        const message = await api.sendMessage(match.id, 'Hello!');
        expect(message.body).toBe('Hello!');
        expect(message.matchId).toBe(match.id);
        expect(message.sender).toBe('current_user');
      }
    });

    it('should update match last message', async () => {
      // First create a match
      let match: any = null;
      for (let i = 0; i < 20; i++) {
        const result = await api.like(`test_${i}`);
        if (result.matched) {
          match = result.matched;
          break;
        }
      }
      
      if (match) {
        await api.sendMessage(match.id, 'Test message');
        
        const matches = await api.listMatches();
        const updatedMatch = matches.find(m => m.id === match.id);
        expect(updatedMatch?.last).toBe('Test message');
      }
    });
  });
});
