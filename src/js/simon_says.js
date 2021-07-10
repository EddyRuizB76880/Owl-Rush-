/*
  Class SimonSays
  Taken and adapted from: https://freshman.tech/simon-game/
*/
export default class SimonSays {
  constructor(simon_says_gracetime) {
    this.sequence = [];
    this.player_sequence = [];
    this.turns = 4;
    this.currentTurn = 0;
    this.incremental = false;
    this.buttons = ['red_button', 'green_button', 'blue_button', 'yellow_button'];
    this.buttonPressed = '';
    this.player_succeeded = false;
    this.simon_time = simon_says_gracetime;
  }

  resetGame(text) {
    const buttonContainer = document.getElementById('buttons_simon_says');
    console.log(text);
    this.sequence = [];
    this.player_sequence = [];
    this.currentTurn = 0;
    this.player_succeeded = false;
    buttonContainer.classList.add('unclickable');
  }

  checkPlayerSequence() {
    const buttonContainer = document.getElementById('buttons_simon_says');
    buttonContainer.classList.add('unclickable');
    if (this.player_sequence.length === this.sequence.length) {
      this.player_sequence = [];
      console.log('You can stay in the position');
      this.player_succeeded = true;
    }
  }

  handleClick(tile) {
    const index = this.player_sequence.push(tile) - 1;
    if (this.player_sequence[index] !== this.sequence[index]) {
      this.resetGame('Oops! You pressed the wrong button, go back.');
      this.player_succeeded = false;
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
    this.currentTurn += 1;
    this.generateSequence();
    this.playerTurn(this.currentTurn);
    setTimeout(() => {
      this.checkPlayerSequence();
    }, this.simon_time * 1000);
  }
}
