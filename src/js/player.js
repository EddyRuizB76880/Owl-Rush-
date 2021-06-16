/*
  Code based on teacher's example.
*/ 
export default class Player {
    constructor(id) {
      this.id = id;
      this.avatar = document.getElementById(id);
      this.position = 0;
    }

    static start_move(new_card_value) {
      Board.move_player(new_card_value, this);
    }

    move_avatar(next_position_x, next_position_y ) {
      const computedStyles = window.getComputedStyle(this.element);
      this.avatar.style.top = `${next_position_y}px`;
      this.avatar.style.left = `${next_position_x}px`;
    }
  }