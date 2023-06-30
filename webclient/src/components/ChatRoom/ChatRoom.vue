<template>
  <div>
    <!-- Chat Container Window -->
    <ChatContainer :username="username" :chatMessages="chatMessages" @send="sendMessage" />

    <!-- User Status Window -->
    <UserStatus :userStatus="userStatus" />
  </div>
</template>

<script>
// Socket io import
import io from 'socket.io-client';

// Component Imports
import ChatContainer from './sub-components/ChatContainer.component.vue';
import UserStatus from './sub-components/UserStatus.component.vue';

export default {
  components: {
    ChatContainer,
    UserStatus
  },
  data() {
    return {
      // The username of the current user
      username: '',

      // Array of chat messages
      chatMessages: [],

      // The Socket.IO instance for server communication
      socket: null,

      // Object storing the status of connected users
      userStatus: {}
    };
  },
  methods: {
    /**
     * Send a message to the server.
     * Creates a new message object with the sender's username and content,
     * and emits the 'message' event through the socket connection.
     * @param message
     */
    sendMessage(message) {
      const newMessage = {
        sender: this.username,
        content: message
      };

      if (this.socket) {
        this.socket.emit('message', newMessage);
      }
    }
  },
  mounted() {
    // Get the username from the route parameters
    this.username = this.$route.params.username || '';
    if (!this.username) {
      // If username is not available, redirect to the home page
      this.$router.push('/');
    }

    // Connect to the server using Socket.IO
    this.socket = io('http://localhost:4000');

    if (this.socket) {
      // Register the user with the server upon connection
      this.socket.emit('register', this.username);

      this.socket.on('connect', () => {
        // Re-register the user upon reconnection
        this.socket.emit('register', this.username);
      });

      // Update the user status when received from the server
      this.socket.on('userStatus', (userStatus) => {
        this.userStatus = userStatus;
      });

      // Request chat history upon successful registration
      this.socket.on('registrationSuccess', () => {
        this.socket.emit('requestChatHistory');
      });

      // Update the chat history when received from the server
      this.socket.on('chatHistory', (chatHistory) => {
        this.chatMessages = chatHistory;
      });

      // Add a new message to the chat history when received from the server
      this.socket.on('message', (message) => {
        this.chatMessages.push(message);
      });
    } else {
      console.error('WebSocket connection failed');
    }
  },
  beforeDestroy() {
    // Disconnect the socket connection before destroying the component
    if (this.socket) {
      this.socket.disconnect();
    }
  }
};
</script>

<style scoped>
</style>
