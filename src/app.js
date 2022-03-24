import logger from './logger.js'
import app from './server.js'
import config from '../config/config.js'

const PORT = config.PORT

import { createServer } from "http";
import { Server } from 'socket.io'
/**************************************************************************************** */

const httpServer = createServer(app);
const io = new Server(httpServer)


import MySocket from './socket.js';
const mySocket = new MySocket(io)
mySocket.on()

/**************************************************************************************** */

const server = httpServer.listen(PORT, () => {
    logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
})



server.on("error", error => logger.error(`Error en servidor ${error}`))

