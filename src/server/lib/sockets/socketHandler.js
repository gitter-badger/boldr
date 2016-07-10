function onConnect(socket) {
    // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    console.info(`[${socket.address}] ${JSON.stringify(data, null, 2)}`);
  });
  require('../../api/user/user.socket').register(socket);
    // Insert sockets below
}

export default (io) => {
  const connections = [];

  io.sockets.on('connection', (socket) => {
    socket.address = socket.handshake.address !== null
            ? `${socket.handshake.address.address}:${socket.handshake.address.port}`
            : 'boldr.io';
    socket.connectedAt = new Date();
    connections.push(socket);
    io.emit('userCount', connections.length);
    console.log('NEW CONNECTION', ' USERS ONLINE: ', connections.length);
    socket.emit('news', { msg: 'Hello World! from server' });
    console.log('a user connected');
    socket.on('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1);
      io.emit('userCount', connections.length);
      console.log('CONNECTION LOST');
    });

    onConnect(socket);
  });
};
