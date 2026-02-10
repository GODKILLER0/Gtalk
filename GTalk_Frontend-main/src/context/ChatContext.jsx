// src/context/ChatContext.jsx
import React, { createContext, useState } from "react";
import { messageApi } from "../api/message.api";

export const ChatContext = createContext(null);

const initialState = {
  serverId: null,
  channel: null,
  messagesByChannel: {}, // Store messages per channel
  typingUsers: [],
  loadingMessages: {}, // Loading state per channel
};

export function ChatProvider({ children }) {
  const [state, setState] = useState(initialState);

  const setActiveServer = (serverId) => {
    setState((prev) => ({
      ...prev,
      serverId,
      channel: null,
    }));
  };

  const setActiveChannel = (channel) => {
    setState((prev) => ({
      ...prev,
      channel,
    }));
  };

  const addMessage = async (channelId, content, senderUserId, username) => {
    try {
      const payload = { content };
      const sentMessage = await messageApi.sendMessage(channelId, payload);

      setState((prev) => {
        const message = {
          id: sentMessage.id,
          user: sentMessage.senderUserName,
          content: sentMessage.content,
          timestamp: Date.now(),
          flagged: false,
        };
        const updatedMessagesByChannel = {
          ...prev.messagesByChannel,
          [channelId]: [...(prev.messagesByChannel[channelId] || []), message],
        };

        return {
          ...prev,
          messagesByChannel: updatedMessagesByChannel,
        };
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const getMessagesForChannel = (channelId) => {
    return state.messagesByChannel[channelId] || [];
  };

  const setTyping = (users) => {
    setState((prev) => ({
      ...prev,
      typingUsers: users,
    }));
  };

  const isLoadingMessages = (channelId) => {
    return state.loadingMessages[channelId] || false;
  };

  const fetchMessagesForChannel = async (channelId) => {
    // Check if messages are already loaded or currently loading
    if (state.messagesByChannel[channelId] || state.loadingMessages[channelId]) {
      return; // Skip if already loaded or loading
    }

    setState((prev) => ({
      ...prev,
      loadingMessages: {
        ...prev.loadingMessages,
        [channelId]: true,
      },
    }));

    try {
      const messages = await messageApi.fetchMessages(channelId);
      const mappedMessages = messages.map(msg => ({
        id: msg.id,
        user: msg.senderUserName || 'Unknown', // Assuming backend provides senderUserName
        content: msg.content,
        timestamp: new Date(msg.createdAt).getTime(),
        formattedTime: msg.formattedTime,
        flagged: false,
      })).reverse(); // Reverse to show oldest first
      setState((prev) => ({
        ...prev,
        messagesByChannel: {
          ...prev.messagesByChannel,
          [channelId]: mappedMessages,
        },
        loadingMessages: {
          ...prev.loadingMessages,
          [channelId]: false,
        },
      }));
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setState((prev) => ({
        ...prev,
        loadingMessages: {
          ...prev.loadingMessages,
          [channelId]: false,
        },
      }));
    }
  };

  return (
    <ChatContext.Provider
      value={{
        ...state,
        setActiveServer,
        setActiveChannel,
        addMessage,
        getMessagesForChannel,
        fetchMessagesForChannel,
        setTyping,
        isLoadingMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
