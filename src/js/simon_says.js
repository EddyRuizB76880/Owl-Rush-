/*
  Class SimonSays
  Taken and adapted from: https://freshman.tech/simon-game/
*/
class SimonSays {
  constructor() {
    this.sequence = [];
    this.playerSequence = [];
    this.turns = 4;
    this.currentTurn = 0;
    this.incremental = false;
    this.buttons = ['red_button', 'green_button', 'blue_button', 'yellow_button'];
    this.buttonPressed = '';
  }

  setupStart() {
    const startButton = document.getElementById('start_button');
    startButton.addEventListener('click', () => { this.startGame(startButton); });
  }

  resetGame(text) {
    const startButton = document.getElementById('start_button');
    const buttonContainer = document.getElementById('buttons_simon_says');
    console.log(text);
    this.sequence = [];
    this.playerSequence = [];
    this.currentTurn = 0;
    startButton.classList.remove('hidden');
    buttonContainer.classList.add('unclickable');
  }

  handleClick(tile) {
    const index = this.playerSequence.push(tile) - 1;
    if (this.playerSequence.length === this.sequence.length) {
      this.playerSequence = [];
      console.log('You can stay in the position');
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

  nextRound() {
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

  startGame(startButton) {
    startButton.classList.add('hidden');
    this.nextRound();
  }
}

function main() {
  const simonSays = new SimonSays();
  simonSays.setupStart();
}

window.addEventListener('load', main);
