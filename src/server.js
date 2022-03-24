import express, { json, urlencoded } from 'express'
import passport from './controller/passport.js'

import { failRoute } from "./routes/default.js"
import routesCarrito from "./routes/carritos.js"
import routesProductos from "./routes/productos.js"
import routesUsuarios from './routes/usuarios.js'
import routesOrdenes from './routes/ordenes.js'
import routesweb from './routes/web.js'


/**************************************************************************************** */

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
app.use('/', routesweb)

app.use('/api', routesUsuarios)
app.use('/api/productos', routesProductos)
app.use('/api/carrito', routesCarrito)
app.use('/api/ordenes', routesOrdenes)

/**************************************************************************************** */

//rutas no encontrada
app.use('/*', failRoute)

export default app

