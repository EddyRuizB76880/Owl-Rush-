
import Game from './game.js';
function main() {
    const game = new Game();
    game.setup_game();
}

window.addEventListener('load', main);
