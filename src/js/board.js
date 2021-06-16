
export default class Board{
    constructor() {
      this.board_info = document.getElementsByClassName('board_cell');
    }
    /*
     cell_coordinates = board_cells[board_info_index].getBoundingClientRect();
     cell_styles = window.getComputedStyle(board_cells[board_info_index]);
     this.board_info[board_info_index] = `${cell_styles.getPropertyValue('background-color')};${cell_coordinates.x};${cell_coordinates.y}`;   
    */ 
    static move_player(color , player) {
      console.log(`La carta es color ${color}`);
      this.board_info = document.getElementsByClassName('board_cell');
      let new_player_position = player.position;
      let cell_styles = window.getComputedStyle(this.board_info[new_player_position]);
      console.log(`${cell_styles.getPropertyValue('background-color')}`);
      while(cell_styles.getPropertyValue('background-color').localeCompare(color) != 0)
      {   
        new_player_position += 1;
        console.log(`${this.board_info[new_player_position]},${new_player_position}`);
        console.log(`${cell_styles.getPropertyValue('background-color')} vs ${color}`);  
        cell_styles = window.getComputedStyle(this.board_info[new_player_position]);
          
      }
        let cell_coordinates = this.board_info[new_player_position].getBoundingClientRect(); 
        player.move_avatar(cell_coordinates.x,cell_coordinates.y);
    }
}

/*<script> logica de sun counter y sun counter boost
var myVar;

function myFunction() {
  myVar = setInterval(function(){ var number = document.getElementById("id");
  								 var n2 = parseInt(number.innerHTML,10)
                                 console.log(`${number.innerHTML}`);
                                 n2+=1;
                                 number.innerHTML = ""+n2;} , 3000);
}

function myStopFunction() {
  clearInterval(myVar);
}
</script>*/ 