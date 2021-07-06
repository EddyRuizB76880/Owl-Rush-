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
    this.previous_bottom;
    this.previous_right;
    this.previous_left;
  }

  move_avatar(next_position_left , next_position_top , next_position_bottom, 
                next_position_right , new_postion ) {
   
   const old_coordinates = this.avatar.getBoundingClientRect();
   this.previous_position = this.position;
   this.previous_top = old_coordinates.top;
   this.previous_bottom = old_coordinates.bottom;
   this.previous_right = old_coordinates.right;
   this.previous_left = old_coordinates.left;
   this.avatar.style.top = `${next_position_top}px`;
   this.avatar.style.left = `${next_position_left}px`;
   this.avatar.style.bottom = `${next_position_bottom}px`;
   this.avatar.style.right = `${next_position_right}px`;
   this.position = new_postion;
  }

  go_back() {
    this.avatar.style.top = this.previous_top;
    this.avatar.style.left = this.previous_left;
    this.avatar.style.bottom = this.previous_bottom;
    this.avatar.style.right = this.previous_right;
    this.position = this.previous_position;
  }
}