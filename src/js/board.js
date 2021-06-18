
export default class Board{
    constructor(sc_gracetime , scb_initial_value) {
      this.board_info = document.getElementsByClassName('board_cell');
      this.sun_counter_bar = document.getElementById('SunCounterProgressBar');
      this.sun_counter_boost = document.getElementById('sun_counter_boost');
      this.sun_counter_boost.value = `${scb_initial_value}`;
      this.sun_counter_boost_gracetime = sc_gracetime;
      this.sun_counter_boost_initial_value = scb_initial_value;
      this.time_out;
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
        player.move_avatar(cell_coordinates.x,cell_coordinates.y, new_player_position);
    }

    empty_boost() {
      this.timeout= setInterval(() => { // ToDo: leave parseInt outside interval
                                        let progress_value = parseInt(this.sun_counter_boost.value,10)
                                        progress_value -= 5; //ToDo: Implement progress_value -= value/gracetime 
                                        this.sun_counter_boost.value = `${progress_value}`;
                                      }, 1000);

    }

    static stop_timeout() {
      clearInterval(this.timeout);
      let sun_counter_progress = parseInt(this.sun_counter_bar.value,10);
      sun_counter_progress += parseInt(this.sun_counter_boost.value, 10);
      this.sun_counter_bar.value = `${sun_counter_progress}`;
      this.sun_counter_boost.value = `${this.sun_counter_boost_initial_value}`;
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