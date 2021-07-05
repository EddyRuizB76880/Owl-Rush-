var currentSunPosition=0;
var currentCell;

class AlertManager {
  constructor() {
    this.alert_section = document.getElementById('player_alerts');
  }
// Message is the message to be displayed to the user, img is the route to an image to be placed
// ...buttons are the variable number of buttons to be displayed on the alert. Each button is an 
// array of values, the first one is the innerHTML of the button to be created, the second is a way
// to let the manager know which method to add to the buttons event listener, to be created...
  alert_player(message , img , ...buttons) {
    let new_alert , new_button , index;
    if (img != null){}
    new_alert = document.createElement('h2');
    new_alert.innerHTML = `${message}`;
    this.alert_section.appendChild(new_alert);
    if (buttons.length > 0){
      index = 0;
      for(index ; index < buttons.length ; index++){
        new_button = document.createElement ('button');
        new_button.innerHTML = `${buttons[index]}`;
        new_button.addEventListener('click', ()=> {this.dismiss();});
        this.alert_section.appendChild(new_button);
      }
    }
    this.alert_section.style.display = 'grid';

  }

  dismiss() {
    this.alert_section.style.display = 'none';
    // Code taken from JavaScript Tutorial online website. Available at :
    // https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
    while (this.alert_section.firstChild) {
      this.alert_section.removeChild(this.alert_section.firstChild);
    }
  }
}
class Player {
    constructor(id) {
      this.id = id;
      this.avatar = document.getElementById(id);
      this.position = 0;
      // Attributes needed to make player return to their previous position if
      // they fail the SS sequence
      this.previous_position;
      this.previous_top;
      this.previous_bottom;
      this.previous_right;
      this.previous_left;
    }
  
    move_avatar(next_position_left , next_position_top , next_position_bottom, 
                  next_position_right , new_postion ) {
     
     const old_coordinates = this.avatar.getBoundingClientRect();
     this.previous_position = this.position;
     this.previous_top = old_coordinates.top;
     this.previous_bottom = old_coordinates.bottom;
     this.previous_right = old_coordinates.right;
     this.previous_left = old_coordinates.left;
     this.avatar.style.top = `${next_position_top}px`;
     this.avatar.style.left = `${next_position_left}px`;
     this.avatar.style.bottom = `${next_position_bottom}px`;
     this.avatar.style.right = `${next_position_right}px`;
     this.position = new_postion;
    }

    go_back() {
      this.avatar.style.top = this.previous_top;
      this.avatar.style.left = this.previous_left;
      this.avatar.style.bottom = this.previous_bottom;
      this.avatar.style.right = this.previous_right;
      this.position = this.previous_position;
    }
  }
 class Deck {
  
    constructor() {//         Blue                Green                 Red                 Yellow 
      this.colors_array = ['rgb(0, 0, 255)' , 'rgb(0, 255, 0)' , 'rgb(255, 0, 0)' , 'rgb(255, 255, 0)' , 'SOL'];
      this.number_of_colors = this.colors_array.length;
    }
  
    deal_card(include_sun) {
      let new_card , color , rand_number;
      new_card = document.createElement('button');
      color = document.createElement('span');               
      rand_number = Math.floor(Math.random() * this.number_of_colors);
  
      if(include_sun === true && rand_number === (this.number_of_colors-1)){
        while (rand_number === (this.number_of_colors-1)) {
          rand_number = Math.floor(Math.random() * this.number_of_colors);
        }
      }

      new_card.className = 'buttonCardsSelection';
      color.className = 'color_circle';
  
      new_card.value = this.colors_array[rand_number];
      color.style.backgroundColor = this.colors_array[rand_number];

      new_card.appendChild(color);
      return new_card;
    }
  
  }
  

  class SunPath{
  
    constructor(){
      this.sunpath = document.getElementById("sun_path");
      this.sun = document.getElementById("Sun");
      this.sunCounter = document.getElementById("SunCounterProgressBar");
      
      currentCell= this.sunpath.rows[0].cells[0];
      currentCell.appendChild(this.sun);
    }
    /*
    actionOfSunPath(){
      this.sunCounter.value = "100";
      if(this.sunCounter.value != "100"  ){
          currentSunPosition+=1;
          currentCell= this.sunpath.rows[0].cells[currentSunPosition];
          currentCell.appendChild(this.sun);
      }
    }*/
  }

  class SimonSays {
    constructor() {
      this.sequence = [];
      this.playerSequence = [];
      this.turns = 4;
      this.currentTurn = 0;
      this.incremental = false;
      this.buttons = ['red_button', 'green_button', 'blue_button', 'yellow_button'];
      this.buttonPressed = '';
      this.player_succeeded = false;
    }

  
    resetGame(text) {
      const buttonContainer = document.getElementById('buttons_simon_says');
      console.log(text);
      this.sequence = [];
      this.playerSequence = [];
      this.currentTurn = 0;
      this.player_succeeded = false;
      buttonContainer.classList.add('unclickable');
    }
  
    handleClick(tile) {
      const index = this.playerSequence.push(tile) - 1;
      if (this.playerSequence.length === this.sequence.length) {
        this.playerSequence = [];
        console.log('You can stay in the position');
        this.player_succeeded = true;
        return;
      }
  
      if (this.playerSequence[index] !== this.sequence[index]) {
        this.resetGame('Oops! You pressed the wrong button, go back.');
      }
    }
  
    playerTurn() {
      const buttonContainer = document.getElementById('buttons_simon_says');
      buttonContainer.classList.remove('unclickable');
      buttonContainer.addEventListener('click', (event) => {
        const buttonEvent = event.target.id;
        console.log(buttonEvent);
        if (buttonEvent) this.handleClick(buttonEvent);
      });
    }
  
    nextStep() {
      const random = this.buttons[Math.floor(Math.random() * this.buttons.length)];
      return random;
    }
  
    generateSequenceIncremental() {
      // copy all the elements in the `sequence` array to `nextSequence`
      const nextSequence = [...this.sequence];
      nextSequence.push(this.nextStep());
      this.playRound(nextSequence);
      this.sequence = [...nextSequence];
    }
  
    generateSequenceFixed() {
      for (let index = 0; index < this.turns; index += 1) {
        this.sequence.push(this.nextStep());
      }
      this.playRound(this.sequence);
    }
  
    generateSequence() {
      if (this.incremental === true) {
        this.generateSequenceIncremental();
      } else {
        this.generateSequenceFixed();
      }
    }
  
    playSequence() {
      this.generateSequence();
      setTimeout(() => {
        this.playerTurn(this.currentTurn);
      }, this.currentTurn * 600 + 1000);
    }
  
    startRound() {
      this.currentTurn += 1;
      this.playSequence();
    }
  
    activatebutton(color) {
      const button = document.getElementById(`${color}`);
      this.buttonPressed = button;
      button.classList.add('activated');
      setTimeout(() => {
        button.classList.remove('activated');
      }, 400);
    }
  
    playRound(nextSequence) {
      nextSequence.forEach((color, index) => {
        setTimeout(() => {
          this.activatebutton(color);
        }, (index + 1) * 600);
      });
    }
  
  }

   class Board{
    constructor(sc_gracetime , scb_initial_value) {
      this.board_info = document.getElementsByClassName('board_cell');
      this.sun_counter_bar = document.getElementById('SunCounterProgressBar');
      this.sun_counter_filling = document.getElementById('Sun-CounterFilling');
      this.sun_counter_boost = document.getElementById('sun_counter_boost');
      this.sun_counter_boost.value = `${scb_initial_value}`;
      this.sun_counter_boost_gracetime = sc_gracetime;
      this.sun_counter_boost_initial_value = scb_initial_value;
      this.simon_says_module = new SimonSays();
      //ToDO: Try to separate sun counter stuff in a new class called Sun Manager
      this.time_out;
    }

    start_player_turn(new_card , active_player) {
        console.log(`${new_card.value}`);
       // this.sun_counter_bar.value += 10; //para pruebas 
        
        if (new_card.value === 'SOL') {
          //recupere la barritla y le suba
          this.sunpath = document.getElementById("sun_path");
          this.sun = document.getElementById("Sun");
          
           if (this.sun_counter_bar.value != "100"  ) {
              currentSunPosition+=1;
              currentCell= this.sunpath.rows[0].cells[currentSunPosition];
              currentCell.appendChild(this.sun);
           } else {
              this.sun_counter_bar.value = "0";
              this.sun_counter_filling.innerHTML= this.sun_counter_bar.value+"%";
           }
        } else {
        this.append_card(new_card , active_player);
        this.empty_boost();
        console.log(`${new_card.value} es el valor de la nueva carta`);
      }
  }
  append_card(new_card , active_player){
    const player_hand = document.getElementById('player\'s_hand');
    let hand_card = document.createElement('li');
    new_card.addEventListener('click' , (event)=>{  this.process_player_result
                                                    (new_card.value, active_player); 
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
      let progress_value = parseInt(this.sun_counter_boost.value,10)
      this.timeout= setInterval(() => { 
                                        progress_value -= 5; //ToDo: Implement progress_value -= value/gracetime 
                                        this.sun_counter_boost.value = `${progress_value}`;
                                      }, 1000);
  
    }
  
    process_player_result(chosen_card_color, active_player) {
      clearInterval(this.timeout);
      let sun_counter_progress = parseInt(this.sun_counter_bar.value,10);
      sun_counter_progress += parseInt(this.sun_counter_boost.value, 10);
      this.sun_counter_bar.value = `${sun_counter_progress}`;
      this.sun_counter_boost.value = `${this.sun_counter_boost_initial_value}`;
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

 class Game {
    constructor() {
      this.player_list = [];
      this.active_player = 0;
    }
    setup_game() {
      this.sunPath = new SunPath();
      this.player_1 = new Player('player1');
      this.game_board = new Board(5,50);
      this.deck = new Deck();
      this.alert_manager = new AlertManager();
      this.player_list.push(this.player_1);
      this.active_player =  Math.floor(Math.random() * this.player_list.length);
      let deck_button = document.getElementById('cardsGetStack');
      let starting_cards_amount = 2;
      this.generate_starting_cards(starting_cards_amount);
      deck_button.addEventListener('click', (event)=>{   this.start_player_turn(); });
      deck_button.classList.add('focused_element');
      this.alert_manager.alert_player('Cuando estés listo, presiona la baraja de cartas. Si necesitas hacer algún ajuste, puedes regresar al menu principal antes de empezar la partida' 
                                          , 'ff' , [['Entendido', '4']]);
                                
    }

    generate_starting_cards(limit) {
      let index = 1;
      for(index ; index <= limit ; index++) {
        this.game_board.append_card(this.deck.deal_card(false) , 
                                    this.player_list[this.active_player]);
      }

    }

    start_player_turn(){
      this.game_board.start_player_turn(this.deck.deal_card(true),
                                        this.player_list[this.active_player]);
      //this.active_player += 1, but with mod operation so active player value is circular
      
    }

  }
  

function main() {
    const game = new Game();
    currentSunPosition = 0;
    game.setup_game();
}

window.addEventListener('load', main);