import express, {  json, urlencoded } from 'express'

// const { apiSeguridad } = require("./routers/seguridad")
import  apiCarritos  from "./routers/carritos.js"
import { apiProductos } from "./routers/productos.js"

const app = express()

app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: true }))

// app.use('/', apiSeguridad)s
app.use('/productos', apiProductos)
app.use('/carrito', apiCarritos)

const PORT = process.env.PORT || 8080


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

