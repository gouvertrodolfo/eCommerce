import express from 'express'

import * as ctrl from '../controller/carrito.js';
import passport from '../controller/passport.js';

const CarritoRoutes = express.Router()
// a. POST: '/' - Crea un carrito y devuelve su id.
CarritoRoutes.post('/',passport.authenticate('jwt', { session: false }), ctrl.crear);

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
CarritoRoutes.delete('/',passport.authenticate('jwt', { session: false }), ctrl.borrar);

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
CarritoRoutes.get('/productos',passport.authenticate('jwt', { session: false }), ctrl.listaProductos);

// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
CarritoRoutes.post('/productos/:id_prod',passport.authenticate('jwt', { session: false }), ctrl.agregarProducto);

// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
CarritoRoutes.delete('/productos/:id_prod',passport.authenticate('jwt', { session: false }), ctrl.quitarProducto);


export default  CarritoRoutes;