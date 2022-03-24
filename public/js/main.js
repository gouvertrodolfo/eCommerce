const socket = io.connect();

function addMessage(e) {

    const mensaje = {
            author: {
                correo: document.getElementById('correo').value,
            },
        text: document.getElementById('texto').value
    };
    document.getElementById('texto').value = ''
    socket.emit('nuevoMensaje', mensaje);
    return false;
}


socket.on('mensajes', async msjs => {
    /*********************************************************************************** */

    const plantilla = await buscarPlantillaMensajes()
    const html = armarHTML(plantilla, msjs)
    document.getElementById('messages').innerHTML = html;
});

function buscarPlantillaMensajes() {
    return fetch('/plantillas/mensaje.ejs')
        .then(respuesta => respuesta.text())
}

function armarHTML(plantilla, data) {
    const render = ejs.compile(plantilla);
    const html = render({ data })
    return html
}