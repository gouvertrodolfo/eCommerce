import { Router } from 'express'
import passport from '../controller/passport.js'

import * as UserController from '../controller/usuarios.js'

const routesUsuarios = new Router();

// POST '/login' -> autenticacion de un usuario en el body se envia el email y contraseña, retorna el jwt para acceder a las rutas autenticadas
routesUsuarios.post('/login',
    passport.authenticate('login', { session: false, failureRedirect: '/faillogin' }),
    UserController.postlogin);

// POST '/signup' -> Crea y Autentica un nuevo usuario en el body se envia todoslos datos, retorna el jwt para acceder a las rutas autenticadas 
routesUsuarios.post('/signup',
    UserController.mdwValidaUser,
    passport.authenticate('signup', { session: false, failureRedirect: '/failsignup' }),
    UserController.postlogin)

// GET '/faillogin' -> ruta de redireccionamiento cuando falla el login
routesUsuarios.get('/faillogin',
    UserController.getfailloginController)

// GET '/failsignup' -> ruta de redireccionamiento cuando falla el signup
routesUsuarios.get('/failsignup',
    UserController.getfailsignupController)

// POST '/usuarios/role' -> Agrega roles para a un usuario para ser Admin se le debe agregar el role correspondiente (disponible para administradores)
routesUsuarios.post('/usuarios/role',
    passport.authenticate('jwt', { session: false }),
    UserController.mdwIsAdmin,
    UserController.postRole)

// DELERE '/usuarios/role' -> Elimina un role de un usuario indicado en el body (disponible para administradores)
routesUsuarios.delete('/usuarios/role',
    passport.authenticate('jwt', { session: false }),
    UserController.mdwIsAdmin,
    UserController.deleteRole)

export default routesUsuarios



