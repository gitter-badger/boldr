import IO from 'koa-socket';
import logger from '../logger';

const io = new IO();
const NOOP = () => { };

let socketsConnected = 0;

function onDisconnect(socket) {
  socketsConnected--;
  logger.info(`[${socket.id}] has disconnected`)
    .verbose(`There are [${socketsConnected}] sockets remaining`);
}

function onConnect(socket) {
  // TODO Authenticate sockets
  socketsConnected++;
  logger.info(`[${socket.id}] Connected`)
    .verbose(`There are [${socketsConnected}] sockets connected`);

  socket.on('disconnect', () => onDisconnect(socket));
}

export function emit(event, data, callback = NOOP) {
  logger.verbose(`Emitting ${event}`).silly('Data:', data);
  io.sockets.emit(event, data);
}

export function register(server) {
  logger.info('Initializing Socket.IO');

  io.listen(server);
  io.on('connection', onConnect);

  // Add other socket files here
}

export default { register, io, emit };
