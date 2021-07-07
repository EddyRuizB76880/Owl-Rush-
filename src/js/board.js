import SimonSays from './simon_says.js';
import SunManager from './sun_manager.js';
export default class Board{
  constructor(sc_gracetime , scb_initial_value) {
    this.board_info = document.getElementsByClassName('board_cell');
    this.sun_path_module = new SunManager(sc_gracetime , scb_initial_value);
    this.simon_says_module = new SimonSays();
  }

  start_player_turn(new_card , active_player) {
      console.log(`${new_card.value}`);
      if (new_card.value === 'SOL') {
        this.sun_path_module.determine_sun_card_result();
      } else {
      this.append_card(new_card , active_player);
      this.empty_boost();
      console.log(`${new_card.value} es el valor de la nueva carta`);
    }
}
append_card(new_card , active_player){
  const player_hand = document.getElementById('player\'s_hand');
  let hand_card = document.createElement('li');
  new_card.addEventListener('click' , (event)=>{  this.process_player_move
                                                  (new_card, active_player); 
                                                });
  hand_card.appendChild(new_card);
  player_hand.appendChild(hand_card);
}

  move_player(color , active_player) {
    let new_player_position , cell_styles, cell_coordinates;
    new_player_position = active_player.position + 1;
    console.log(`La carta es color ${color} , ${active_player.id}`);
    cell_styles = window.getComputedStyle(this.board_info[new_player_position]);
    console.log(`${cell_styles.getPropertyValue('background-color')}`);
    while(cell_styles.getPropertyValue('background-color').localeCompare(color) != 0)
    {   
      new_player_position += 1;
      console.log(`${this.board_info[new_player_position]},${new_player_position}`);
      console.log(`${cell_styles.getPropertyValue('background-color')} vs ${color}`);  
      cell_styles = window.getComputedStyle(this.board_info[new_player_position]);
        
    }
    cell_coordinates = this.board_info[new_player_position].getBoundingClientRect(); 
    active_player.move_avatar(cell_coordinates.left , cell_coordinates.top , 
                                cell_coordinates.bottom , cell_coordinates.right , 
                                  new_player_position );
  }

  empty_boost() {
    this.sun_path_module.empty_boost();
  }

  process_player_move(chosen_card , active_player) {
    this.sun_path_module.update_sun_counter();
    let chosen_card_color = chosen_card.value;
    chosen_card.remove();
    this.move_player(chosen_card_color , active_player);
    setTimeout(() => {this.begin_simon_says_sequence()}, 2500);
    //this.checkResult(active_player);
  }

 checkResult(active_player) {
  console.log('checking'); 
  if(this.simon_says_module.player_succeeded === false){
    active_player.go_back();
   }else{}
 }

 begin_simon_says_sequence() {
    document.getElementById('main_content_simon_dice').className = 'buttons_simon_says';
    this.simon_says_module.startRound();
  }

}