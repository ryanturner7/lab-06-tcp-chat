'use strict';

const net = require('net');
const user = require('./client.js');
const server = net.createServer();

let clientPool = [];
let currentUser = 1;
server.on('connection', (socket) => {
  socket.write('hello socket, welcome to turnchat!/n');
  console.log('welcome to turnchat');
  socket.nickname = `user_${currentUser()}`;
  currentUser++;

  console.log(`${socket.nickname} connected!`);
  clientPool = [...clientPool, socket];
  socket.write('You\'re connected as ${socket.nickname}\n');
  let handleDisconnect = () => {
    console.log(`${socket.nickname} has disconnected`);
    clientPool = clientPool.filter(item => item !== socket);
  };
  socket.on('error', handleDisconnect);
  socket.on('close', handleDisconnect);

  socket.on('data', (buffer) => {
    let data = buffer.toString();

    if(data.startsWith('/nick')){
      socket.nickname = data.split('/nick')[1] || socket.nickname;
      socket.nickname = socket.nickname.trim();
      client.nickname = socket.nickname;
        user.write(`you are now known as ${socket.nickname}\n`);
        return;
      }
        if(data.startsWith('/dm')){
          let content = data.split('/dm ')[1] || '';
          content = content.trim;
          let userName = content.split(' ')[0].trim();
          client
          socket.nickname = data.split('/nick')[1] || socket.nickname;
          socket.nickname = socket.nickname.trim();
          socket.write(`you are now known as ${socket.nickname}\n`);
        }
      };
      return;
    }

    if(data.startsWith('/dm')){
      let content = data.split('/dm')[1] || '';
      content = content.trim();
      let to = content.split(' ')[0].trim();
      clientPool.forEach((user) => {
        if(to == user.nickname){
          user.socket.write(`${socket.nickname}: ${data.split(to)[1]}\n`);
        }
      });
      return;
    }

    if(data.startsWith('/troll')){
      let content = data.split('/dm')[1] || '';
      content = content.trim();
      let to = content.split(' ')[0].trim();
      clientPool.forEach((user) => {
        if(to == user.nickname){
          user.socket.write(`${socket.nickname}: ${data.split(to)[1]}\n`);
        }
      });
      if(data.startsWith('/quit')){
        let content = data.split('/dm')[1] || '';
        content = content.trim();
        let to = content.split(' ')[0].trim();
        clientPool.forEach((user) => {
          if(to == user.nickname){
            user.socket.write(`${socket.nickname}: ${data.split(to)[1]}\n`);
          }
    clientPool.forEach((user) => {
      user.socket.write(`${socket.nickname}: ${data}`);
    });
  });
});
server.listen(3000, () => {
  console.log('server up on port 3000');
});
