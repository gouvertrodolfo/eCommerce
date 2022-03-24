import { Router } from 'express'
import passport from '../controller/passport.js'
import * as webController from '../controller/web.js'

//rutas basicas para el acceso por medio de la web renderizada desde el front
const routesweb = new Router();

//GET '/' -> Pantalla de inicio
routesweb.get('/', webController.getInicio);

//GET '/login' -> renderiza desde el back la pantalla de login
routesweb.get('/login', webController.getlogin);

// POST '/login' -> genera el login del usuario y renderiza la pantalla de inicio logeado
routesweb.post('/login',
    passport.authenticate('login', { session: false, failureRedirect: '/faillogin' }),
    webController.postlogin);

//GET '/faillogin' -> renderiza desde el back la pantalla de error en login
routesweb.get('/faillogin',
    webController.getfaillogin)
    routesweb.get('/failsignup',
    webController.getfailSignup)

//GET '/signup' -> renderiza desde el back la pantalla de despedida
routesweb.get('/logout',
    webController.getlogout)

//GET '/signup' -> renderiza desde el back la pantalla de registracion
routesweb.get('/signup',
    webController.getsignup)

// POST '/signup' -> genera un nuevo usuario y renderiza la pantalla de inicio logeado
routesweb.post('/signup',
    webController.mdwValidaUser, 
    passport.authenticate('signup', { session: false, failureRedirect: '/failsignup' }),
    webController.postlogin);

export default routesweb



