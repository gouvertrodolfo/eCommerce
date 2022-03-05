import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy } from 'passport-jwt';
import { SignUp, login, validateToken } from './usuarios.js'
import { jwtOpts } from '../../config/config.js'

passport.use('signup', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, SignUp))

passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, login));

passport.use(new JWTstrategy(jwtOpts, validateToken));

export default passport;
