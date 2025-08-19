import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        {user ? (
          // Authenticated user - show main app
          <>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="chat/[matchId]"
              options={{ 
                title: 'Chat',
                headerBackTitle: 'Back',
                presentation: 'modal'
              }}
            />
            <Stack.Screen
              name="profile/edit"
              options={{ 
                title: 'Edit Profile',
                headerBackTitle: 'Back'
              }}
            />
          </>
        ) : (
          // Unauthenticated user - show auth screens
          <>
            <Stack.Screen
              name="auth/login"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/create-profile"
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack>
    </>
  );
}
