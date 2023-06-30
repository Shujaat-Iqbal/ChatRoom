// Vue & app Imports
import Vue from 'vue';
import App from './App.vue';
import router from './router.js'

// Configure Vue production mode tip
Vue.config.productionTip = false;

// Create a new Vue instance
new Vue({
  // Provide the router instance to the Vue instance
  router,
  // Render the App component as the root component
  render: h => h(App)
}).$mount('#app');
