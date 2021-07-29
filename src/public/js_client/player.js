/*
  Code based on teacher's example.
*/ 
export default class Player {
  constructor(id , av_src) {
    this.id = id;
    this.avatar = document.createElement('img');
    const board = document.getElementById('game_board');
    this.avatar.id = this.id;
    this.avatar.classList.add('player');
    this.avatar.src = av_src;
    this.avatar.height = '25';
    board.appendChild(this.avatar);
    this.position = 10;
    // Attributes needed to make player return to their previous position if
    // they fail the SS sequence
    this.previous_position = 0;
    this.previous_top = 0;
    this.previous_left = 0;
  }

  move_avatar(next_position_left , next_position_top , new_postion ) {
   this.previous_position = this.position;
   this.previous_top = this.avatar.offsetTop;
   this.previous_left = this.avatar.offsetLeft;
   console.log(`${this.previous_top} , ${this.previous_left}`);
   this.avatar.style.top = `${next_position_top}px`;
   this.avatar.style.left = `${next_position_left}px`;
   this.position = new_postion;
  }

  go_back() {
    this.avatar.style.top = `${this.previous_top}px`;
    this.avatar.style.left = `${this.previous_left}px`;;
    this.position = this.previous_position;
  }
}