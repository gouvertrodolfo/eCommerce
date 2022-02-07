import express from 'express'
const apiProductos = express.Router()
import {isAuth, Admin} from './middelware/PassportLocal.js'
import {mwdProductoValido} from './middelware/productos.js'
import {listarTodo, buscarxId, crear, actualizar, borrar} from '../controller/productos.js'

/* ------------------------------------------------------ */

// a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
apiProductos.get('/', listarTodo);

// GET '/api/productos/:id' -> devuelve un producto según su id.
apiProductos.get('/:id', buscarxId);

// b. POST: '/' - Para incorporar productos al listado (disponible para administradores)
apiProductos.post('/', isAuth, Admin, mwdProductoValido, crear);

// c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
apiProductos.put('/:id', isAuth, Admin, actualizar);

// d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
apiProductos.delete('/:id', isAuth, Admin, borrar);

export default apiProductos ;