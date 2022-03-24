import { Router } from 'express'
import passport from '../controller/passport.js'
import * as webController from '../controller/web.js'

const routesweb = new Router();

routesweb.get('/', webController.getInicio);

routesweb.get('/login', webController.getlogin);

routesweb.post('/login', 
    passport.authenticate('login', { session: false, failureRedirect: '/faillogin' }),
    webController.postlogin);


routesweb.get('/faillogin',
    webController.getfailloginController)

routesweb.post('/productos',
         passport.authenticate('signup', { session: false, failureRedirect: '/failsignup' }),
         webController.postlogin)
    

//     routesweblogin.get('/failsignup',
//     UserController.getfailsignupController)

// routesweblogin.post('/usuarios/role',
//     UserController.postRole)

// routesweblogin.delete('/usuarios/role',
//     UserController.deleteRole)

export default routesweb



