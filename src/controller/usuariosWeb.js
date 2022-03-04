import * as UsuarioApi from '../api/Usuario.js'
import logger from '../logger.js'
import jwt from 'jsonwebtoken'
import { jwtOpts } from '../../config/config.js'


export function getlogin(req, res) {
    const title = 'Login'
    console.log(req.session.user)
    res.render('pages/login', { titulo: title })
}

export function getInicio(req, res) {
    const title = 'Inicio'
    console.log(req.session.user)
    res.render('pages/index', { titulo: title })
}

export function getfailSignup(req, res) {
    const title = 'Inicio'
    console.log(req.session.user)
    res.render('pages/index', { titulo: title })
}

export function getfaillogin(req, res) {
    const title = 'Inicio'
    console.log(req.session.user)
    res.render('pages/index', { titulo: title })
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