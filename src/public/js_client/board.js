import SimonSays from './simon_says.js';
import SunManager from './sun_manager.js';

export default class Board {
  constructor(sc_gracetime, scb_initial_value, simon_gracetime, socket) {
    this.board_info = document.getElementsByClassName('board_cell');
    this.sun_path_module = new SunManager(sc_gracetime, scb_initial_value);
    this.simon_says_module = new SimonSays(simon_gracetime);
    this.client_socket = socket;
    // This DOM element will be used to display the player's cards.
    this.player_hand = document.getElementById('player\'s_hand');
    // This array will be used to store and have direct access to cards. This
    // makes enabling and disabling cards much easier.
    this.cards_array = [];
    this.iaw = false;
    this.total_num_players = 0;
    this.players_arrived_finish = 0;
  }

  set_num_players(num_players) {
    this.total_num_players = num_players;
  }

  start_player_turn(new_card, active_player) {
    console.log(`${new_card.value}`);
    if (new_card.value === 'SOL') {
      this.client_socket.send_message('{"type":"sun"}');
      this.sun_path_module.determine_sun_card_result();
    } else {
      this.append_card(new_card, active_player);
      this.toggle_player_actions();
      this.empty_boost();
      console.log(`${new_card.value} es el valor de la nueva carta`);
    }
  }

  hide_think_fast() {
    const think_fast_bar = document.getElementById('sun_counter_boost');
    const think_fast_txt = document.getElementById('think_fast_text');
    think_fast_bar.classList.add('hidden');
    think_fast_txt.classList.add('hidden');
  }

  show_think_fast() {
    const think_fast_bar = document.getElementById('sun_counter_boost');
    const think_fast_txt = document.getElementById('think_fast_text');
    think_fast_bar.classList.remove('hidden');
    think_fast_txt.classList.remove('hidden');
  }

  hide_simon_says() {
    document.getElementById('main_content_simon_dice').className = 'hidden';
  }

  toggle_player_actions() {
    let index = 0;
    for (index; index < this.cards_array.length; index += 1) {
      this.cards_array[index].disabled = !this.cards_array[index].disabled;
    }
  }

  append_card(new_card, owner_player) {
    this.cards_array.push(new_card);
    const hand_card = document.createElement('li');
    new_card.addEventListener('click', (event) => {
      this.process_player_move(new_card, owner_player);
    });
    hand_card.appendChild(new_card);
    this.player_hand.appendChild(hand_card);
  }

  move_player(color, active_player) {
    console.log(`Number total of players: ${this.total_num_players}`);
    // ToDo: Create getPosition method in player
    let new_player_position = active_player.position + 1;
    try{
      // Get cell's color
      let cell_styles = window.getComputedStyle(this.board_info[new_player_position]);
      while (cell_styles.getPropertyValue('background-color').localeCompare(color) !== 0) {
        new_player_position += 1;
        cell_styles = window.getComputedStyle(this.board_info[new_player_position]);
        console.log(`${cell_styles.getPropertyValue('background-color')} vs ${color}`);
      }
    } catch(error){
      // When a player is close to the end of the game board, it's possible
      // that some cards are useless to them due to lack of some color cells.
      // This try-catch block will make sure that player always makes some advance
      new_player_position = active_player.position + 1;
    }
      // Give player the top and left values of the matching cell so they can move their
      // Avatar
    active_player.move_avatar(this.board_info[new_player_position].offsetLeft,
      this.board_info[new_player_position].offsetTop,
      new_player_position);
  }

  empty_boost() {
    this.sun_path_module.empty_boost();
  }

  process_player_move(chosen_card, active_player) {
    this.sun_path_module.update_sun_counter();
    const chosen_card_color = chosen_card.value;
    chosen_card.remove();
    this.toggle_player_actions();
    this.move_player(chosen_card_color, active_player);
    this.hide_think_fast();
    setTimeout(() => { this.begin_simon_says_sequence(); }, 2500);
    setTimeout(() => {
      this.check_result(active_player, chosen_card_color);
      this.show_think_fast();
      this.hide_simon_says();
    }, this.simon_says_module.simon_time * 1000);
  }

  player_won() {
    const players_result_element = document.getElementById('players_result');
    const game_board_element = document.getElementById('game_board');

    this.players_arrived_finish += 1;
    // TODO: quitarlo de los jugadores
    console.log(`jugadores han llegado a la meta: ${this.players_arrived_finish}`);
    if (this.players_arrived_finish === this.total_num_players) {
      game_board_element.classList.add('hidden');
      players_result_element.classList.remove('hidden');
      // send message to server players_win
    }
  }

  check_result(active_player, chosen_card_color) {
    setTimeout(() => {
      this.simon_says_module.checkPlayerSequence();
    }, this.simon_says_module.simon_time * 1000);
    const turn_result = `{"type":"turn_result","sun_counter":"${this.sun_path_module.sunCounter.style.width}","ss_success":${Number(this.simon_says_module.playerSucceeded)},"color":"${chosen_card_color}"}`;
    this.client_socket.send_message(turn_result);
    console.log(`checking${this.simon_says_module.simon_time}`);
    if (this.simon_says_module.playerSucceeded === false) {
      active_player.go_back();
    } else if (this.simon_says_module.playerSucceeded === false) {
      active_player.go_back();
    } else if (active_player.position === this.board_info.length - 1) {
      this.player_won();
      this.iaw = true;
      this.client_socket.send_message(JSON.stringify({type:'player_reached'}));
    }
    this.simon_says_module.reset();
  }

  begin_simon_says_sequence() {
    document.getElementById('main_content_simon_dice').className = 'buttons_simon_says';
    setTimeout(() => { this.simon_says_module.startRound(); }, 1500);
  }
}
