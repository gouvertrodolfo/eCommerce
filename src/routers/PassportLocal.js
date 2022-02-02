
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import {SignUp, login} from '../controller/login.js'

passport.use('signup', new LocalStrategy({ passReqToCallback: true},  SignUp ))

passport.use('login', new LocalStrategy( login ));
   

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    done(null, username);
});


export { passport };