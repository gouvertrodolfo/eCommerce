import * as UsuarioApi from '../api/Usuario.js'
import logger from '../logger.js'
import jwt from 'jsonwebtoken'
import {jwtOpts} from '../../config/config.js'

export function SignUp(req, email, password, done) {

    if (UsuarioApi.existe(email)) {
        logger.warn('email already exists');
        return done(null, false)
    } else {

        const data = {
            email: email,
            password: password,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: req.body.avatar
        };
        const user = UsuarioApi.registrar(data);

        UsuarioApi.enviarMailRegistro(data)

        done(user.get(), null);
    }

}

export async function login(email, password, done) {

    try {
        const user = await UsuarioApi.buscar(email)

        if (!user.isValidPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user.get());

    }
    catch (error) {
        logger.warn(error);
        return done(null, false, { message: 'Incorrect username.' });
    }

};

export async function responseToken(req, res) {
    const user = req.user;
    
    const body = {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        admin: user.admin
    };
    const token = jwt.sign({ user: body }, jwtOpts.secretOrKey, {expiresIn: jwtOpts.expireIn});

    res.status(200).json({ token })
}

export function validateToken(token, cb){
    try {
        return cb(null, token.user);
      } catch (error) {
        cb(error);
      }
}

export function getfailloginController(req, res) {
    res.status(401).json({ "descripcion": "username o contraseña incorrecta" })
}

export function getfailsignupController(req, res) {
    res.status(401).json(req.error)
}

export function getlogoutController(req, res) {
    req.session.destroy(err => {
        if (!err) res.status(200).json({ 'status': 'ok' })
        else res.status(500).send({ status: 'Logout ERROR', body: err })
    })

}

export function isAdmin(req, res, next) {

    if (!req.user.admin) {
      res.status(403).json({ error: `${req.user.username} ruta no autorizada` })
    }
    else {
      next()
    }
  }