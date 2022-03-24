import express, { json, urlencoded } from 'express'
import passport from './controller/passport.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import {SwaggerOptions} from './../config/config.js'
import { failRoute } from "./routes/default.js"

import routesCarrito from "./routes/carritos.js"
import routesProductos from "./routes/productos.js"
import routesUsuarios from './routes/usuarios.js'
import routesOrdenes from './routes/ordenes.js'
import routesweb from './routes/weblogin.js'

import morgan from 'morgan';

/**************************************************************************************** */

const app = express()

app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: true }))
//Configuracion del motor de vistas que se usara
app.set('view engine', 'ejs')

/**************************************************************************************** */

app.use(passport.initialize());

app.use(morgan())
/**************************************************************************************** */


import HttpServer from 'http'
import {IOServer} from 'socket.io'
/**************************************************************************************** */

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

import {getInstancia}  from './socket.js'
getInstancia(io)



// rutas apiRestFull
app.use('/', routesweb)

app.use('/api', routesUsuarios)
app.use('/api/productos', routesProductos)
app.use('/api/carrito', routesCarrito)
app.use('/api/ordenes', routesOrdenes)

/**************************************************************************************** */
const swaggerSpecs = swaggerJsdoc(SwaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**************************************************************************************** */

//rutas no encontrada
app.use('/*', failRoute)


export default app

