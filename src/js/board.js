import SimonSays from './simon_says.js';
import SunManager from './sun_manager.js';

export default class Board {
  constructor(sc_gracetime, scb_initial_value) {
    this.board_info = document.getElementsByClassName('board_cell');
    this.sun_path_module = new SunManager(sc_gracetime, scb_initial_value);
    this.simon_says_module = new SimonSays();
  }

  start_player_turn(new_card, active_player) {
    console.log(`${new_card.value}`);
    if (new_card.value === 'SOL') {
      this.sun_path_module.determine_sun_card_result();
    } else {
      this.append_card(new_card, active_player);
      this.empty_boost();
      console.log(`${new_card.value} es el valor de la nueva carta`);
    }
  }

  append_card(new_card, active_player) {
    const player_hand = document.getElementById('player\'s_hand');
    const hand_card = document.createElement('li');
    new_card.addEventListener('click', (event) => {
      this.process_player_move(new_card, active_player);
    });
    hand_card.appendChild(new_card);
    player_hand.appendChild(hand_card);
  }

  move_player(color, active_player) {
    // ToDo: Create getPosition method in player
    let new_player_position = active_player.position + 1;
    // Get cell's color
    let cell_styles = window.getComputedStyle(this.board_info[new_player_position]);

    // Check cells until the first matching color is found
    console.log(`${cell_styles.getPropertyValue('background-color')} vs ${color}`);
    while (cell_styles.getPropertyValue('background-color').localeCompare(color) != 0) {
      new_player_position += 1;
      cell_styles = window.getComputedStyle(this.board_info[new_player_position]);
      console.log(`${cell_styles.getPropertyValue('background-color')} vs ${color}`);
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
    this.move_player(chosen_card_color, active_player);
    setTimeout(() => { this.begin_simon_says_sequence(); }, 2500);
    setTimeout(() => { this.checkResult(active_player); }, this.simon_says_module.simonTime * 1000 * 1.5);
  }

  checkResult(active_player) {
    console.log('checking');
    console.log(this.simon_says_module.playerSucceeded);
    if (this.simon_says_module.playerSucceeded === false) {
      active_player.go_back();
    } else {}
  }

  begin_simon_says_sequence() {
    document.getElementById('main_content_simon_dice').className = 'buttons_simon_says';
    setTimeout(() => { this.simon_says_module.startRound(); }, 1500);
  }
}
