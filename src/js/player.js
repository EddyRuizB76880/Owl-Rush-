/*
  Code based on teacher's example.
*/ 
class Player {
    constructor(id) {
      this.id = id;
      this.element = document.getElementById(id);
      this.position = 0;
    }
  
    move(next_position_x, next_position_y ) {
      const computedStyles = window.getComputedStyle(this.element);
      this.element.style.top = `${next_position_y}px`;
      this.element.style.left = `${next_position_x}px`;
    }
  }