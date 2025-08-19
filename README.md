# Brother App 🫂

A Tinder-like mobile app for making male friendships (platonic). Built with React Native, Expo, and TypeScript.

## 🚀 Features

### Core Functionality
- **Profile Creation** - Multi-step onboarding with bio, intents, and interests
- **Swipe Deck** - Like/Pass on potential friendship matches
- **Matching System** - Mutual likes create friendships
- **Chat** - 1:1 messaging with matches
- **Profile Management** - Edit and manage your profile

### User Experience
- **Mobile-First Design** - Optimized for iOS and Android
- **Modern UI/UX** - Clean monochromatic design with smooth animations
- **Gesture Support** - Swipe, tap, and pull gestures for intuitive navigation
- **Card Expansion** - Tap cards to see full profiles
- **Haptic Feedback** - Tactile responses for better engagement

### Safety & Privacy
- **Report System** - Report inappropriate behavior
- **Block Users** - Block unwanted contacts
- **Account Controls** - Pause or delete account
- **Distance Settings** - Control match radius

## 🛠 Tech Stack

- **Frontend**: React Native + TypeScript
- **Navigation**: Expo Router (Stack + Tabs)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Animations**: React Native Reanimated + Gesture Handler
- **Images**: Expo Image with caching
- **Testing**: Jest + React Native Testing Library
- **Development**: Expo Go for rapid prototyping

## 📱 Screenshots

*Screenshots will be added here once the app is running*

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/brother.git
   cd brother
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your phone

## 🏗 Project Structure

```
brother/
├── app/                    # Expo Router screens
│   ├── (tabs)/           # Tab navigation screens
│   ├── auth/             # Authentication screens
│   ├── chat/             # Chat functionality
│   └── report/           # Report/block screens
├── components/            # Reusable UI components
├── lib/                   # Utilities and business logic
│   ├── api.ts            # Mock API implementation
│   ├── mock.ts           # Sample data
│   ├── theme.ts          # Design tokens
│   └── types.ts          # TypeScript interfaces
├── __tests__/            # Test files
└── global.css            # Tailwind CSS imports
```

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000)
- **Background**: White (#FFFFFF)
- **Secondary**: Grey (#6C757D)
- **Success**: Green (#28A745)
- **Danger**: Red (#DC3545)
- **Border**: Light Grey (#E9ECEF)

### Typography
- **Headings**: Bold, 24-28px
- **Body**: Regular, 16-18px
- **Captions**: Medium, 14px

### Spacing
- **Base Unit**: 8px
- **Card Padding**: 24px
- **Button Height**: 56px
- **Border Radius**: 16px

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📱 Building for Production

### iOS
```bash
npx expo build:ios
```

### Android
```bash
npx expo build:android
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file for any environment-specific configuration:
```env
EXPO_PUBLIC_API_URL=your_api_url_here
```

### App Configuration
Edit `app.json` to customize:
- App name and bundle identifier
- Version and build numbers
- Permissions and capabilities
- Deep linking configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- UI components inspired by modern mobile design patterns
- Icons from [Expo Vector Icons](https://icons.expo.fyi/)

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the [Expo documentation](https://docs.expo.dev/)
- Review the [React Native docs](https://reactnative.dev/)

---

**Made with ❤️ for building meaningful male friendships**

