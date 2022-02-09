import express from 'express'
const apiCarritos = express.Router()

import * as ctrl from '../controller/carrito.js'
import {mdwObtenerProducto} from '../controller/productos.js'
import {mdwObtenerCarrito} from './middelware/carritos.js'
// import {mdwObtenerProducto} from './middelware/productos'


// a. POST: '/' - Crea un carrito y devuelve su id.
apiCarritos.post('/', ctrl.crear);

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
apiCarritos.delete('/:id', ctrl.borrar);

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
apiCarritos.get('/:id/productos', ctrl.listaProductos);

// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
apiCarritos.post('/:id/productos/:id_prod', mdwObtenerCarrito, mdwObtenerProducto, ctrl.agregarProducto);

// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
apiCarritos.delete('/:id/productos/:id_prod', mdwObtenerCarrito, ctrl.quitarProducto);


export default  apiCarritos;