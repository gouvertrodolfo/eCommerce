import express from 'express'
import passport from '../controller/passport.js'
import { mdwIsAdmin } from '../controller/usuarios.js'
import * as controller from  '../controller/productos.js'
/* ------------------------------------------------------ */

const routesProductos = express.Router()

// a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
routesProductos.get('/', controller.listar);

// GET '/api/productos/:id' -> devuelve un producto según su id.
routesProductos.get('/:productoId', controller.buscar);

// b. POST: '/' - Para incorporar productos al listado (disponible para administradores)
routesProductos.post('/', passport.authenticate('jwt', { session: false }), mdwIsAdmin,  controller.crear);

// c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
routesProductos.put('/', passport.authenticate('jwt', { session: false }), mdwIsAdmin, controller.actualizar);

// d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
routesProductos.delete('/:productoId', passport.authenticate('jwt', { session: false }), mdwIsAdmin, controller.borrar);

export default routesProductos;