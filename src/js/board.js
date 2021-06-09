class Game {
    constructor() {
        
    }
  
    setupBoardInfo() {
        
        // Vector that will be used to store info on each cell on the game board
        this.board_info = [];
        let board_cells = document.getElementsByClassName('board_cell');
        let board_info_index= 0 ;
        let cell_coordinates = undefined;
        let cell_styles = undefined;
        for (board_info_index ; board_info_index < board_cells.length ; board_info_index++){
            cell_coordinates = board_cells[board_info_index].getBoundingClientRect();
            cell_styles = window.getComputedStyle(board_cells[board_info_index]);
            this.board_info[board_info_index] = `${cell_styles.getPropertyValue('background-color')};${cell_coordinates.x};${cell_coordinates.y}`; 
        console.log(this.board_info[board_info_index]);
        }
    }

    setupEvents() {
      this.setupBoardInfo();
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