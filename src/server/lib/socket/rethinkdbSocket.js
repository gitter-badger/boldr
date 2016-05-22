/**
 * boldr/server/lib/socket/rethinkdbSocket.js
 * RethinkDB Websocket connection
 *
 * @exports {Function} rethinkdbSocket - The websocket instance for RethinkDB
 */

const RethinkdbWebsocketServer = require('rethinkdb-websocket-server');

const rethinkdbSocket = (server) => {
  RethinkdbWebsocketServer.listen({
    httpServer: server,
    httpPath: '/db',
    dbHost: process.env.RDB_HOST,
    dbPort: 28015,
    unsafelyAllowAnyQuery: true
  });
};

export default rethinkdbSocket;
