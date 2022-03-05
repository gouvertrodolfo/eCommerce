import express, { json, urlencoded } from 'express'
import passport from './controller/passport.js'
import routesCarrito from "./routes/carritos.js"
import routesProductos from "./routes/productos.js"
import { failRoute } from "./routes/default.js"
import routesAutenticacion from './routes/autenticacion.js'

const app = express()

app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: true }))
//Configuracion del motor de vistas que se usara
app.set('view engine', 'ejs')


/**************************************************************************************** */
app.use(passport.initialize());
/**************************************************************************************** */

// rutas apiRestFull
app.use('/', routesAutenticacion)
app.use('/api/productos', routesProductos)
app.use('/api/carrito', routesCarrito)


//rutas no encontrada
app.use('/*', failRoute)

export default app

