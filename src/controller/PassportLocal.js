import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { buscar } from '../api/Usuario.js';
import { SignUp, login } from './usuarios.js'



passport.use('signup', new LocalStrategy({ passReqToCallback: true }, SignUp))

passport.use('login', new LocalStrategy(login));


passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(async function (username, done) {
  const usuario = await buscar(username)
  done(null, usuario);
});


function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({ error: 'Acceso no autorizado' })
  }
}

function isAdmin(req, res, next) {

  if (!req.user.admin) {
    res.status(403).json({ error: `${req.user.username} ruta no autorizada` })
  }
  else {
    next()
  }
}

export { passport, isAuth, isAdmin };