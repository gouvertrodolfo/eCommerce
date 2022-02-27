import express from 'express'
const ProductosRoutes = express.Router()
import {passport,  isAdmin} from '../controller/Passport.js'
import * as controller from  '../controller/productos.js'
/* ------------------------------------------------------ */

// a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
ProductosRoutes.get('/', controller.listar);

// GET '/api/productos/:id' -> devuelve un producto según su id.
ProductosRoutes.get('/:productoId', controller.buscar);

// b. POST: '/' - Para incorporar productos al listado (disponible para administradores)
ProductosRoutes.post('/', passport.authenticate('jwt', { session: false }), isAdmin,  controller.crear);

// c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
ProductosRoutes.put('/:productoId', passport.authenticate('jwt', { session: false }), isAdmin, controller.actualizar);

// d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
ProductosRoutes.delete('/:productoId', passport.authenticate('jwt', { session: false }), isAdmin, controller.borrar);

export default ProductosRoutes;