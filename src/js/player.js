/*
  Code based on teacher's example.
*/ 
export default class Player {
  constructor(id) {
    this.id = id;
    this.avatar = document.getElementById(id);
    this.position = 0;
    // Attributes needed to make player return to their previous position if
    // they fail the SS sequence
    this.previous_position;
    this.previous_top;
    this.previous_left;
  }

  move_avatar(next_position_left , next_position_top , new_postion ) {
   this.previous_position = this.position;
   this.previous_top = this.offsetTop;
   this.previous_left = this.offsetLeft;
   this.avatar.style.top = `${next_position_top}px`;
   this.avatar.style.left = `${next_position_left}px`;
   this.position = new_postion;
  }

  go_back() {
    this.avatar.style.top = this.previous_top;
    this.avatar.style.left = this.previous_left;
    this.position = this.previous_position;
  }
}