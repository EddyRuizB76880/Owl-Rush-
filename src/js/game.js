import Board from './board.js';
import Deck from './deck.js';
import Player from './player.js';
import AlertManager from './alert_manager.js';

export default class Game {
  constructor() {
    this.player_list = [];
    this.active_player = 0;
  }

  setup_game() {
    let deck_button = document.getElementById('cardsGetStack');
    const sun_counter_grace = 5;
    const sun_counter_boost = 100;
    const starting_cards_amount = 2;
    this.player_1 = new Player('player1');
    this.game_board = new Board(sun_counter_grace,
                                sun_counter_boost);
    this.deck = new Deck();
    this.alert_manager = new AlertManager();
    this.player_list.push(this.player_1);
    this.active_player = Math.floor(Math.random() * this.player_list.length);
    this.generate_starting_cards(starting_cards_amount);
    deck_button.addEventListener('click', (event) => { this.start_player_turn(); });
    deck_button.classList.add('focused_element');
    this.alert_manager.alert_player('Cuando estés listo, presiona la baraja de cartas. Si necesitas hacer algún ajuste, puedes regresar al menu principal antes de empezar la partida'
      , 'ff', ['Entendido', '4']); // To add more buttons, just add more tuples after ff

  }

  generate_starting_cards(limit) {
    let index = 1;
    for (index; index <= limit; index++) {
      this.game_board.append_card(this.deck.deal_card(false),
        this.player_list[this.active_player]);
    }

  }
  
  start_player_turn() {
    this.game_board.start_player_turn(this.deck.deal_card(true),
      this.player_list[this.active_player],
    );
    //this.active_player += 1, but with mod operation so active player value is circular

  }

}
