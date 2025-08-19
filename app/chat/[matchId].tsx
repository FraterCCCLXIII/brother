import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TopBar } from '../../components/TopBar';
import { api } from '../../lib/api';
import { Message } from '../../lib/types';

const { height, width } = Dimensions.get('window');

export default function ChatScreen() {
  const { matchId } = useLocalSearchParams<{ matchId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (matchId) {
      loadMessages();
    }
  }, [matchId]);

  const loadMessages = async () => {
    if (!matchId) return;
    
    try {
      setLoading(true);
      const chatMessages = await api.getMessages(matchId);
      setMessages(chatMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !matchId) return;

    const messageText = inputText.trim();
    setInputText('');

    try {
      const success = await api.sendMessage(matchId, 'me', messageText);
      if (success) {
        // Reload messages to get the updated list
        await loadMessages();
        // Scroll to bottom
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMyMessage = item.senderId === 'me';
    
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
        marginVertical: 4,
        paddingHorizontal: 16,
      }}>
        <View style={{
          backgroundColor: isMyMessage ? '#000000' : '#F8F9FA',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 20,
          maxWidth: width * 0.7,
        }}>
          <Text style={{
            color: isMyMessage ? '#FFFFFF' : '#000000',
            fontSize: 16,
            lineHeight: 20,
          }}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000000', fontSize: 16 }}>Loading chat...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <TopBar title="Chat" />
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

        {/* Input */}
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderTopWidth: 1,
          borderTopColor: '#E9ECEF',
          backgroundColor: '#FFFFFF',
        }}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: '#F8F9FA',
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 12,
              marginRight: 12,
              fontSize: 16,
              color: '#000000',
            }}
            placeholder="Type a message..."
            placeholderTextColor="#6C757D"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={!inputText.trim()}
            style={{
              backgroundColor: inputText.trim() ? '#000000' : '#E9ECEF',
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{
              color: inputText.trim() ? '#FFFFFF' : '#6C757D',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
