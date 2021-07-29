import Game from './game.js';
import ClientSocket from './client_socket.js'

function main() {
    console.log(window.sessionStorage.getItem('i_am_host'));
    if(window.sessionStorage.getItem('i_am_host') === '1'){
        const connection_message = JSON.stringify({type: "begin" , 
                        sc_grace: window.sessionStorage.getItem('sun_counter_gracetime'),
                        ss_grace: window.sessionStorage.getItem('simon_says_gracetime'),
                        scb_value: window.sessionStorage.getItem('sun_counter_slider'),
                        session_id: window.sessionStorage.getItem('session_id')
                    });
        const client_socket = new ClientSocket('172.16.202.55' , 8000 , connection_message);
    }
    const game = new Game();
    const nickname = window.sessionStorage.getItem('jugadorId');
    const avatar = window.sessionStorage.getItem('selectionofAvatars');

    const player1Name = document.getElementById('player1Name');//Name of player
    const avatarJugador1 = document.getElementById('player1Avatar');//Avatar at the side of the name of the player
   
    player1Name.innerHTML=nickname;
    avatarJugador1.src= avatar ;
}

window.addEventListener('load', main);
