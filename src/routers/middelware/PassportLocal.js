import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import {SignUp, login} from '../../controller/login.js'
import {buscar} from '../../controller/usuarios.js'

passport.use('signup', new LocalStrategy({ passReqToCallback: true},  SignUp ))

passport.use('login', new LocalStrategy( login ));


passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(async function (username, done) {
  const usuario = await buscar( username)
  done(null, usuario);
});


function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(401).json({error: 'Acceso no autorizado'})
    }
  }

  function Admin(req, res, next) {

    if (!req.user.admin) {
        res.status(401).json({ error: 'ruta no autorizada' })
    }
    else {
        next()
    }
}

export { passport, isAuth, Admin };