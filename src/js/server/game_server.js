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
let player_count = 0;
let active_player_position = 0;

const playerSessions = new Map(); // socket -> sessionId
const sessions = new Map(); // sessionId -> new Session()

// See https://masteringjs.io/tutorials/express/websockets
// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket) => {
  wsPlayers.set(socket, `Player${++player_count}`);
  console.log(`${wsPlayers.get(socket)} connected`);
  socket.on('message', (message) => {
    console.log(`${wsPlayers.get(socket)} sent ${message}`);
    process_message(message , socket , wsPlayers.get(socket));
  });
  socket.on('close', () => {
    console.log(`${wsPlayers.get(socket)} closed the connection`);
    wsPlayers.delete(socket);
  });
});
//ToDo: separate and make sure that game server only receives and sends messages
//, and serves pages.

function broadcast(message, origin_id) {
  for (const [key, value] of wsPlayers) {
    if(value !== origin_id){
      key.send(message);
    }
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

function select_active_player(active_position) {
  let list_of_players = JSON.parse(get_guests()).list;
  active_player_position = active_position;
  let active_player_message = `{"type":"active_id","id":"${list_of_players[active_position]}"}`;
  console.log(active_player_message);
  broadcast(active_player_message, '');
}

function re_roll(message , sender_id) {
  broadcast(message , sender_id);
  //Todo: Separate these 2 lines in a separate method.
  active_player_position = (active_player_position + 1) % wsPlayers.size;
  select_active_player(active_player_position);
}

//ToDo: Follow teacher's advice on switch.
function process_message(message , socket , sender_id) {
  const message_from_client = JSON.parse(message);
  switch(message_from_client.type) {
    case 'create_session':
      // create unique session id and send it to host. Save the sender of the 
      // message as the host. Await this socket to send begin
      break;
      
    case 'new_guest':
      // Temporarily, this case will assign an id to the new guest
      console.log(`sending {"type":"my_id","id":"${sender_id}"}`);
      const guest_id = `{"type":"my_id","id":"${sender_id}"}` ;
      socket.send(guest_id);
      socket.send(get_guests());
      // ToDo: Indicate which icon was chosen by incoming guest
      broadcast( `{"type":"new_guest","guest_id":"${sender_id}"}` , sender_id);
      // ToDo: execute this line only when host starts match
      select_active_player(Math.floor(Math.random() * wsPlayers.size));
      break;
    case 'turn_result':
      re_roll(message , sender_id);
      break;
    case 'sun':
      re_roll(message , sender_id);
      break;
    case 'IAW':
      // ToDo: Avoid broadcasting this
      re_roll(message , sender_id);  
    default:
      broadcast(message, sender_id);
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