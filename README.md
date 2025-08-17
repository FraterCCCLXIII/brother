# Brother - Male Friendship App

A Tinder-like app for making male friendships (platonic) built with Expo + React Native.

## Features

- **Swipe Deck**: Browse profiles and swipe right to like or left to pass
- **Matching**: 20% chance of mutual like creating a match
- **Chat**: Real-time messaging with matched users
- **Profile Creation**: Build your profile with intents and interests
- **Settings**: Account management and preferences
- **Safety**: Report and block functionality

## Tech Stack

- **Framework**: Expo + React Native (TypeScript)
- **Navigation**: expo-router (Stack/Tabs)
- **Styling**: NativeWind (Tailwind for React Native)
- **Gestures/Animations**: react-native-gesture-handler, react-native-reanimated
- **Images**: expo-image
- **Chat UI**: react-native-gifted-chat
- **Swipe Deck**: react-native-deck-swiper
- **Haptics**: expo-haptics
- **Forms**: react-hook-form + zod
- **State**: Local component state + hooks

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI
- iOS Simulator (Xcode) or Android Emulator (Android Studio)

## Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run start
   ```

3. **Run on device/simulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## Project Structure

```
brother/
├── app/                    # Expo Router screens
│   ├── (tabs)/           # Tab navigation (Home, Matches, Settings)
│   ├── auth/             # Authentication flows
│   ├── chat/             # Chat screens
│   └── report/           # Report/Block functionality
├── components/            # Reusable UI components
├── lib/                   # Utilities and mock API
└── assets/               # Images and static files
```

## Key Components

- **ProfileCard**: Displays user profiles in the swipe deck
- **SwipeActions**: Floating like/pass buttons
- **TopBar**: Consistent navigation header
- **FormField**: Form inputs with validation
- **Chip**: Selectable intent/interest chips

## Mock API

The app includes a mock API (`lib/api.ts`) that simulates:
- Profile fetching with 20% match probability
- Like/pass functionality
- Match management
- Chat messaging

## Development Notes

- **Theme**: Dark-first design with consistent color tokens
- **Accessibility**: VoiceOver labels and 44x44 touch targets
- **Responsiveness**: Mobile-first design with proper keyboard handling
- **Performance**: Image caching and optimized re-renders

## Future Enhancements

- Real backend integration (Supabase/Cloudflare)
- Push notifications
- User authentication
- Profile photo uploads
- Advanced matching algorithms
- Web/PWA support

## Troubleshooting

- **Metro bundler issues**: Clear cache with `npx expo start --clear`
- **iOS build errors**: Ensure Xcode is up to date
- **Android build errors**: Check Android SDK and emulator setup

## License

MIT License - see LICENSE file for details
