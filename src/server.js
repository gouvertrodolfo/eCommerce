const express = require('express')


// const { apiSeguridad } = require("./routers/seguridad")
const { apiProductos } = require("./routers/productos")
// const { apiCarrito } = require("./routers/Carrito")


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use('/', apiSeguridad)
app.use('/productos', apiProductos)
app.use('/carrito', apiCarrito)









const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
