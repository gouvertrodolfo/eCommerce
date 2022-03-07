import * as UsuarioApi from '../api/Usuario.js'
import logger from '../logger.js'
import jwt from 'jsonwebtoken'
import { jwtOpts } from '../../config/config.js'

export async function SignUp(req, email, password, done) {
    const data = {
        email: email,
        password: password,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar
    };
    const user = await UsuarioApi.registrar(data);

    done(null, user.get());
}

export async function login(email, password, done) {

    logger.info(`usuarios controller login email: ${email} `)

    try {
        const user = await UsuarioApi.buscar(email)

        if (!user.isValidPassword(password)) {
            return done(null, false);
        }

        console.log(user)

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
    res.status(401).json({ "descripcion": "error al intentar crear el usuario" })
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

export async function validaEmail(req, res, next) {
    if (await UsuarioApi.existeEmail(req.body.email)) {
        res.status(400).json({ descripcion: 'El email ya esta registrado' })
    }
    else
        next();
}

export async function validarUsername(req, res, next) {
    if (await UsuarioApi.existeUsername(req.body.username))
        res.status(400).json({ descripcion: 'El username ya esta registrado' })
    else
        next();
}