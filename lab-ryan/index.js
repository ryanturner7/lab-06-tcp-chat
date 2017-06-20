'use strict';

const net = require('net');
const server = net.createServer();

let clientPool = [];

server.on('connection', (socket) => {
  socket.write('hello socket, welcome to turnchat!/n');
  socket.nickname = `user_${Math.random()}`;
  console.log(`${socket.nickname} connected!`);

  clientPool = [...clientPool, socket];
  let handleDisconnect = () => {
    console.log(`${socket.nickname} has disconnected`);
    clientPool = clientPool.filter(item => item !== socket);
  }
  socket.on('error', handleDisconnect);
  socket.on('close', handleDisconnect);

  socket.on('data', (buffer) => {
    let data = buffer.toString();
    if (data.startsWith('/nickname')){
      socket.nickname = data.split('/nickname')[1] || socket.nickname;
      let content = buffer.toString();
      let print = (users) => {
        clientPool.forEach((user)
      }
      socket.nickname = socket.nickname.trim();
      socket.write(`you are now known as ${socket.nickname}`);
      return;
      }
    })
  })

  if(data.startsWith('/dm')){
      let content = data.split('/dm')[1] || ''
})
