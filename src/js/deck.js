export default class Deck {
  
  constructor() {//         Blue                Green                 Red                 Yellow 
    this.colors_array = ['rgb(0, 0, 255)' , 'rgb(0, 255, 0)' , 'rgb(255, 0, 0)' , 'rgb(255, 255, 0)' , 'SOL'];
    this.number_of_colors = this.colors_array.length;
  }

  deal_card(include_sun) {
    let new_card , color , rand_number;
    new_card = document.createElement('button');
    color = document.createElement('span');               
    rand_number = Math.floor(Math.random() * this.number_of_colors);

    if(include_sun === false && rand_number === (this.number_of_colors-1)){
      while (rand_number === (this.number_of_colors-1)) {
        rand_number = Math.floor(Math.random() * this.number_of_colors);
      }
    }

    new_card.className = 'buttonCardsSelection';
    color.className = 'color_circle';

    new_card.value = this.colors_array[rand_number];
    color.style.backgroundColor = this.colors_array[rand_number];

    new_card.appendChild(color);
    return new_card;
  }

}
