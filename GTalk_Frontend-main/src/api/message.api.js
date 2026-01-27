// src/api/message.api.js
import httpClient from "./httpClient";

const dummyMessages = {
  t1: [
    {
      id: "m1",
      user: "alice",
      content: "Welcome to #general 👋",
      timestamp: Date.now() - 120000,
      flagged: false,
    },
    {
      id: "m2",
      user: "bob",
      content: "Gtalk UI looks clean!",
      timestamp: Date.now() - 60000,
      flagged: false,
    },
  ],
};

export const messageApi = {
  fetchMessages: async (channelId) => {
    const response = await httpClient.get(`/api/channels/${channelId}/messages`);
    return response || [];
  },

  sendMessage: async (channelId, payload) => {
    const response = await httpClient.post(`/api/channels/${channelId}/messages`, payload);
    return response;
  },

  deleteMessage: async (messageId) => {
    await httpClient.delete(`/api/messages/${messageId}`);
    return { success: true };
  },
};
