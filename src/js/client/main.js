
import Game from './game.js';
function main() {
    const game = new Game();
    //game.setup

    //Se asigna para un jugador la selección de nombre y avatar

    const nickname = window.localStorage.getItem('jugadorId');
    const avatar = window.localStorage.getItem('selectionofAvatars');

    const player1Name = document.getElementById('player1Name');//Name of player
    const avatarJugador1 = document.getElementById('player1Avatar');//Avatar at the side of the name of the player
    const jugador1 = document.getElementById('Player1');//Token of player

    player1Name.innerHTML=nickname;
    
    //Se verifica y asigna el avatar seleccionado  *tal vez sirva más guardar y llamar las imagenes desde localStorage
    if(avatar == "buffalo"){
        avatarJugador1.src= "img/048-buffalo.svg" ;
        jugador1.src= "img/048-buffalo.svg" ;
    }

    if(avatar == "tigre"){
        avatarJugador1.src= "img/050-tiger-1.svg" ;
        jugador1.src= "img/050-tiger-1.svg" ;
    }

    if(avatar == "ardilla"){
        avatarJugador1.src= "img/003-chipmunk.svg" ;
        jugador1.src= "img/003-chipmunk.svg" ;
    }
}

window.addEventListener('load', main);
