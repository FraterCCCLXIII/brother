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
    <View className="flex-1 bg-bg items-center justify-center">
      <View className="items-center">
        <Text className="text-accent text-4xl font-bold mb-4">Brother</Text>
        <Text className="text-text text-lg mb-8">Making male friendships</Text>
        <ActivityIndicator size="large" color="#4ADE80" />
      </View>
    </View>
  );
}
