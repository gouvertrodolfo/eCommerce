import { Router } from 'express'
import { passport } from '../controller/passport.js'

import { responseToken, getfailloginController, getfailsignupController, getlogoutController } from '../controller/usuarios.js'

const LoginRoutes = new Router();


LoginRoutes.post('/login', passport.authenticate('login', {session: false, failureRedirect: '/faillogin' }), responseToken);
LoginRoutes.post('/signup', passport.authenticate('signup', {session: false, failureRedirect: '/failsignup' }), responseToken)

LoginRoutes.get('/faillogin', getfailloginController)
LoginRoutes.get('/failsignup', getfailsignupController)

LoginRoutes.get('/logout', getlogoutController)

export { LoginRoutes }



