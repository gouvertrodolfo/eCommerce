import express from 'express'
const CarritoRoute = express.Router()

import * as ctrl from '../controller/carrito.js'

// a. POST: '/' - Crea un carrito y devuelve su id.
CarritoRoute.post('/', ctrl.crear);

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
CarritoRoute.delete('/:id', ctrl.borrar);

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
CarritoRoute.get('/:id/productos', ctrl.listaProductos);

// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
CarritoRoute.post('/:id/productos/:id_prod', ctrl.agregarProducto);

// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
CarritoRoute.delete('/:id/productos/:id_prod', ctrl.quitarProducto);

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
CarritoRoute.post('/:id', ctrl.pagar);


export default  CarritoRoute;