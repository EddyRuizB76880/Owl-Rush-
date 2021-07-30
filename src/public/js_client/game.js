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
    this.player_icons = [];
    this.active_player = 0;
    this.setup_game();
  }
//
  setup_game() {


    const ip = window.location.host;

    const reconnection_message = JSON.stringify({type: 'reconnect' , 
    session_id: window.sessionStorage.getItem('session_id'), 
    id: window.sessionStorage.getItem('jugadorId')
  });
    this.client_socket = new ClientSocket(ip , reconnection_message);
    this.client_socket.addEventListener('message', (event) => {
      this.process_message(event.data);
    });
    this.my_id = window.sessionStorage.getItem('jugadorId');;
    const sun_counter_grace = window.sessionStorage.getItem('sun_counter_gracetime');
    const sun_counter_boost = window.sessionStorage.getItem('sun_counter_slider');
    const simon_gracetime = window.sessionStorage.getItem('simon_says_gracetime');
    const starting_cards_amount = 2;
    this.deck_button = document.getElementById('cardsGetStack');
    this.deck_button.disabled = true;
    this.deck_button.addEventListener('click', (event) => { this.start_player_turn(); });
    this.player_1 = new Player(this.my_id ,  
                                window.sessionStorage.getItem('selectionofAvatars'));
    this.game_board = new Board(parseInt(sun_counter_grace),
                                parseInt(sun_counter_boost),
                                parseInt(simon_gracetime),
                                this.client_socket);
    this.deck = new Deck();
    this.alert_manager = new AlertManager();
    this.player_list.push(this.player_1);//
    this.player_ids.push(this.my_id);
    this.retrieve_players();
    this.active_player = -1;
    this.generate_starting_cards(starting_cards_amount);
    // deck_button.classList.add('focused_element');
    this.alert_manager.alert_player('Cuando estés listo, presiona la baraja de cartas. Si necesitas hacer algún ajuste, puedes regresar al menu principal antes de empezar la partida'
      , 'ff', ['Entendido', '4']); // To add more buttons, just add more tuples after ff

      let newPlayer = document.getElementById('Jugadores');
      newPlayer.innerHTML= "";
      newPlayer.innerHTML="<h1 >Jugadores</h1>";

      let indexP = 1;
      
      for(indexP ; indexP < this.player_list.length ; indexP++ ) {
          let pos=indexP+1;
          newPlayer.innerHTML= newPlayer.innerHTML+"<div  class=\"image-txt-container\"><img  src=\""+ this.player_list[indexP].avatar.src +"\" alt=\"Ficha de Jugador\" height=\"25\" /><p style=\"color: rgb(63, 230, 13)\">"+  this.player_list[indexP].id+ "</p> </div>"; 
      }

  }
// Aqui metodo para generar lista de participantes
  retrieve_players () {
  
  const guest_info = JSON.parse(window.sessionStorage.getItem('guests_info'));
  if(guest_info !== null){  
    let index = 0;
      for (index ; index < guest_info.guests.length ; index ++) {
        console.log(`${guest_info.guests[index]} , and ${guest_info.icons[index]}`);
        const player = new Player(guest_info.guests[index] , guest_info.icons[index]);
        this.player_list.push(player);
        this.player_ids.push(guest_info.guests[index]);
      }
    }
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
          if(this.game_board.iaw === false){
            this.deck_button.disabled = false;
          }else {
            this.client_socket.send_message(JSON.stringify({type:"IAW",session_id: window.sessionStorage.getItem('session_id')}));
          }
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

      case 'player_reached':
        this.game_board.players_win();
   
    }
  }

}
