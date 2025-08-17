import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // For MVP, we'll start with the auth flow
    // In a real app, this would check for existing authentication
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#FFFFFF', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ 
          color: '#000000', 
          fontSize: 36, 
          fontWeight: 'bold', 
          marginBottom: 16 
        }}>
          Brother
        </Text>
        <Text style={{ 
          color: '#6C757D', 
          fontSize: 18, 
          marginBottom: 32 
        }}>
          Making male friendships
        </Text>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    </View>
  );
}
