import * as UsuarioApi from '../api/Usuario.js'
import logger from '../logger.js'
import jwt from 'jsonwebtoken'
import { jwtOpts } from '../../config/config.js'
import schema from '../validations/usuarios.js'

export async function SignUp(req, email, password, done) {

    try {
        const data = await schema.validateAsync(req.body)

        const user = await UsuarioApi.registrar(data);

        done(null, user.get());
    }
    catch (err) {
        logger.warn(err)
        done(null, false)
    }
}

export async function login(email, password, done) {

    logger.info(`usuarios controller login email: ${email} `)

    try {
        const user = await UsuarioApi.buscar(email)

        if (!user.isValidPassword(password)) {
            return done(null, false);
        }

        return done(null, user.get());

    }
    catch (error) {
        logger.error(error);
        return done(null, false);
    }

};

export async function responseToken(req, res) {
    const user = req.user;
    const token = jwt.sign({ user: user }, jwtOpts.secretOrKey, { expiresIn: jwtOpts.expireIn });

    res.status(200).json({ token })
}

export function validateToken(token, cb) {

    if (token.iat < Math.floor(Date.now() / 1000)) {
        logger.warn('token caducado')
        return cb(null, false)
    }
    else return cb(null, token.user);
}

export function getfailloginController(req, res) {
    res.status(401).json({ "descripcion": "username o contraseña incorrecta" })
}

export function getfailsignupController(req, res) {

    res.status(400).json({ descripcion: req.error })
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

export async function validaUser(req, res, next) {
    let data
    try {
        data = await schema.validateAsync(req.body)
    }
    catch (err) { 
        logger.warn(`Error al validaciones esquema de usuarios`)
        return res.status(400).json({ descripcion: err.details }) 
    }

    try {
        if (await UsuarioApi.existeEmail(data.email)) {
            return res.status(400).json({ descripcion: 'El email ya esta registrado' })
        }

        if (await UsuarioApi.existeUsername(data.username))
            return res.status(400).json({ descripcion: 'El username ya esta registrado' })
    }
    catch (err) {
        logger.error(`Error al ejecutar validaciones de usuarios ${err}`)
        return res.status(500).json({ descripcion: err })
    }

    next();

}

