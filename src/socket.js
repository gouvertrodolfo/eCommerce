/**************************************************************************************** */
import ChatApi from './api/ChatApi.js'
const chat = new ChatApi();
/**************************************************************************************** */

export default class MySocket {

    constructor(io) {
        this.io = io;
    };

    on() {
        this.io.on('connection', async socket => {
            let mensajes = await chat.getAll();

            /* Envio los mensajes al cliente que se conectó */
            socket.emit('mensajes', mensajes)

            /* Escucho los mensajes enviado por el cliente y se los propago a todos */
            socket.on('nuevoMensaje', async data => {

                mensajes = await chat.AddMensaje(data)
                this.io.sockets.emit('mensajes', mensajes)
            })

        })
    }

}

