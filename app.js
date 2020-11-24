const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('public'));

let player1X = 0;
let player2X = 0;

// server code goes here!
// first listen for connection using io.on
io.on('connect', socket => {
  // socket reprsents connection w/ specific client
  // socket.id is unique identifier for connected client
  // everytime client connects log it out

  socket.emit('emojiMove', {className: 'player1', x: player1X});
  socket.emit('emojiMove', {className: 'player2', x: player2X});

  console.log(socket.id, 'has just connected');
  socket.on('emojiMove', data => {
    console.log('server received', data);
    if (data.className === 'player1') {
      player1X += 5;
      socket.emit('emojiMove', {className: data.className, x: player1X});
      socket.broadcast.emit('emojiMove', {className: data.className, x: player1X});
    } else {
      player2X += 5;
      socket.emit('emojiMove', {className: data.className, x: player2X});
      socket.broadcast.emit('emojiMove', {className: data.className, x: player2X});
    }
  });
});

// then... within callback, use socket.on, socket.emit, socket.broadcast, etc.
// NOTE THAT WE ARE LISTENING WITH server, NOT app!

// listen for requests :)
server.listen(3000);

