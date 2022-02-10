import express from 'express'
const routesProductos = express.Router()
import {isAuth, Admin} from './middelware/PassportLocal.js'
import {mwdProductoValido} from './middelware/productos.js'
import * as controller from  '../controller/productos.js'
/* ------------------------------------------------------ */

// a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
routesProductos.get('/', controller.listar);

// GET '/api/productos/:id' -> devuelve un producto según su id.
routesProductos.get('/:productoId', controller.buscar);

// b. POST: '/' - Para incorporar productos al listado (disponible para administradores)
routesProductos.post('/', isAuth, Admin, mwdProductoValido, controller.crear);

// c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
routesProductos.put('/:productoId', isAuth, Admin, controller.actualizar);

// d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
routesProductos.delete('/:productoId', isAuth, Admin, controller.borrar);

export default routesProductos;