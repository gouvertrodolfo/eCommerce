import express from 'express'
const routesCarritos = express.Router()

import * as ctrl from '../controller/carrito.js'
import {mdwObtenerProducto} from '../controller/productos.js'
import {mdwObtenerCarrito} from './middelware/carritos.js'
// import {mdwObtenerProducto} from './middelware/productos'


// a. POST: '/' - Crea un carrito y devuelve su id.
routesCarritos.post('/', ctrl.crear);

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
routesCarritos.delete('/:id', ctrl.borrar);

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
routesCarritos.get('/:id/productos', ctrl.listaProductos);

// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
routesCarritos.post('/:id/productos/:id_prod', ctrl.agregarProducto);

// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
routesCarritos.delete('/:id/productos/:id_prod', ctrl.quitarProducto);

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
routesCarritos.post('/:id', ctrl.pagar);


export default  routesCarritos;