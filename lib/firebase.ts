import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUA08C6ajnUQN3Rn0jUirydnP4X5IeApQ",
  authDomain: "your-brother-app.firebaseapp.com",
  projectId: "your-brother-app",
  storageBucket: "your-brother-app.firebasestorage.app",
  messagingSenderId: "547371197025",
  appId: "1:547371197025:web:875aa0a8700be6974cc020",
  measurementId: "G-P1N6W22M4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
