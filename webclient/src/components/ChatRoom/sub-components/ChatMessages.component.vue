<template>
  <div class="chat-messages" ref="chatMessages">
    <!-- Iterate over each message in the messages array -->
    <div v-for="message in messages" :key="message.id" class="message" :class="{ 'new-message': message.new }">
      <!-- Display the message header with sender and timestamp -->
      <div class="message-header">
        <strong class="sender">{{ message.sender }}</strong>
        <span class="timestamp">{{ message.timestamp }}</span>
      </div>
      
      <!-- Display the message content -->
      <div class="message-content">{{ message.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Array of chat messages
    messages: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    // Scroll to the bottom when the component is mounted
    this.scrollToBottom();
  },
  methods: {
    /**
     * Scrolls to the bottom of the chat messages container.
     */
    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    }
  },
  watch: {
    /**
     * Scrolls to the bottom when new messages are added.
     */
    messages() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    }
  }
};
</script>

<style scoped>
.chat-messages {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 6px;
  animation: fade-in 0.5s ease;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.new-message {
  animation: none;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.sender {
  font-weight: bold;
  color: #333;
}

.timestamp {
  color: #888;
  font-size: 0.8em;
}

.message-content {
  color: #333;
}
</style>
