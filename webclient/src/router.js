// Vue Imports
import Vue from 'vue';
import Router from 'vue-router';

// Components Import
import UsernameInput from './components/UsernameInput/UsernameInput.vue';
import ChatRoom from './components/ChatRoom/ChatRoom.vue';

Vue.use(Router);

// Enable Vue to use the Vue Router plugin

// Define the routes for the application
const routes = [
  {
    path: '/',
    name: 'home',
    component: UsernameInput,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatRoom,
    props: route => ({ username: route.query.username })
  }
];

// Create a new Router instance and pass the routes option
export default new Router({
  routes
});
