/*
Class SimonSays
Taken and adapted from: https://freshman.tech/simon-game/
*/
export default class SimonSays {
  constructor(simon_says_gracetime) {
    this.sequence = [];
    this.playerSequence = [];
    this.turns = 4;
    this.incremental = false;
    this.buttons = ['red_button', 'green_button', 'blue_button', 'yellow_button'];
    this.buttonPressed = '';
    this.playerSucceeded = true;
    this.simon_time = simon_says_gracetime;
    this.buttonContainer = document.getElementById('buttons_simon_says');
  }

  reset() {
    this.sequence = [];
    this.playerSequence = [];
    this.buttonPressed = '';
    this.playerSucceeded = true;
  }

  resetGame(text) {
    const buttonContainer = document.getElementById('buttons_simon_says');
    console.log(text);
    this.sequence = [];
    this.playerSequence = [];
    this.currentTurn = 0;
    this.playerSucceeded = false;
    buttonContainer.classList.add('unclickable');
  }

  checkPlayerSequence() {
    this.buttonContainer.classList.remove('unclickable');
    const buttonContainer = document.getElementById('buttons_simon_says');
    if (this.playerSequence.length === this.sequence.length && this.playerSucceeded === true) {
      this.playerSequence = [];
      console.log('You can stay in the position');
      this.buttonContainer.classList.add('unclickable');
    }
    setTimeout(() => {
      this.checkPlayerSequence();
    }, this.simon_time * 1000);
  }

  handleClick(tile) {
    const index = this.playerSequence.push(tile) - 1;
    if (this.playerSequence[index] !== this.sequence[index]) {
      this.playerSucceeded = false;
      this.resetGame('Oops! You pressed the wrong button, go back.');
    }
  }

  playerTurn() {
    this.buttonContainer.classList.remove('unclickable');
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
    this.playerTurn(this.currentTurn);
  }
}
