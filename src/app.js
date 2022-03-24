import logger from './logger.js'
import app from './server.js'
import config from '../config/config.js'

const PORT = config.PORT



import { createServer } from "http";
import {Server} from 'socket.io'
/**************************************************************************************** */

const httpServer  = createServer(app);
const io = new Server(httpServer)

/**************************************************************************************** */

import Chat from './api/Chat.js'
const chat = new Chat();

io.on('connection', async socket => {
    let mensajes = await chat.getAll();

    /* Envio los mensajes al cliente que se conectó */
    socket.emit('mensajes', mensajes)

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('nuevoMensaje', async data => {

        console.log('nuevoMensaje')
        console.log(data)
        mensajes = await chat.AddMensaje(data)
        io.sockets.emit('mensajes', mensajes)
    })

})









const server = httpServer.listen(PORT, () => {
    logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
})



server.on("error", error => logger.error(`Error en servidor ${error}`))

