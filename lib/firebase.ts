import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// Your Firebase configuration
export const firebaseConfig = {
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
export const functions = getFunctions(app);

// Connect to emulators in development
if (__DEV__) {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFunctionsEmulator(functions, 'localhost', 5001);
  } catch (error) {
    // Emulators already connected or not running
    console.log('Firebase emulators not running, using production');
  }
}

export default app;
