import express from 'express'

import * as ctrl from '../controller/carrito.js';
import passport from '../controller/passport.js';

const routesOrdenes = express.Router()

routesOrdenes.post('/', passport.authenticate('jwt', { session: false }), ctrl.finalizar);   

export default  routesOrdenes;
