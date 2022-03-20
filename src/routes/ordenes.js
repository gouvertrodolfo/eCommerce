import express from 'express'

import * as ctrl from '../controller/ordenes.js';
import passport from '../controller/passport.js';

const routesOrdenes = express.Router()

/* GET lista de ordenes del usuario. */
routesOrdenes.get('/',
    passport.authenticate('jwt', { session: false }),
    ctrl.obtener);

/* POST ordenes listing. */
routesOrdenes.post('/',
    passport.authenticate('jwt', { session: false }),
    ctrl.agregar);

export default routesOrdenes;
