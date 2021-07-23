function sessionMain() {

    //Identifica y guarda el valor del input para el nombre del jugador
    const nickNameElement = document.getElementById('jugadorId');
    console.assert(nickNameElement);
    const nickname = window.localStorage.getItem('jugadorId');

    if(nickname){
        nickNameElement.value= nickname;
    }
    
    nickNameElement.addEventListener('input', () =>{
        window.localStorage.setItem('jugadorId',nickNameElement.value);
    })

}

window.addEventListener('load', sessionMain);
