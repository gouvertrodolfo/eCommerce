import express, { json, urlencoded } from 'express'
import session from 'express-session'
import { passport } from './controller/passport.js'
import CarritoRoute from "./routes/carritos.js"
import routesProductos from "./routes/productos.js"
import { failRoute } from "./routes/default.js"
import { LoginRoutes } from './routes/autenticacion.js'

const app = express()

app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: true }))

/**************************************************************************************** */
import MongoStore from 'connect-mongo'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(session({
    /* ------------------------------------------------------------ */
    /*           Persistencia por mongo altlas database             */
    /* ------------------------------------------------------------ */
    store: MongoStore.create({
        //En Atlas connect App :  Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb://user:us3r@cluster0-shard-00-00.3svtz.mongodb.net:27017,cluster0-shard-00-01.3svtz.mongodb.net:27017,cluster0-shard-00-02.3svtz.mongodb.net:27017/eCommerce?ssl=true&replicaSet=atlas-3m6b86-shard-0&authSource=admin&retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    /* ------------------------------------------------------------ */

    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 100000
    }
}))

/**************************************************************************************** */
app.use(passport.initialize());
// app.use(passport.session());
/**************************************************************************************** */

// rutas apiRestFull
app.use('/api/', LoginRoutes)
app.use('/api/productos', routesProductos)
app.use('/api/carrito', CarritoRoute)

// rutas plantillas
app.use('/')
app.use('/login')

//rutas no encontrada
app.use('/*', failRoute)

export default app

