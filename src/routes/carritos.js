import express from 'express'
import * as ctrl from '../controller/carrito.js'


const CarritoRoutes = express.Router()
// a. POST: '/' - Crea un carrito y devuelve su id.
CarritoRoutes.post('/', ctrl.crear);

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
CarritoRoutes.delete('/:id', ctrl.borrar);

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
CarritoRoutes.get('/:id/productos', ctrl.listaProductos);

// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
CarritoRoutes.post('/:id/productos/:id_prod', ctrl.agregarProducto);

// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
CarritoRoutes.delete('/:id/productos/:id_prod', ctrl.quitarProducto);

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
CarritoRoutes.post('/:id', ctrl.finalizar);

export default  CarritoRoutes;