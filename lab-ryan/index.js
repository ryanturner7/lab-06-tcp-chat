'use strict';

const net = require('net');
const server = net.createServer();

let clientPool = [];
let client = function(socket, nickname){
  this.nickname = nickname;
  this.socket = socket;
};
server.on('connection', (socket) => {
  socket.write('hello socket, welcome to turnchat!/n');
  socket.nickname = client.nickname;
  console.log('welcome to turnchat');
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
      socket.write(`you are now known as ${socket.nickname}\n`);
      return;
    }
    if(data.startsWith('/dm')){
      let content = data.split('/dm ')[1] || '';
      content = content.trim;
      let userName = content.split(' ')[0].trim();
      clientPool.forEach((user) => {
        if(userName === user.nickname){
          user.socket.write(`${socket.nickname}: ${data.split(userName)[1]}\n`);
        }
      });
      return;
    }

    if(data.startsWith('/troll')){
      let amount = data.split('/troll ')[1].slice(0,1);
      let content = data.split(' ').slice(2).join(' ');
      for (var i = 0; i < amount; i++){
        clientPool.forEach((user) => {
          user.socket.write(`${socket.nickname}: ${content}\n`);
        });
      }
      return;
    }

    if(data.startsWith('/quit')){
      clientPool.forEach((user) => {
        user.socket.write(`\n${socket.nickname} has quit!\n`);
      });
      client.socket.end();
      return;
    }
    clientPool.forEach((user) => {
      user.socket.write(`${socket.nickname}: ${data}`);
    });
  });
});
server.listen(3000, () => {
  console.log('server up on port 3000');
});
