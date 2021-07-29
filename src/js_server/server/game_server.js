import express from 'express';
//import * as eta from 'eta';
import ws from 'ws';
import router from './router.js';
import Session from './session.js';
//------------------------game_server-------------------------
const app = express();
const port = 8000;
// app.set('x-powered-by', false);
app.disable('x-powered-by');

// Set Eta as view engine
//app.engine('eta', eta.renderFile);

let highest_sesion_id = 0;
const sessions_history = new Map(); // sessionId -> new Session()

// See https://masteringjs.io/tutorials/express/websockets
// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket) => {
  console.log(`New socket connected`);
  socket.on('message', (message) => {
    //console.log(`${wsPlayers.get(socket)} sent ${message}`);
    process_message(message , socket);
  });
});


function create_session(message_from_client , socket) {
  socket.send( JSON.stringify({type:'new_lobby', session_id: highest_sesion_id}));
  const new_session = new Session(highest_sesion_id , message_from_client.id);
  new_session.set_new_guest(message_from_client.id , message_from_client.icon);
  new_session.map_player_with_socket(message_from_client , socket);
  sessions_history.set(highest_sesion_id , new_session);
  highest_sesion_id += 1;
}

function process_message(message , socket) {
  console.log(`${message}`);
  const message_from_client = JSON.parse(message);
  const session = sessions_history.get(parseInt(message_from_client.session_id));
  switch(message_from_client.type) {
    case 'create_session':
      create_session(message_from_client , socket);
      break;
    case 'new_guest':
      console.log(`new guest ${message_from_client.id} asking for session ${message_from_client.session_id}`);
      session.new_guest_protocol(message_from_client , socket);
      break;
    case 'turn_result':
      session.re_roll(message , message_from_client.id);
      break;
    case 'sun':
      session.re_roll(message , message_from_client.id);
      break;
    case 'reconnect':
      session.map_player_with_socket(message_from_client.id , socket);
      session.who_goes_first();
      break;
    case 'IAW':
      session.re_roll(message , message_from_client.id);
      break;
    default:
      session.broadcast(message, message_from_client.id);
      break;
  }
}

app.use(router);
app.set('view engine', 'pug');
const webServer = app.listen(port);
webServer.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
console.log(`board_game listening on ${port}....`);