/*
  Class SimonSays
  Taken and adapted from: https://freshman.tech/simon-game/
*/
export default class SimonSays {
  constructor() {
    this.sequence = [];
    this.playerSequence = [];
    this.turns = 4;
    this.currentTurn = 0;
    this.incremental = false;
    this.buttons = ['red_button', 'green_button', 'blue_button', 'yellow_button'];
    this.buttonPressed = '';
    this.playerSucceeded = true;
    this.simonTime = 20;
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
    const buttonContainer = document.getElementById('buttons_simon_says');
    buttonContainer.classList.add('unclickable');
    if (this.playerSequence.length === this.sequence.length && this.playerSucceeded === true) {
      this.playerSequence = [];
      console.log('You can stay in the position');
    }
  }

  handleClick(tile) {
    const index = this.playerSequence.push(tile) - 1;
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
    }, this.simonTime * 1000);
  }
}
