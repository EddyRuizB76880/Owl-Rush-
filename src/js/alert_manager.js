export default class AlertManager {
    constructor() {
      this.alert_section = document.getElementById('player_alerts');
    }
  // Message is the message to be displayed to the user, img is the route to an image to be placed
  // ...buttons are the variable number of buttons to be displayed on the alert. Each button is an 
  // array of values, the first one is the innerHTML of the button to be created, the second is a way
  // to let the manager know which method to add to the buttons event listener, to be created...
    alert_player(message , img , ...buttons) {
      let new_alert , new_button , index;
      if (img != null){}
      new_alert = document.createElement('h2');
      new_alert.innerHTML = `${message}`;
      this.alert_section.appendChild(new_alert);
      if (buttons.length > 0){
        index = 0;
        for(index ; index < buttons.length ; index++){
          new_button = document.createElement ('button');
          new_button.innerHTML = `${buttons[index]}`;
          new_button.addEventListener('click', ()=> {this.dismiss();});
          this.alert_section.appendChild(new_button);
        }
      }
      this.alert_section.style.display = 'grid';
  
    }
  
    dismiss() {
      this.alert_section.style.display = 'none';
      // Code taken from JavaScript Tutorial online website. Available at :
      // https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
      while (this.alert_section.firstChild) {
        this.alert_section.removeChild(this.alert_section.firstChild);
      }
    }
  }