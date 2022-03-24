import express from 'express'
import passport from '../controller/passport.js'
import { mdwIsAdmin } from '../controller/usuarios.js'
import * as controller from '../controller/productos.js'
/* ------------------------------------------------------ */


const routesProductos = express.Router()

// GET '/'  ->  Me permite listar todos los productos disponibles 
routesProductos.get('/', controller.listar);

// GET '/:id' -> devuelve un producto según su id.
routesProductos.get('/:id', controller.buscar);

// POST: '/' -> Para incorporar productos al listado (disponible para administradores)
routesProductos.post('/', passport.authenticate('jwt', { session: false }), mdwIsAdmin, controller.crear);

// PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
routesProductos.put('/', passport.authenticate('jwt', { session: false }), mdwIsAdmin, controller.actualizar);

// DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
routesProductos.delete('/:id', passport.authenticate('jwt', { session: false }), mdwIsAdmin, controller.borrar);

export default routesProductos;