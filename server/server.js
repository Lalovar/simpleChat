const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 8080;

const app = express();

// our server instance
const server = http.createServer(app);

let currentMessage = [];

// This creates our socket using the instance of the server
const io = socketIO(server);
 
// When the connection is open we manage events.
io.on('connection', socket => {
  io.sockets.emit('message', currentMessage);

  // Here we receive the message value and we push it to the currentMessage array.
  socket.on('message', (message) => {
    console.log('message: ', message);
    // We push ithe value to currentMessage array.
    currentMessage.push(message);
    // We send the new data to all connections.
    io.sockets.emit('message', currentMessage);
  });
  
  // Here we clear the currentMessage array.
  socket.on('clearMessages', () => {
    console.log('messages cleared');
    currentMessage = [];
    io.sockets.emit('message', currentMessage);
  });
  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));