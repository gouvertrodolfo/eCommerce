import { Router } from 'express'
import passport from '../controller/passport.js'

import { responseToken, getfailloginController, getfailsignupController, getlogoutController } from '../controller/usuarios.js'

const routesAutenticacion = new Router();


routesAutenticacion.post('/login',  passport.authenticate('login', {session: false, failureRedirect: '/faillogin' }), responseToken);

routesAutenticacion.post('/signup', passport.authenticate('signup', {session: false, failureRedirect: '/failsignup' }), responseToken)

routesAutenticacion.get('/faillogin', getfailloginController)
routesAutenticacion.get('/failsignup', getfailsignupController)

routesAutenticacion.get('/logout', getlogoutController)

export default routesAutenticacion 



