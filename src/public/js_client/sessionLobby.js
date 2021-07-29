import ClientSocket from './client_socket.js'
//Identifica y guarda el valor de configuraciones del lobby
const port = 3000;
const ip = 'localhost';
const connection_message = JSON.stringify({type: 'create_session'
                                          ,host: window.localStorage.getItem('jugadorId'
                                            )
                                          ,icon: window.localStorage.getItem('selectionofAvatars')
                                        });
const client_socket = new ClientSocket(ip , port , connection_message);
client_socket.addEventListener('message', (event) => {
    process_message(event.data);
});

//ToDo: Find a way to not make redundant code in switches.
function process_message(message) {
    const message_from_server = JSON.parse(message);
    switch(message_from_server.type) {
        case 'new_guest':
            //display new guest icon and name
            break;

        case 'player_left':
            //remove guest icon and name
            break;

        case 'new_lobby':
            window.localStorage.setItem('my_session_id',message_from_server.session_id);
            console.log(`${message_from_server.session_id}`);
            break;
    }

}

function sessionMain() {
    //Al inicio revisara el nombre asignado
    const playerName = document.getElementById('jugadorId');
    
    //Al inicio revisara la seleccion de avatar en home page para asignar la imagen
    const avatarJugador1 = document.getElementById('avatarJugador1');
   

    console.assert(avatarJugador1);
    avatarJugador1.src = window.localStorage.getItem('selectionofAvatars');


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

    const conf1 = window.localStorage.getItem('sun_counter_gracetime');
    const conf2 = window.localStorage.getItem('sun_counter_slider');
    const conf3 = window.localStorage.getItem('simon_says_gracetime');
    const conf4 = window.localStorage.getItem('simon_says_steps');
    const conf5 = window.localStorage.getItem('punishment_losing_sun_counter_boost');
    const conf6 = window.localStorage.getItem('punishment_sun_step');
    const conf7 = window.localStorage.getItem('punishment_losing_turn');


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
        window.localStorage.setItem('sun_counter_gracetime',sunCounterGracetime.value);
    })

    sunCounterSlider.addEventListener('input', () =>{
        window.localStorage.setItem('sun_counter_slider',sunCounterSlider.value);
    })

    simonSaysGracetime.addEventListener('input', () =>{
        window.localStorage.setItem('simon_says_gracetime',simonSaysGracetime.value);
    })

    simonSaysSteps.addEventListener('input', () =>{
        window.localStorage.setItem('simon_says_steps',simonSaysSteps.value);
    })

    punishmentLosingSunCounterBoost.addEventListener('input', () =>{
        window.localStorage.setItem('punishment_losing_sun_counter_boost',punishmentLosingSunCounterBoost.value);
    })

    punishmentSunStep.addEventListener('input', () =>{
        window.localStorage.setItem('punishment_sun_step',punishmentSunStep.value);
    })

    punishmentLosingTurn.addEventListener('input', () =>{
        window.localStorage.setItem('punishment_losing_turn',punishmentLosingTurn.value);
    })
   
}

window.addEventListener('load', sessionMain);
