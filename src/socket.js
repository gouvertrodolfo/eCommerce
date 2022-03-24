/**************************************************************************************** */
import Chat from './api/Chat.js'
const chat = new Chat();
/**************************************************************************************** */

class mySocket{

    constructor(io) {
        this.io = io
    };

    CrearInstancia() {

        
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

function getInstancia(io) {
   
        if (!this.instance) {
            this.instance = new mySocket(io)
            this.instance.CrearInstancia();
            return this.instance;
        }
        else {
            return this.instance;
        }

    }


export { getInstancia }
