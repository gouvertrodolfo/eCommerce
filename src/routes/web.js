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
    webController.getfaillogin)

    routesweb.get('/failsignup',
    webController.getfailSignup)

routesweb.get('/logout',
    webController.getlogout)

routesweb.get('/signup',
    webController.getsignup)

routesweb.post('/signup',
    webController.mdwValidaUser, 
    passport.authenticate('signup', { session: false, failureRedirect: '/failsignup' }),
    webController.postlogin);

export default routesweb



