# Chat Application

This is a simple chat application built with Vue.js and Socket.IO.

## Server

The server is implemented in the `server.js` file. It uses Node.js and Express to serve the static files and handle Socket.IO connections. The server listens on port 4000 by default.

The main functionalities of the server include:

- Registering new users and maintaining user status.
- Broadcasting chat messages to connected clients.
- Storing and serving chat history to new clients.

## Frontend Vue Structure

The frontend structure follows the Vue.js single-file component pattern. Here's an overview of the components used in the application:

- **App.vue**: The root component that holds the main layout of the application and handles routing.

- **UserInput.vue**: Renders a form where users can enter their username. It redirects to the chat component upon submission.

- **ChatRoom.vue**: The main chat component that displays the chat container and user status. It handles Socket.IO integration for sending and receiving messages.

- **ChatContainer.vue**: Renders the chat messages and provides an input field for sending new messages.

- **UserStatus.vue**: Displays the list of active users in the chat room.

## Routing

The application uses Vue Router for client-side routing. Here are the routes defined:

- `/`: The default route that renders the `UserInput` component for entering the username.

- `/chat`: Renders the `ChatRoom` component where the actual chat takes place. Users must have a valid username to access this route.

## Socket.IO Integration

Socket.IO is used for real-time communication between the server and clients. It enables instant message delivery and user status updates. Here's an overview of Socket.IO integration:

- When a user enters a valid username, the client establishes a WebSocket connection with the server using Socket.IO.

- The server registers the user and broadcasts the updated user status to all connected clients.

- Upon successful registration, the client requests the chat history from the server.

- The server sends the chat history to the client, which updates the chat messages in real-time.

- When a user sends a new message, the client emits a `message` event to the server, which broadcasts the message to all connected clients.

## Setup Guidelines

For setting up the repository please check SETUP.md.
