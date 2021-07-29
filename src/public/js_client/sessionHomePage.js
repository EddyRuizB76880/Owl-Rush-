function sessionMain() {
    window.sessionStorage.clear();
    //Identifica y guarda el valor del input para el nombre del jugador y seleccción de avatar
    const nickNameElement = document.getElementById('jugadorId');
    const avatarElement = document.getElementById('selectionofAvatars');
    const session_id_element = document.getElementById('session_id');

    window.sessionStorage.setItem('jugadorId' , nickNameElement.value);
    window.sessionStorage.setItem('selectionofAvatars' , avatarElement.value);
    window.sessionStorage.setItem('session_id', session_id_element.value);

    console.assert(nickNameElement);
    console.assert(avatarElement);
    console.assert(session_id);


    nickNameElement.addEventListener('input', set_id);
    avatarElement.addEventListener('change', set_icon);
    session_id_element.addEventListener('input', set_session);
}

function set_id(e) {
    window.sessionStorage.setItem('jugadorId' , e.target.value);
}

function set_icon(e) {
    window.sessionStorage.setItem('selectionofAvatars', e.target.value);
}

function set_session(e) {
    window.sessionStorage.setItem('session_id', e.target.value);
}

window.addEventListener('load', sessionMain);
