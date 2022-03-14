import express from 'express'

import * as controller from '../controller/carritos.js';
import passport from '../controller/passport.js';

const CarritoRoutes = express.Router()

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
CarritoRoutes.get('/',passport.authenticate('jwt', { session: false }), controller.obtener);

CarritoRoutes.delete('/',passport.authenticate('jwt', { session: false }), controller.eliminar);


// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
CarritoRoutes.post('/productos/',passport.authenticate('jwt', { session: false }), controller.mdwValidarAddProducto, controller.agregarProducto);

// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
CarritoRoutes.delete('/productos/',passport.authenticate('jwt', { session: false }), controller.mdwValidarDelProducto, controller.quitarProducto);


export default  CarritoRoutes;