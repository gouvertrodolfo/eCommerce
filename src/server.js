import express, {  json, urlencoded } from 'express'

// const { apiSeguridad } = require("./routers/seguridad")
import  apiCarritos  from "./routers/carritos.js"
import  apiProductos  from "./routers/productos.js"
import logger from './logger.js'

import dotenv from 'dotenv';
dotenv.config()



const app = express()

app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/productos', apiProductos)
app.use('/carrito', apiCarritos)


const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => logger.error(`Error en servidor ${error}`))

