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
  wsPlayers.set(socket, `Player${++playerCount}`);
  console.log(`${wsPlayers.get(socket)} connected`);
  socket.on('message', (message) => {
    console.log(`${wsPlayers.get(socket)} sent ${message}`);
    process_message(message , socket);
  });
  socket.on('close', () => {
    console.log(`${wsPlayers.get(socket)} closed the connection`);
    wsPlayers.delete(socket);
  });
});
//ToDo: separate and make sure that game server only receives and sends messages
//, and serves pages.

function broadcast(message) {
  for (const [key, value] of wsPlayers) {
    key.send(message);
  }
}

function get_guests() {
  let guest_list = '{"type":"guest_list","list":[';
  for (const [key, value] of wsPlayers) {
    console.log(value);
    guest_list += `"${value}",`;
  }
  //Find a smarter and more efficient way to discard last comma
  guest_list = guest_list.slice(0 , -1);
  guest_list += ']}';
  return guest_list;
  //ToDo include icon chosen by each of the players
}

function select_starting_player() {
  let list_of_players = JSON.parse(get_guests()).list;
  const random = Math.floor(Math.random() * list_of_players.length);
  let active_player_message = `{"type":"active_id","id":"${list_of_players[random]}"}`;
  console.log(active_player_message);
  broadcast(active_player_message);
}

function process_message(message , socket) {
  const message_from_server = JSON.parse(message);
  switch(message_from_server.type) {
    case 'create_session':
      // create unique session id and send it to host. Save the sender of the 
      // message as the host. Await this socket to send begin
      break;
      
    case 'new_guest':
      // Temporarily, this case will assign an id to the new guest
      console.log(`sending {"type":"my_id","id":"${wsPlayers.get(socket)}"}`);
      const guest_id = `{"type":"my_id","id":"${wsPlayers.get(socket)}"}` ;
      socket.send(guest_id);
      socket.send(get_guests());
      // ToDo: Indicate which icon was chosen by incoming guest
      broadcast( `{"type":"new_guest","id":"${wsPlayers.get(socket)}"}`);
      // ToDo: execute when host starts match
      select_starting_player();
      break;
    case 'turn_result':

      break;
    default:
      //broadcast
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