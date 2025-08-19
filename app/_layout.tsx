import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack 
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
          presentation: 'modal', // This creates the stacked modal effect
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{
            presentation: 'card', // Force full-screen for splash
          }}
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{
            presentation: 'card', // Force full-screen for main app
          }}
        />
        <Stack.Screen 
          name="auth" 
          options={{
            presentation: 'card', // Force full-screen for auth
          }}
        />
        <Stack.Screen 
          name="chat" 
          options={{
            presentation: 'card', // Force full-screen for chat
          }}
        />
        <Stack.Screen 
          name="report" 
          options={{
            presentation: 'card', // Force full-screen for report
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
