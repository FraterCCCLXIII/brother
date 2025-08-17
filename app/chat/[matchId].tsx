import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TopBar } from '../../components/TopBar';
import { api } from '../../lib/api';
import { Message } from '../../lib/types';

export default function ChatScreen() {
  const { matchId } = useLocalSearchParams<{ matchId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (matchId) {
      loadMessages();
    }
  }, [matchId]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const messageList = await api.listMessages(matchId);
      setMessages(messageList);
    } catch (error) {
      console.error('Error loading messages:', error);
      Alert.alert('Error', 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !matchId) return;

    try {
      const sentMessage = await api.sendMessage(matchId, newMessage.trim());
      setMessages(prev => [...prev, sentMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwnMessage = item.sender === 'current_user';
    
    return (
      <View style={{
        alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
        marginVertical: 4,
        marginHorizontal: 16,
        maxWidth: '80%',
      }}>
        <View style={{
          backgroundColor: isOwnMessage ? '#000000' : '#F8F9FA',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          borderWidth: isOwnMessage ? 0 : 1,
          borderColor: '#E9ECEF',
        }}>
          <Text style={{
            color: isOwnMessage ? '#FFFFFF' : '#000000',
            fontSize: 16,
          }}>
            {item.body}
          </Text>
        </View>
        <Text style={{
          color: '#6C757D',
          fontSize: 12,
          marginTop: 4,
          textAlign: isOwnMessage ? 'right' : 'left',
        }}>
          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <TopBar title="Chat" showBack />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#000000', fontSize: 16 }}>Loading chat...</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TopBar title="Chat" showBack />
      
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={{
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E9ECEF',
        backgroundColor: '#FFFFFF',
      }}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: '#F8F9FA',
            borderWidth: 1,
            borderColor: '#E9ECEF',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginRight: 12,
            fontSize: 16,
            color: '#000000',
          }}
          placeholder="Type a message..."
          placeholderTextColor="#6C757D"
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!newMessage.trim()}
          style={{
            backgroundColor: newMessage.trim() ? '#000000' : '#E9ECEF',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 20,
            justifyContent: 'center',
          }}
        >
          <Text style={{
            color: newMessage.trim() ? '#FFFFFF' : '#6C757D',
            fontSize: 16,
            fontWeight: '600',
          }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
