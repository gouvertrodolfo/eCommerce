import { Router } from 'express'
import { passport } from '../controller/passport.js'

import { getlogin, getInicio, getfaillogin, getfailSignup, getlogoutController } from '../controller/usuariosWeb.js'
import { responseToken } from '../controller/usuarios.js'

const LoginWebRoutes = new Router();


LoginWebRoutes.get('/login', getlogin)
LoginWebRoutes.post('/login', passport.authenticate('login', {session: false, failureRedirect: '/faillogin' }), responseToken, getInicio);
LoginWebRoutes.post('/signup', passport.authenticate('signup', {session: false, failureRedirect: '/failsignup' }), responseToken, getInicio)

LoginWebRoutes.get('/faillogin', getfaillogin)
LoginWebRoutes.get('/failsignup', getfailSignup)

LoginWebRoutes.get('/logout', getlogoutController)

export { LoginWebRoutes }



