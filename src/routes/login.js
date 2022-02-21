import { Router } from 'express'
import { passport } from './middelware/PassportLocal.js'

import { postLoginController, postSignupController, getfailloginController, getfailsignupController, getlogoutController } from '../controller/usuarios.js'

const LoginRoutes = new Router();

LoginRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), postLoginController);
LoginRoutes.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), postSignupController)

LoginRoutes.get('/faillogin', getfailloginController)
LoginRoutes.get('/failsignup', getfailsignupController)

LoginRoutes.get('/logout', getlogoutController)

export { LoginRoutes as routerLogin }
