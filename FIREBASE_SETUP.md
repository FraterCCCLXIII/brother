# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `brother-app`
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Add Web App

1. Click the web icon (</>) 
2. Enter app nickname: `brother-web`
3. Click "Register app"
4. Copy the config object

## 3. Update Firebase Config

Replace the placeholder values in `lib/firebase.ts` with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 4. Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

## 5. Set Up Security Rules

In Firestore Database > Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for all users (development only)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Note: These rules allow anyone to read/write. For production, implement proper authentication and security rules.**

## 6. Enable Authentication (Optional)

1. Go to "Authentication" in Firebase Console
2. Click "Get started"
3. Enable "Email/Password" provider
4. Add test users if needed

## 7. Test the App

1. Start the app: `npm run start:clean`
2. The app will use mock data initially
3. Once Firebase is configured, it will automatically switch to real-time data

## 8. Production Considerations

- Implement proper authentication
- Set up security rules
- Enable Firebase App Check
- Set up monitoring and analytics
- Configure backup and disaster recovery

## Current Status

✅ **Firebase SDK installed**  
✅ **API layer updated** for Firebase  
✅ **Mock data fallback** for development  
✅ **Real-time sync** ready when configured  

The app will work with mock data until you configure Firebase, then automatically switch to real-time data!

