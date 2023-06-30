// Import necessary modules
import http from "http";
import { Server } from "socket.io";
import express from "express";
import path from "path";


// Create express app and http server
const app = express();
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

/**
 * Following code is required for build that is deployed on heroku
 * We're just taking the ui build files and linking that with our server
 */
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './webclient/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './webclient/dist/index.html'));
});

// Serve the frontend application
app.use(express.static('public'));

// Store connected users
const users = {};

// Store user status
const userStatus = {};

// Store chat history
const chatHistory = [];

// Handle new connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle user registration
  socket.on('register', (username) => {
    // Add user to the users and userStatus objects
    users[socket.id] = username;
    userStatus[socket.id] = username;
    console.log(`User ${username} with ID ${socket.id} registered`);

    // Send user registration confirmation to the client
    socket.emit('registrationSuccess', { message: 'You have successfully registered.' });

    // Send the chat history to the newly joined user
    socket.emit('chatHistory', chatHistory);

    // Broadcast the new user's registration to all other connected clients
    socket.broadcast.emit('userJoined', { username });

    // Send the user status to the client
    io.emit('userStatus', userStatus);
  });

  // Handle incoming messages
  socket.on('message', (message) => {
    console.log(`Received message: ${message.content}`);

    // Add timestamp to the message
    message.timestamp = new Date().toLocaleString();

    // Add the message to the chat history
    chatHistory.push(message);

    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const username = users[socket.id];

    // Remove user from users and userStatus objects
    delete users[socket.id];
    delete userStatus[socket.id];
    console.log(`User ${username} with ID ${socket.id} disconnected`);

    // Broadcast the disconnected user's information to all connected clients
    socket.broadcast.emit('userLeft', { username });

    // Send the updated user status to the client
    io.emit('userStatus', userStatus);
  });

  // Request chat history from the server
  socket.emit('requestChatHistory');
});

// Send chat history to the client
io.on('requestChatHistory', (socket) => {
  socket.emit('chatHistory', chatHistory);
});

// Start the server
const port = 4000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
