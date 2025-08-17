import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { TopBar } from '../../components/TopBar';
import { api } from '../../lib/api';
import { Message, Match } from '../../lib/types';
import { mockProfiles } from '../../lib/mock';

export default function ChatScreen() {
  const { matchId } = useLocalSearchParams<{ matchId: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState<Match | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (matchId) {
      loadChatData();
    }
  }, [matchId]);

  const loadChatData = async () => {
    try {
      setLoading(true);
      
      // Load match details
      const allMatches = await api.listMatches();
      const currentMatch = allMatches.find(m => m.id === matchId);
      if (!currentMatch) {
        Alert.alert('Error', 'Match not found');
        router.back();
        return;
      }
      setMatch(currentMatch);
      
      // Load messages
      const chatMessages = await api.listMessages(matchId);
      const formattedMessages = chatMessages.map((msg): IMessage => ({
        _id: msg.id,
        text: msg.body,
        createdAt: new Date(msg.createdAt),
        user: {
          _id: msg.sender,
          name: msg.sender === 'current_user' ? 'You' : 'Match',
        },
      }));
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading chat data:', error);
      Alert.alert('Error', 'Failed to load chat');
    } finally {
      setLoading(false);
    }
  };

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    if (!matchId) return;
    
    try {
      const messageText = newMessages[0]?.text;
      if (!messageText) return;
      
      // Send message via API
      const sentMessage = await api.sendMessage(matchId, messageText);
      
      // Add to local state
      const formattedMessage: IMessage = {
        _id: sentMessage.id,
        text: sentMessage.body,
        createdAt: new Date(sentMessage.createdAt),
        user: {
          _id: sentMessage.sender,
          name: 'You',
        },
      };
      
      setMessages(previousMessages => 
        GiftedChat.append(previousMessages, [formattedMessage])
      );
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    }
  }, [matchId]);

  const getOtherProfile = () => {
    if (!match) return null;
    const otherProfileId = match.a === 'current_user' ? match.b : match.a;
    return mockProfiles.find(p => p.id === otherProfileId);
  };

  const otherProfile = getOtherProfile();

  if (loading) {
    return (
      <View className="flex-1 bg-bg">
        <TopBar title="Chat" showBack />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text text-lg">Loading chat...</Text>
        </View>
      </View>
    );
  }

  if (!match || !otherProfile) {
    return (
      <View className="flex-1 bg-bg">
        <TopBar title="Chat" showBack />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text text-lg">Chat not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-bg">
      <TopBar 
        title={otherProfile.name} 
        showBack 
      />
      
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 'current_user',
          name: 'You',
        }}
        placeholder="Type a message..."
        textInputStyle={{
          backgroundColor: '#111216',
          color: '#F2F2F7',
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
        renderAvatar={() => null}
        alwaysShowSend
        scrollToBottom
        infiniteScroll
        keyboardShouldPersistTaps="handled"
        renderUsernameOnMessage
        showUserAvatar
        showAvatarForEveryMessage={false}
        renderAvatarOnTop
        renderBubble={(props) => (
          <View
            style={{
              backgroundColor: props.position === 'left' ? '#374151' : '#4ADE80',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              maxWidth: '80%',
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: props.position === 'left' ? '#F2F2F7' : '#000000',
                fontSize: 16,
              }}
            >
              {props.currentMessage?.text}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
