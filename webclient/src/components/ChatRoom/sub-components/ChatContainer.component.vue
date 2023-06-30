<template>
  <div class="chat-container">
    <!-- Displaying the username -->
    <h2>Welcome, {{ username }}!</h2>
    <!-- Displaying the chat messages -->
    <ChatMessages :messages="chatMessages" />
    <!-- Input field for sending messages -->
    <ChatInput @send="sendMessage" />
  </div>
</template>

<script>
import ChatMessages from './ChatMessages.component.vue';
import ChatInput from './ChatInput.component.vue';

export default {
  components: {
    ChatMessages,
    ChatInput
  },
  props: {
    // The username of the current user
    username: {
      type: String,
      required: true
    },
    // Array of chat messages
    chatMessages: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /**
     * Sends the new message to the parent component.
     * Emits a 'send' event with the message as the payload.
     * The parent component will handle sending the message to the server.
     * @param message
     */
    sendMessage(message) {
      this.$emit('send', message);
    }
  }
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
  color: #333;
}
</style>
