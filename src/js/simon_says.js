/*
  To play:
  1. Check number of steps to create random sequence
    If steps equals 0
      Steps begin in 1 and increase as number of turns of game
    If steps equals -1
      Steps begin in 1 and increase if correct answer
    Else
      Create random sequence with steps defined in lobby
  2. Player has to recreate the sequence
    If player gets it right
      Player can stay in the position
    Else player gets it wrong
      Punishment is applied
      Steps decrease if steps equals -1
      Player looses turn
      Player returns back to the position it was
*/

let sequence = [];
let playerSequence = [];
const turns = 4; /// TODO: get variables configuration from lobby
let currentTurn = 0;

/*
  Gets start button to add an event listner later
*/
const startButton = document.getElementById('start_button');
const buttonContainer = document.getElementById('buttons_simon_says');

/*
 Function taken from: https://freshman.tech/simon-game/
 Function next step gets the next button in the sequence
 @@return random
*/
function nextStep() {
  const buttons = ['red_button', 'green_button', 'blue_button', 'yellow_button'];
  const random = buttons[Math.floor(Math.random() * buttons.length)];
  return random;
}

/*
  Generates the sequence with fixed number of turns set
  in lobby by the host.
*/
function generateSequenceFixed() {
  for (let index = 0; index < turns; index += 1) {
    sequence.push(nextStep());
  }
}

/*
 Function taken from: https://freshman.tech/simon-game/
 Function to activate the game button by color.
 This function uses Timeout in order that the colors don't show all up at once.
 @@params color: color of the button in the game
*/
function activatebutton(color) {
  const button = document.getElementById(`${color}`);
  button.classList.add('activated');
  setTimeout(() => {
    button.classList.remove('activated');
  }, 400);
}

/*
 Function taken from: https://freshman.tech/simon-game/
 Function to play the round.
 This function calls activatebutton for all the buttons in the sequence.
 @@params nextSequence: sequence to play
*/
function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activatebutton(color);
    }, (index + 1) * 600);
  });
}

/*
  Function taken from:  https://freshman.tech/simon-game/
*/
function humanTurn() {
  buttonContainer.classList.remove('unclickable');
}

/*
  Function taken and adapted from:  https://freshman.tech/simon-game/
  Function next round generates the sequence for the game.
  The sequence can be a fixed sequence, incremental sequence, or depending on
  the turn the player is.
  This configuration comes from the lobby.
*/
function nextRound() {
  if (turns > 0) { // fixed sequence
    currentTurn = turns;
    generateSequenceFixed();
  }
  playRound(sequence);
  setTimeout(() => {
    humanTurn();
  }, currentTurn * 600 + 1000);
}

function startGame() {
  startButton.classList.add('hidden');
  nextRound();
}

function resetGame(text) {
  console.log(text);
  sequence = [];
  playerSequence = [];
  currentTurn = 0;
  startButton.classList.remove('hidden');
  buttonContainer.classList.add('unclickable');
}

function handleClick(tile) {
  const index = playerSequence.push(tile) - 1;
  if (playerSequence.length === sequence.length) {
    playerSequence = [];
    console.log('You can stay in the position');
    return;
  }

  if (playerSequence[index] !== sequence[index]) {
    resetGame('Oops! You pressed the wrong button, go back.');
  }
}

startButton.addEventListener('click', startGame);

buttonContainer.addEventListener('click', (event) => {
  const buttonEvent = event.target.id;
  console.log(buttonEvent);
  if (buttonEvent) handleClick(buttonEvent);
});
