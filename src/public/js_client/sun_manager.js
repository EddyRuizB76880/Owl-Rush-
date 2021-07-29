export default class SunManager {
  constructor(sc_gracetime, scb_initial_value) {
    this.sunpath = document.getElementById('sun_path');
    this.sun = document.getElementById('Sun');
    this.sunCounter = document.getElementById('SunCounterProgressBarColor');
    this.sun_counter_filling = document.getElementById('Sun-CounterFilling');
    this.sun_counter_boost = document.getElementById('sun_counter_boost');
    this.sun_counter_boost.value = `${scb_initial_value}`;
    this.sun_counter_boost_gracetime = sc_gracetime;
    this.sun_counter_boost_initial_value = scb_initial_value;
    this.currentSunPosition = -1;
    this.currentCell = this.sunpath.rows[0].cells[0];
    this.currentCell.appendChild(this.sun);
    // ToDo: find a way to get the total cells of sun path
    this.sun_size = 9;
    this.player_reaction_time_out;
  }

  determine_sun_card_result() {
    console.log(`sunCounter width: ${this.sunCounter.style.width}`);
    if (this.sunCounter.style.width !== '100%') {
      this.sun.className = 'sunItem';
      this.currentSunPosition += 1;
      this.currentCell = this.sunpath.rows[0].cells[this.currentSunPosition];

      setTimeout(() => {
        this.sun.className += ' move';
      }, 300);
      this.currentCell.appendChild(this.sun);

      if (this.currentSunPosition === this.sun_size) {
        this.sun_wins();
      }
    } else {
      this.sunCounter.style.width = '0%';
      this.sun_counter_filling.innerHTML = `${this.sunCounter.style.width}`;
    }
  }

  sun_wins() {
    this.currentSunPosition = 9;
    const sun_result_element = document.getElementById('sun_result');
    const game_board_element = document.getElementById('game_board');
    game_board_element.classList.add('hidden');
    sun_result_element.classList.remove('hidden');
  }

  empty_boost() {
    let progress_value = parseInt(this.sun_counter_boost.value, 10);
    this.player_reaction_time_out = setInterval(() => {
      progress_value -= this.sun_counter_boost_initial_value / this.sun_counter_boost_gracetime;
      this.sun_counter_boost.value = `${progress_value}`;
    }, 3000);
  }

  update_sun_counter() {
    clearInterval(this.player_reaction_time_out);
    let sun_counter_progress = parseInt(this.sunCounter.offsetWidth, 10);
    sun_counter_progress += parseInt(this.sun_counter_boost.value, 10);
    if (sun_counter_progress > 100) {
      sun_counter_progress = 100;
    }
    this.set_new_sun_counter_value(sun_counter_progress);
  }

  //
  set_new_sun_counter_value(sun_counter_progress) {
    setTimeout(() => {
      this.sunCounter.style.width = `${sun_counter_progress}%` ;
    }, 1000)
    this.sun_counter_filling.innerHTML = `${sun_counter_progress}%`;
    this.sun_counter_boost.value = `${this.sun_counter_boost_initial_value}`;
  }
}
