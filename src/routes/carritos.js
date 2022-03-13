import express from 'express'

import * as controller from '../controller/carrito.js';
import passport from '../controller/passport.js';

const CarritoRoutes = express.Router()

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
CarritoRoutes.get('/',passport.authenticate('jwt', { session: false }), controller.obtener);

// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
CarritoRoutes.post('/productos/',passport.authenticate('jwt', { session: false }), controller.mdwValidarProducto, controller.agregarProducto);

// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
CarritoRoutes.delete('/productos/:id_prod',passport.authenticate('jwt', { session: false }), controller.mdwValidarProducto, controller.quitarProducto);

export default  CarritoRoutes;