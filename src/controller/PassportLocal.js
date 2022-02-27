import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { buscar } from '../api/Usuario.js';
import { SignUp, login } from './usuarios.js'


passport.use('signup', new LocalStrategy({ passReqToCallback: true }, SignUp))

passport.use('login', new LocalStrategy(login));

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {

      console.log('token')

      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);



passport.serializeUser(function (user, done) {
  console.log('serializeUser')
  done(null, user.username);
});

passport.deserializeUser(async function (username, done) {
  console.log('deserializeUser')
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



