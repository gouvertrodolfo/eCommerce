import { Router } from 'express'
import passport from '../controller/passport.js'

import * as UserController from '../controller/usuarios.js'

const routesUsuarios = new Router();

routesUsuarios.post('/login', 
    passport.authenticate('login', { session: false, failureRedirect: '/faillogin' }),
    UserController.postlogin);

routesUsuarios.post('/signup',
    UserController.mdwValidaUser, passport.authenticate('signup', { session: false, failureRedirect: '/failsignup' }),
    UserController.postlogin)

routesUsuarios.get('/faillogin',
    UserController.getfailloginController)

    routesUsuarios.get('/failsignup',
    UserController.getfailsignupController)

routesUsuarios.post('/usuarios/role',
    UserController.postRole)

routesUsuarios.delete('/usuarios/role',
    UserController.deleteRole)

export default routesUsuarios



