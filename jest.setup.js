// Mock expo modules for testing
jest.mock('expo-haptics', () => ({
  notificationAsync: jest.fn(),
}));

jest.mock('expo-image', () => ({
  Image: 'Image',
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useFocusEffect: jest.fn(),
}));

jest.mock('react-native-gesture-handler', () => {});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-deck-swiper
jest.mock('react-native-deck-swiper', () => 'Swiper');

// Mock react-native-gifted-chat
jest.mock('react-native-gifted-chat', () => ({
  GiftedChat: 'GiftedChat',
  IMessage: {},
  User: {},
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

