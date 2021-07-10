/*
  Class SimonSays
  Taken and adapted from: https://freshman.tech/simon-game/
*/
export default class SimonSays {
  constructor(simon_says_gracetime) {
    this.sequence = [];
    this.player_sequence = [];
    this.turns = 4;
    this.incremental = false;
    this.buttons = ['red_button', 'green_button', 'blue_button', 'yellow_button'];
    this.buttonPressed = '';
    this.player_succeeded = true;
    this.simon_time = simon_says_gracetime;
    this.buttonContainer = document.getElementById('buttons_simon_says');
    this.setup();
  }

  resetGame(text) {
    const buttonContainer = document.getElementById('buttons_simon_says');
    console.log(text);
    this.sequence = [];
    this.player_sequence = [];
    this.player_succeeded = true;
    buttonContainer.classList.add('unclickable');
  }

  checkPlayerSequence() {
    const buttonContainer = document.getElementById('buttons_simon_says');
    buttonContainer.classList.add('unclickable');
    let result = '';
    console.log(`${this.player_sequence.length},${this.sequence.length}`);
    if (this.player_sequence.length === this.sequence.length) {
      result = 'Sequence was ok';
      let index = 0;
      let keep_going = true;
      for(index ; keep_going && index < this.sequence.length ; index++) {
        if(this.player_sequence[index] !== this.sequence[index]){
          this.player_succeeded = false;
          keep_going = false;
          result = 'Incorrect sequence. Go back';
        }
      }
      }else {
        result = 'Mismatching sequences.'; 
        this.player_succeeded = false;
      }
      console.log(`${result}`);
  }
  

  handleClick(tile) {
    const index = this.player_sequence.push(tile) - 1;
    console.log(`${this.player_sequence.length}`);
  }

  setup() {
    this.buttonContainer.addEventListener('click', (event) => {
      const buttonEvent = event.target.id;
      console.log(buttonEvent);
      if (buttonEvent) this.handleClick(buttonEvent);
    });
  }

  nextStep() {
    const random = this.buttons[Math.floor(Math.random() * this.buttons.length)];
    return random;
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
    const buttonContainer = document.getElementById('buttons_simon_says');
    nextSequence.forEach((color, index) => {
      setTimeout(() => {
        this.activatebutton(color);
      }, (index + 1) * 600);
    });
    setTimeout(() => {
      buttonContainer.classList.remove('unclickable');
    }, this.sequence.length * 1000);
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

  /*
    Main function:
    Generates sequence
    User repeats the sequence
  */
  startRound() {
    
    this.generateSequence();
    this.buttonContainer.classList.remove('unclickable');;
    setTimeout(() => {
      this.checkPlayerSequence();
    }, this.simon_time * 1000);
  }
}
