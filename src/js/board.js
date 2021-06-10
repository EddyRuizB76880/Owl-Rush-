
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
      let deck_button = document.getElementById('cardsGetStack');
      deck_button.addEventListener('click' , this.deck.dealCard);
    }
  }

  function main() {
    const game = new Game();
    game.setupEvents();
  }
  window.addEventListener('load', main);
