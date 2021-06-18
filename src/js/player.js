/*
  Code based on teacher's example.
*/ 
export default class Player {
    constructor(id) {
      this.id = id;
      this.avatar = document.getElementById(id);
      this.position = 0;
    }

    static start_move(chosen_card_value) {
      Board.move_player(chosen_card_value, this);
    }

    move_avatar(next_position_x, next_position_y, new_postion ) {
      const computedStyles = window.getComputedStyle(this.element);
      this.avatar.style.top = `${next_position_y}px`;
      this.avatar.style.left = `${next_position_x}px`;
      this.position = new_postion;
    }
  }