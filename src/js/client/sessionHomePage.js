function sessionMain() {

    //Identifica y guarda el valor del input para el nombre del jugador y seleccción de avatar
    const nickNameElement = document.getElementById('jugadorId');
    const avatarElement = document.getElementById('selectionofAvatars');

    console.assert(nickNameElement);
    console.assert(avatarElement);

    const nickname = window.localStorage.getItem('jugadorId');
    const avatar = window.localStorage.getItem('selectionofAvatars');

    if(nickname){
        nickNameElement.value= nickname;
    }
    if(avatar){
        avatarElement.value= avatar;
    }

    nickNameElement.addEventListener('input', () =>{
        window.localStorage.setItem('jugadorId',nickNameElement.value);
    })

    avatarElement.addEventListener('change', () =>{
        window.localStorage.setItem('selectionofAvatars',avatarElement.value);
    })

}

window.addEventListener('load', sessionMain);
