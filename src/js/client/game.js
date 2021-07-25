import Board from './board.js';
import Deck from './deck.js';
import Player from './player.js';
import AlertManager from './alert_manager.js';
import ClientSocket from './client_socket.js'

export default class Game {
  constructor() {//
    this.player_list = [];
    //this array will be used to retrieve a given player's index position on player_list using their id
    this.player_ids = [];
    this.active_player = 0;
    const port = 3000;
    this.client_socket = new ClientSocket('localhost' , port);
    this.client_socket.addEventListener('message', (event) => {
      this.process_message(event.data);
    });
  }
//
  setup_game(id) {
    this.my_id = id;
    const sun_counter_grace = 5;
    const sun_counter_boost = 100;
    const simon_gracetime = 12;
    const starting_cards_amount = 2;
    this.deck_button = document.getElementById('cardsGetStack');
    this.deck_button.disabled = true;
    this.deck_button.addEventListener('click', (event) => { this.start_player_turn(); });
    this.player_1 = new Player(this.my_id);
    this.game_board = new Board(sun_counter_grace,
                                sun_counter_boost,
                                simon_gracetime,
                                this.client_socket);
    this.deck = new Deck();
    this.alert_manager = new AlertManager();
    this.player_list.push(this.player_1);//
    this.player_ids.push(this.my_id);
    this.active_player = -1;
    this.generate_starting_cards(starting_cards_amount);
    // deck_button.classList.add('focused_element');
    this.alert_manager.alert_player('Cuando estés listo, presiona la baraja de cartas. Si necesitas hacer algún ajuste, puedes regresar al menu principal antes de empezar la partida'
      , 'ff', ['Entendido', '4']); // To add more buttons, just add more tuples after ff

  }

  generate_starting_cards(limit) {
    let index = 1;
    for (index; index <= limit; index++) {
      this.game_board.append_card(this.deck.deal_card(false),
        this.player_list[0]); //pos 0 will always belong to player, not guest
    }

  }

  start_player_turn() {
    this.game_board.set_num_players(this.player_list.length);
    this.deck_button.disabled = true;
    this.game_board.start_player_turn(this.deck.deal_card(true),
      this.player_list[0]
    );
  }

  process_message(message) {
    console.log(`message from server ${message}`);
    const message_from_server = JSON.parse(message);
    switch(message_from_server.type) {
      case 'player_left':
        // remove player's icon and name from list and board
        break;
      case 'host_ended' :
        // get redirected to main page
        break;
      case 'gameover' :
        // trigger endgame result from message.result
        break;
      case 'host_restarted' :
        // get redirected to lobby
        break;
      case 'sun' :
        this.game_board.sun_path_module.determine_sun_card_result();
        break;
      case 'active_id' :
        this.active_player = this.player_list[this.player_ids.indexOf(message_from_server.id)];
        console.log(`id from server ${message_from_server.id}`);
        console.log(`pos ${this.player_ids.indexOf(message_from_server.id)}`);
        console.log(`list ${this.player_ids}`);
        if(message_from_server.id === this.my_id) {
          this.deck_button.disabled = false;
        }else {
          this.deck_button.disabled = true;
        }
        break;
      case 'turn_result' :
        this.game_board.sun_path_module.set_new_sun_counter_value(message_from_server.sun_counter);
        if(message_from_server.ss_success === 1) {
          this.game_board.move_player(message_from_server.color , this.active_player);
        }
        break;
      case 'begin' :
        // this actually must be the first case to happen.
        // Use message's sc_grace, ss_grace, and ssb_value
        // attributes to set the game up
        break;
      case 'my_id':
        // This case is to be removed when lobby's ws and persistent data works on the server
        console.log(`setting up ${message_from_server.id}`);
        this.setup_game(message_from_server.id);
        break;
      case 'new_guest':
        // This case is to be removed when lobby's ws and persistent data works on the server
          let new_player = new Player(message_from_server.guest_id);
          this.player_list.push(new_player);
          this.player_ids.push(message_from_server.guest_id);
        break;
      case 'guest_list':
        // This case is to be removed when lobby's ws and persistent data works on the server

        if(message_from_server.list.length > 0) {
          let index = 0;

          for(index ; index < message_from_server.list.length ; index++ ) {
            if(message_from_server.list[index] !== this.my_id){

              let guest = new Player (message_from_server.list[index]);
              console.log(`Guest from guestlist${guest.id}`);
              console.log(`from list ${message_from_server.list[index]}`);
              //line of code to retrieve guest's icon from message.icons[index]
              this.player_list.push(guest);
              this.player_ids.push(message_from_server.list[index]);}

          }
        }
        break;
    }
  }

}
