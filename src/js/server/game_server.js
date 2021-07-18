import express from 'express';
//import * as eta from 'eta';
import ws from 'ws';
import router from './router.js';
//------------------------game_server-------------------------
const app = express();
const port = 3000;
// app.set('x-powered-by', false);
app.disable('x-powered-by');

// Set Eta as view engine
//app.engine('eta', eta.renderFile);


const wsPlayers = new Map(); // socket -> new Player()
let playerCount = 0;

const playerSessions = new Map(); // socket -> sessionId
const sessions = new Map(); // sessionId -> new Session()

// See https://masteringjs.io/tutorials/express/websockets
// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket) => {
  wsPlayers.set(socket, `Player ${++playerCount}`);
  console.log(`${wsPlayers.get(socket)} connected`);
  socket.on('message', (message) => {
    console.log(`${wsPlayers.get(socket)} sent ${message}`);
  });
  socket.on('close', () => {
    console.log(`${wsPlayers.get(socket)} closed the connection`);
    wsPlayers.delete(socket);
  });
});

app.use(router);
app.set('view engine', 'pug');
const webServer = app.listen(port);
webServer.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
console.log(`board_game listening on ${port}....`);