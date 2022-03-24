import express from 'express'

import * as controller from '../controller/carritos.js';
import passport from '../controller/passport.js';

const CarritoRoutes = express.Router()

// GET: Me devuelve el carrito de usuario autenticado, si no existe se crea
CarritoRoutes.get('/',passport.authenticate('jwt', { session: false }), controller.obtener);

// DELETE: elimina el carrito del usuario autenticado.
CarritoRoutes.delete('/',passport.authenticate('jwt', { session: false }), controller.eliminar);

// POST: '/productos' - Para incorporar productos al carrito por su id de producto y la cantidad de items
CarritoRoutes.post('/productos/',passport.authenticate('jwt', { session: false }), controller.mdwValidarAddProducto, controller.agregarProducto);

// DELETE: '/productos/' - Eliminar un producto del carrito por id de producto
CarritoRoutes.delete('/productos/',passport.authenticate('jwt', { session: false }), controller.mdwValidarDelProducto, controller.quitarProducto);


export default  CarritoRoutes;