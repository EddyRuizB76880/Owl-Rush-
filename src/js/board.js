
class Game {
    constructor() {
      this.board_info = document.getElementsByClassName('board_cell');
    }
    /*
     cell_coordinates = board_cells[board_info_index].getBoundingClientRect();
     cell_styles = window.getComputedStyle(board_cells[board_info_index]);
     this.board_info[board_info_index] = `${cell_styles.getPropertyValue('background-color')};${cell_coordinates.x};${cell_coordinates.y}`;   
    */ 
    setupEvents() {
      this.deck = new  Deck();
      this.player_1 = new Player();
      let deck_button = document.getElementById('cardsGetStack');
      deck_button.addEventListener('click' , this.deck.dealCard);
    }

    static movePlayer(color) {
      console.log(`La carta es color ${color}`);
       this.board_info = document.getElementsByClassName('board_cell');
      let player_1 = new Player('player1');
      let new_player_position = player_1.position;
      let cell_styles = window.getComputedStyle(this.board_info[new_player_position]);
      console.log(`${cell_styles.getPropertyValue('background-color')}`);
      while(cell_styles.getPropertyValue('background-color').localeCompare(color) != 0)
      {   cell_styles = window.getComputedStyle(this.board_info[new_player_position]);
          new_player_position += 1;
      }
        let cell_coordinates = this.board_info[new_player_position].getBoundingClientRect(); 
        this.player_1.move(cell_coordinates.x,cell_coordinates.y);
    }
  }

  function main() {
    const game = new Game();
    game.setupEvents();
  }
  window.addEventListener('load', main);
