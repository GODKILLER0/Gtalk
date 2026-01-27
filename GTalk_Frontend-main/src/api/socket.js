// Socket.io–compatible event names (frontend mock)
export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",

  MESSAGE_SEND: "message:send",
  MESSAGE_RECEIVE: "message:receive",

  TYPING_START: "typing:start",
  TYPING_STOP: "typing:stop",

  USER_PRESENCE_UPDATE: "user:presence",

  VOICE_JOIN: "voice:join",
  VOICE_LEAVE: "voice:leave",
};

// Mock socket client (ready to be swapped with real socket.io-client)
class MockSocket {
  constructor() {
    this.listeners = {};
    this.connected = true;
    console.log("[socket] connected");
  }

  on(event, callback) {
    this.listeners[event] = callback;
  }

  emit(event, payload) {
    console.log("[socket emit]", event, payload);

    // Echo message receive for demo
    if (event === SOCKET_EVENTS.MESSAGE_SEND) {
      setTimeout(() => {
        this.listeners[SOCKET_EVENTS.MESSAGE_RECEIVE]?.(payload);
      }, 300);
    }
  }

  off(event) {
    delete this.listeners[event];
  }

  disconnect() {
    this.connected = false;
    console.log("[socket] disconnected");
  }
}

export const socket = new MockSocket();
