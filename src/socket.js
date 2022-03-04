/**************************************************************************************** */
const Chat = require('../api/Chat')
const chat = new Chat();
/**************************************************************************************** */

class mySocket{

    constructor(io) {

        this.io = io

    };

    CrearInstancia() {

        // Definimos un esquema de mensaje
        const mensajes_schema = new schema.Array(mensaje_schema);

        this.io.on('connection', async socket => {

            console.log('Nuevo cliente conectado!')

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


module.exports = { getInstancia }
