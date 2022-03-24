import express from 'express'

import * as ctrl from '../controller/ordenes.js';
import passport from '../controller/passport.js';

const routesOrdenes = express.Router()

//GET '/' - > lista de ordenes del usuario logeado.
routesOrdenes.get('/',
    passport.authenticate('jwt', { session: false }),
    ctrl.obtener);

//POST '/' Crea una nueva orden en base a lo que el usuario logeado tiene en el carrito.
routesOrdenes.post('/',
    passport.authenticate('jwt', { session: false }),
    ctrl.agregar);

export default routesOrdenes;
