import { Router } from 'express'
import { passport } from '../controller/PassportLocal.js'

import { postLoginController, postSignupController, getfailloginController, getfailsignupController, getlogoutController } from '../controller/usuarios.js'

const LoginRoutes = new Router();


LoginRoutes.post('/login', passport.authenticate('login', {session: false, failureRedirect: '/faillogin' }), postLoginController);
LoginRoutes.post('/signup', passport.authenticate('signup', {session: false, failureRedirect: '/failsignup' }), postSignupController)

LoginRoutes.get('/faillogin', getfailloginController)
LoginRoutes.get('/failsignup', getfailsignupController)

LoginRoutes.get('/logout', getlogoutController)

export { LoginRoutes }



