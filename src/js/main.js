class Player {
    constructor(id) {
      this.id = id;
      this.avatar = document.getElementById(id);
      this.position = 0;
    }
  
    static start_move(chosen_card_value) {
      Board.move_player(chosen_card_value, this.id);
    }
  
    move_avatar(next_position_x, next_position_y, new_postion ) {
      this.avatar.style.top = `${next_position_y}px`;
      this.avatar.style.left = `${next_position_x}px`;
      this.position = new_postion;
    }
  }
 class Deck {
  
    constructor() {
    }
  
    deal_card() {
      const player_hand = document.getElementById('player\'s_hand');
      let hand_card , new_card , color , colors_array ,rand_number;
  
      // hand_card represents the list element that will allow the new card to be
      // displayed on player´s hand
      hand_card = document.createElement('li');
      new_card = document.createElement('button');
      color = document.createElement('span');
      //ToDo: Make colors_array be an attribute of Deck
      colors_array = ['rgb(0, 0, 255)' , 'rgb(0, 255, 0)' , 'rgb(255, 0, 0)' , 'rgb(255, 255, 0)'];

      rand_number = Math.floor(Math.random() * colors_array.length);
  
      new_card.className = 'buttonCardsSelection';
      color.className = 'color_circle';
  
      new_card.value = colors_array[rand_number];
      color.style.backgroundColor = colors_array[rand_number];
  
      new_card.appendChild(color);
      hand_card.appendChild(new_card);
      player_hand.appendChild(hand_card);
    
      return hand_card;
    }
  
  }
   class Board{
    constructor(sc_gracetime , scb_initial_value) {
      this.board_info = document.getElementsByClassName('board_cell');
      this.sun_counter_bar = document.getElementById('SunCounterProgressBar');
      this.sun_counter_boost = document.getElementById('sun_counter_boost');
      this.sun_counter_boost.value = `${scb_initial_value}`;
      this.sun_counter_boost_gracetime = sc_gracetime;
      this.sun_counter_boost_initial_value = scb_initial_value;
      this.deck = new Deck();
      this.time_out;
      let deck_button = document.getElementById('cardsGetStack');
      deck_button.addEventListener('click', (event)=>{   this.start_player_turn(); });
    }

    start_player_turn() {
        let new_card = this.deck.deal_card();
        //if new card = sun {recupere la barritla y le suba}
        this.empty_boost();
        new_card.addEventListener('click' , (event)=>{  this.process_player_result(); });
    }

    /*
     cell_coordinates = board_cells[board_info_index].getBoundingClientRect();
     cell_styles = window.getComputedStyle(board_cells[board_info_index]);
     this.board_info[board_info_index] = `${cell_styles.getPropertyValue('background-color')};${cell_coordinates.x};${cell_coordinates.y}`;   
    */ 
    move_player(color , player_position) {
      let new_player_position , cell_styles, cell_coordinates;
      new_player_position = player_position;
      console.log(`La carta es color ${color}, ${player_id}`);
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
      return cell_coordinates;
    }
  
    empty_boost() {
      let progress_value = parseInt(this.sun_counter_boost.value,10)
      this.timeout= setInterval(() => { 
                                        progress_value -= 5; //ToDo: Implement progress_value -= value/gracetime 
                                        this.sun_counter_boost.value = `${progress_value}`;
                                      }, 1000);
  
    }
  
    process_player_result() {
      clearInterval(this.timeout);
      let sun_counter_progress = parseInt(this.sun_counter_bar.value,10);
      sun_counter_progress += parseInt(this.sun_counter_boost.value, 10);
      this.sun_counter_bar.value = `${sun_counter_progress}`;
      this.sun_counter_boost.value = `${this.sun_counter_boost_initial_value}`;
    }
  }
 class Game {
    constructor() {
      this.player_list = [];
      this.active_player = 0;
    }
    setup_events() {
      this.player_1 = new Player('player1');
      this.player_list.push(this.player_1);
      this.active_player =  Math.floor(Math.random() * this.player_list.length);
      this.game_board = new Board(5,50);
    }

    start_player_turn(){
      // link cards event listener to move player

    }

  }
  

function main() {
    const game = new Game();
    game.setup_events();
}

window.addEventListener('load', main);