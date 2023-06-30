<template>
  <!-- Input field for typing messages -->
  <input type="text" v-model="newMessage" @keyup.enter="sendMessage" class="message-input" placeholder="Type your message..." />
</template>

<script>
export default {
  data() {
    return {
      // Holds the value of the new message
      newMessage: ''
    };
  },
  methods: {
    /**
     * Sends the new message to the parent component.
     * Emits a 'send' event with the new message as the payload.
     * Clears the input field after sending the message.
     */
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.$emit('send', this.newMessage);
        this.newMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.message-input {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
</style>
