import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy } from 'passport-jwt';
import { mdwSignUp, mdwlogin, mdwValidateToken } from './usuarios.js'
import { jwtOpts } from '../../config/config.js'

passport.use('signup', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, mdwSignUp))

passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password'}, mdwlogin));

passport.use(new JWTstrategy(jwtOpts, mdwValidateToken));

export default passport;
