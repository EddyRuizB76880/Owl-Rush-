import AlertManager from './alert_manager.js'
export default class SunManager{
  
    constructor(sc_gracetime , scb_initial_value) {
      // ToDo: Make Game class the only one to manage AlertManager
      this.alert_manager = new AlertManager();
      this.sunpath = document.getElementById("sun_path");
      this.sun = document.getElementById("Sun");
      this.sunCounter = document.getElementById("SunCounterProgressBar");
      this.sun_counter_filling = document.getElementById('Sun-CounterFilling');
      this.sun_counter_boost = document.getElementById('sun_counter_boost');
      this.sun_counter_boost.value = `${scb_initial_value}`;
      this.sun_counter_boost_gracetime = sc_gracetime;
      this.sun_counter_boost_initial_value = scb_initial_value;
      this.currentSunPosition = 0;
      this.currentCell = this.sunpath.rows[0].cells[0];
      this.currentCell.appendChild(this.sun);
      this.player_reaction_time_out;
    }

    determine_sun_card_result() {
      let resolution;
      if (this.sunCounter.value != "100") {
        this.currentSunPosition+=1;
        this.currentCell= this.sunpath.rows[0].cells[this.currentSunPosition];
        this.currentCell.appendChild(this.sun);
        resolution = 'El sol avanza una casilla :(';
     } else {
        this.sunCounter.value = "0";
        this.sun_counter_filling.innerHTML= this.sunCounter.value+"%";
        resolution = 'Pero tu Sun-Counter estaba lleno. La carta queda anulada y el sol no avanza :)';
     }

     this.alert_manager.alert_player(`¡Oh no! Una carta sol ha aparecido. ${resolution}`  
     , 'sun_icon' , ['Entendido','4'])
    }

    empty_boost() {
      let progress_value = parseInt(this.sun_counter_boost.value,10)
      this.player_reaction_time_out= setInterval(() => { 
                                        progress_value -= this.sun_counter_boost_initial_value/this.sun_counter_boost_gracetime;
                                        this.sun_counter_boost.value = `${progress_value}`;
                                      }, 1000);
  
    }
    
    update_sun_counter () {
      clearInterval(this.player_reaction_time_out);
      let sun_counter_progress = parseInt(this.sunCounter.value,10);
      sun_counter_progress += parseInt(this.sun_counter_boost.value, 10);
      this.sunCounter.value = `${sun_counter_progress}`;
      this.sun_counter_filling.innerHTML = `${sun_counter_progress}%`;
      this.sun_counter_boost.value = `${this.sun_counter_boost_initial_value}`;
    }
    /*
    actionOfSunPath(){
      this.sunCounter.value = "100";
      if(this.sunCounter.value != "100"  ){
          currentSunPosition+=1;
          currentCell= this.sunpath.rows[0].cells[currentSunPosition];
          currentCell.appendChild(this.sun);
      }
    }*/
  }