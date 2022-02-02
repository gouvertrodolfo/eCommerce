import express, { json, urlencoded } from 'express'
import session from 'express-session'
import { passport } from './routers/middelware/PassportLocal.js'
import apiCarritos from "./routers/carritos.js"
import apiProductos from "./routers/productos.js"
import { failRoute } from "./routers/default.js"
import { routerLogin } from './routers/login.js'
import logger from './logger.js'

import dotenv from 'dotenv';
dotenv.config()

const app = express()

app.use(express.static('public'))
app.use(json())
app.use(urlencoded({ extended: true }))




/**************************************************************************************** */
import  MongoStore from 'connect-mongo'
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
        maxAge: 600000
    }
}))

/**************************************************************************************** */

app.use(passport.initialize());
app.use(passport.session());

/**************************************************************************************** */

app.use('/', routerLogin)


app.use('/productos', apiProductos)
app.use('/carrito', apiCarritos)
app.use('/*', failRoute)


const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => logger.error(`Error en servidor ${error}`))

