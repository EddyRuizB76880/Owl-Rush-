import Board from './board.js';
import Deck from './deck.js';
import Player from './player.js';

export default class Game {
  constructor() {}
  setup_events() {
    this.deck = new  Deck();
    this.player_1 = new Player();
    this.game_board = new Board(5,50);
    let deck_button = document.getElementById('cardsGetStack');
    deck_button.addEventListener('click' , this.deck.deal_card);
    deck_button.addEventListener('click' , this.game_board.empty_boost);
  }
}
