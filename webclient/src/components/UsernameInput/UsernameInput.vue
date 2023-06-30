<template>
  <div class="username-container">
    <!-- Heading -->
    <h2 class="title">Enter your username</h2>

    <!-- Username Input -->
    <input type="text" v-model="username" class="username-input" />

    <!-- Submit Button -->
    <button @click="submitUsername" class="submit-button">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      router: this.$router
    };
  },
  methods: {
    /**
     * Handle the submission of the username.
     * If the username is not empty, redirect to the chat component.
     */
    submitUsername() {
      // Check if the username is not empty
      if (this.username.trim() !== '') {
        // Redirect to the chat component with the entered username as a parameter
        this.$router.push({
          name: 'chat',
          path: '/chat',
          params: {
            username: this.username
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.username-container {
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
  padding-top: 50px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.username-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;
}

.username-input:focus {
  outline: none;
  border-color: #3498db;
}

.submit-button {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2980b9;
}

.submit-button:active {
  background-color: #1f618d;
}

.submit-button:focus {
  outline: none;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
