import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { buscar } from '../api/Usuario.js';
import { SignUp, login } from './usuarios.js'



passport.use('signup', new LocalStrategy({ passReqToCallback: true }, SignUp))

passport.use('login', new LocalStrategy(login));


passport.serializeUser(function (user, done) {
  console.log('serializeUser')
  done(null, user.username);
});

passport.deserializeUser(async function (username, done) {
  console.log('******************************************************************************************************************')          
  console.log('deserializeUser')
  console.log(username)
  console.log('******************************************************************************************************************')          
  const usuario = await buscar(username)
  console.log('user Ok')

  done(null, usuario);
});


function isAuth(req, res, next) {
  console.log('******************************************************************************************************************')          
  console.log('isAuth request')          
  console.log('******************************************************************************************************************')          



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