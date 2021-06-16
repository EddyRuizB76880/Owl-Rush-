import Game from './game.js';

function main() {
    const game = new Game();
    game.setup_events();
}

window.addEventListener('load', main);