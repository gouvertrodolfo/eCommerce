import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import { SignUp, login, validateToken } from './usuarios.js'
import {jwtOpts} from '../../config/config.js'

passport.use('signup', new LocalStrategy({ passReqToCallback: true }, SignUp))

passport.use('login', new LocalStrategy(login));

console.log(jwtOpts)

passport.use( new JWTstrategy( jwtOpts, validateToken ) );

function isAdmin(req, res, next) {

  if (!req.user.admin) {
    res.status(403).json({ error: `${req.user.username} ruta no autorizada` })
  }
  else {
    next()
  }
}

export { passport, isAdmin };



