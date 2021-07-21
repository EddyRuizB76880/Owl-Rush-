export default class Deck {
  
  constructor() {//         Blue                Green                 Red                 Yellow 
    this.colors_array = ['rgb(0, 0, 255)' , 'rgb(0, 255, 0)' , 'rgb(255, 0, 0)' , 'rgb(255, 255, 0)' , 'SOL'];
  }

  deal_card(include_sun) {
    const new_card = document.createElement('button');
    const color = document.createElement('span');               
    let not_sun_included = 0;
  
    if(include_sun === false) {
      not_sun_included = 1;
    }

    let rand_number = Math.floor(Math.random() * (this.colors_array.length - not_sun_included));
    
    new_card.disabled = true;//
    new_card.classList.add('buttonCardsSelection');
    color.className = 'color_circle';

    new_card.value = this.colors_array[rand_number];
    color.style.backgroundColor = this.colors_array[rand_number];

    new_card.appendChild(color);
    return new_card;
  }

}
