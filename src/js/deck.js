export default class Deck {

  constructor() {
  }

  deal_card() {
    const player_hand = document.getElementById('player\'s_hand');
    let hand_card , new_card , color , colors_array , rand_number;

    // hand_card represents the list element that will allow the new card to be
    // displayed on player´s hand
    hand_card = document.createElement('li');
    new_card = document.createElement('button');
    color = document.createElement('span');

    // ToDo: add colors_array as an attribute in Deck
    colors_array = ['rgb(0, 0, 255)' , 'rgb(0, 255, 0)' , 'rgb(255, 0, 0)' , 'rgb(255, 255, 0)'];
    rand_number = Math.floor(Math.random() * colors_array.length);

    new_card.className = 'buttonCardsSelection';
    color.className = 'color_circle';

    new_card.value = colors_array[rand_number];
    color.style.backgroundColor = colors_array[rand_number];
    new_card.addEventListener('click',function(){Player.start_move(new_card.value)});
    
    new_card.appendChild(color);
    hand_card.appendChild(new_card);
    player_hand.appendChild(hand_card);

  }

}