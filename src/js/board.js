
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
      this.setupBoardInfo();
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
   /*
        let el=  x[1].getBoundingClientRect();
        let st= window.getComputedStyle(x[1]);
        x[1].textContent = 'My computed font-size is ' +
          st.getPropertyValue('font-size') +
          ',\nand my computed line-height is ' +
          st.getPropertyValue('line-height') +
          '.';
      */