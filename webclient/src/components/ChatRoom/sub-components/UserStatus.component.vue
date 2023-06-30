<template>
  <div class="user-status">
    <!-- Iterate over each user in the userStatus object -->
    <div v-for="(user, userId) in userStatus" :key="userId" class="status">
      <!-- Display a dot representing the user status -->
      <span class="dot"></span>
      
      <!-- Display the username -->
      <span class="user-name">{{ user }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Object storing the status of connected users
    userStatus: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped>
.user-status {
  margin-top: 20px;
}

.status {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #4caf50;
  border-radius: 50%;
  margin-right: 5px;
}

.user-name {
  color: #333;
  font-weight: bold;
}
</style>
