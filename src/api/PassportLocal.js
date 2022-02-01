import bCrypt from 'bcrypt';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { contenedor as Usuarios } from '../daos/Usuarios.js';

import logger from '../logger.js'

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {

        console.log('passport.use signup')
        const usuario = await Usuarios.getByUserName(username);

        if (usuario == undefined) {
            const nuevoUsuario = {
                username: username,
                password: createHash(password),
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                avatar: req.body.avatar
            }
            try {
                const usuarioReg = await Usuarios.create(nuevoUsuario)
                console.log(usuarioReg)
                logger.info('Usuario passport registro Ok');
                return done(null, usuarioReg);
            }
            catch (err) {
                logger.error(); ('Error in Saving user: ' + err);
                return done(err);
            }

        }
        else {
            logger.warn('User already exists');
            return done(null, false)
        }

    })
)

passport.use('login', new LocalStrategy(
    async (username, password, done) => {

        const usuario = await Usuarios.getById(username);

        if (usuario == undefined) {
            logger.warn(`User Not Found with username ${usuario}`);
            return done(null, false);
        }

        console.log(usuario)
        if (!isValidPassword(usuario, password)) {
            logger.warn(`Username ${usuario} Invalid Password`);
            return done(null, false);
        }

        return done(null, usuario);
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

 passport.deserializeUser((id, done) => {
     Usuarios.getById(id, done);
 });

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

export { passport };