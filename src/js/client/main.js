
import Game from './game.js';
function main() {
    const game = new Game();
    //game.setup


    const nickname = window.localStorage.getItem('selectionofAvatars');

    const avatarJugador1 = document.getElementById('player1Avatar');
    
    if(nickname == "buffalo"){
        avatarJugador1.src= "img/048-buffalo.svg" ;
    }

    if(nickname == "tigre"){
        avatarJugador1.src= "img/050-tiger-1.svg" ;
    }

    if(nickname == "ardilla"){
        avatarJugador1.src= "img/003-chipmunk.svg" ;
    }
}

window.addEventListener('load', main);
