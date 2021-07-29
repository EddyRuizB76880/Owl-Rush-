import ClientSocket from './client_socket.js'
//Identifica y guarda el valor de configuraciones del lobby
const ip = window.location.host;
const port = 8085;
//Aquí para crear invitados en lobby.
const player_list = [];
const player_icons = [];
const host_connection_message = JSON.stringify({type: 'create_session'
                                          ,id: `${window.sessionStorage.getItem('jugadorId')}`
                                          ,icon: `${window.sessionStorage.getItem('selectionofAvatars')}`
                                        });

const guest_connection_message = JSON.stringify({type: 'new_guest'
                                          ,id: `${window.sessionStorage.getItem('jugadorId')}`
                                          ,icon: window.sessionStorage.getItem('selectionofAvatars')
                                          ,session_id: `${window.sessionStorage.getItem('session_id')}`
                                        });

let connection_message = guest_connection_message;
window.sessionStorage.setItem('i_am_host' , '0');
if (window.sessionStorage.getItem('session_id') === '-1') {
    connection_message = host_connection_message;
}
console.log(connection_message);
const client_socket = new ClientSocket(ip , port , connection_message);
client_socket.addEventListener('message', (event) => {
    process_message(event.data);
});

//ToDo: Find a way to not make redundant code in switches.
function process_message(message) {
    console.log(`${message}`);
    console.log(`I am ${window.sessionStorage.getItem('jugadorId')}, and my icon is ${window.sessionStorage.getItem('selectionofAvatars')}`);
    const message_from_server = JSON.parse(message);
    console.log(`${message_from_server.type}`);
    switch(message_from_server.type) {
        case 'new_guest':
            //display new guest icon and name
            new_guest(message_from_server);
            break;

        case 'player_left':
            //remove guest icon and 
            break;

        case 'guest_list':
            // ToDo:Display list of guests
           guest_list(message_from_server);
           break;
        case 'new_lobby':
            window.sessionStorage.removeItem('i_am_host');
            window.sessionStorage.setItem('i_am_host' , '1');
            window.sessionStorage.removeItem('session_id');
            window.sessionStorage.setItem('session_id',message_from_server.session_id);
            console.log(`The new id is${message_from_server.session_id}`);
            break;
        
        case 'begin':
            begin(message_from_server);
            break;
    }

}

function begin (message_from_server) {
     window.sessionStorage.setItem('sun_counter_gracetime',message_from_server.sc_grace);
     window.sessionStorage.setItem('simon_says_gracetime',message_from_server.ss_grace);
     window.sessionStorage.setItem('sun_counter_slider',message_from_server.scb_value);
     window.location.href = 'game_board.xhtml';
}

function new_guest(message_from_server) {
    player_icons.push(message_from_server.icon);
    player_list.push(message_from_server.id);
    window.sessionStorage.setItem('guests_info', 
                                JSON.stringify({icons: player_icons , guests: player_list}));
}

function guest_list(message_from_server){
    if(message_from_server.guest_list.length > 0) {
        let index = 0;
        for(index ; index < message_from_server.guest_list.length ; index++ ) {
          if(message_from_server.guest_list[index] !== window.sessionStorage.getItem('jugadorId')){
            player_list.push(message_from_server.guest_list[index]);}
            player_icons.push(message_from_server.icons[index]);
        }
        window.sessionStorage.setItem('guests_info', 
        JSON.stringify({icons: player_icons , guests: player_list}));
    }
}

function sessionMain() {
    //Al inicio revisara el nombre asignado
    const playerName = document.getElementById('jugadorId');
    
    //Al inicio revisara la seleccion de avatar en home page para asignar la imagen
    const avatarJugador1 = document.getElementById('avatarJugador1');
   

    console.assert(avatarJugador1);
    avatarJugador1.src = window.sessionStorage.getItem('selectionofAvatars');


    //Se mantiene la sesion de las configuraciones en el lobby
    const sunCounterGracetime = document.getElementById('sun_counter_gracetime');
    const sunCounterSlider = document.getElementById('sun_counter_slider');
    const simonSaysGracetime = document.getElementById('simon_says_gracetime');
    const simonSaysSteps = document.getElementById('simon_says_steps');

    const punishmentLosingSunCounterBoost = document.getElementById('punishment_losing_sun_counter_boost');
    const punishmentSunStep = document.getElementById('punishment_sun_step');
    const punishmentLosingTurn = document.getElementById('punishment_losing_turn');

    console.assert(sunCounterGracetime);
    console.assert(sunCounterSlider);
    console.assert(simonSaysGracetime);
    console.assert(simonSaysSteps);
    
    console.assert(punishmentLosingSunCounterBoost);
    console.assert(punishmentSunStep);
    console.assert(punishmentLosingTurn);

    const conf1 = window.sessionStorage.getItem('sun_counter_gracetime');
    const conf2 = window.sessionStorage.getItem('sun_counter_slider');
    const conf3 = window.sessionStorage.getItem('simon_says_gracetime');
    const conf4 = window.sessionStorage.getItem('simon_says_steps');
    const conf5 = window.sessionStorage.getItem('punishment_losing_sun_counter_boost');
    const conf6 = window.sessionStorage.getItem('punishment_sun_step');
    const conf7 = window.sessionStorage.getItem('punishment_losing_turn');

    /*if(nickname){
        nickNameElement.value= nickname;
    }*/

   sunCounterGracetime.value= conf1 ;
   sunCounterSlider.value= conf2 ;
   simonSaysGracetime.value= conf3 ;
   simonSaysSteps.value= conf4 ;
   

/*
   punishmentLosingSunCounterBoost.checked= conf5.checked ;
   punishmentSunStep.checked= conf6.checked ;
   punishmentLosingTurn.checked= conf7.checked ;
*/
   sunCounterGracetime.addEventListener('input', () =>{
        window.sessionStorage.setItem('sun_counter_gracetime',sunCounterGracetime.value);
    })

    sunCounterSlider.addEventListener('input', () =>{
        window.sessionStorage.setItem('sun_counter_slider',sunCounterSlider.value);
    })

    simonSaysGracetime.addEventListener('input', () =>{
        window.sessionStorage.setItem('simon_says_gracetime',simonSaysGracetime.value);
    })

    simonSaysSteps.addEventListener('input', () =>{
        window.sessionStorage.setItem('simon_says_steps',simonSaysSteps.value);
    })

    punishmentLosingSunCounterBoost.addEventListener('input', () =>{
        window.sessionStorage.setItem('punishment_losing_sun_counter_boost',punishmentLosingSunCounterBoost.value);
    })

    punishmentSunStep.addEventListener('input', () =>{
        window.sessionStorage.setItem('punishment_sun_step',punishmentSunStep.value);
    })

    punishmentLosingTurn.addEventListener('input', () =>{
        window.sessionStorage.setItem('punishment_losing_turn',punishmentLosingTurn.value);
    })
   
}

window.addEventListener('load', sessionMain);
