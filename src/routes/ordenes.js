import express from 'express'

import * as ctrl from '../controller/ordenes.js';
import passport from '../controller/passport.js';

const routesOrdenes = express.Router()

routesOrdenes.get('/', passport.authenticate('jwt', { session: false }), ctrl.finalizar);   
routesOrdenes.post('/', passport.authenticate('jwt', { session: false }), ctrl.finalizar);   

export default  routesOrdenes;
