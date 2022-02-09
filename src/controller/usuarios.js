import { buscar, crear, isValidPassword } from '../api/Usuario.js'
import logger from '../logger.js'

export function SignUp(req, username, password, done) {

    if (buscar(username) == undefined) {
        const nuevoUsuario = {
            username: username,
            password: password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: req.body.avatar
        }
        const user = crear(nuevoUsuario);
        registrarUsuario(user, done)

    }
    else {
        logger.warn('username already exists');
        req.error= {error:"username already exists"}
        return done(null, false)

    }

}

export async function login(username, password, done) {
    
    const user = await buscar(username)
    if (user == undefined) {
        return done(null, false)
    }

    if (!isValidPassword(user, password)) {
        return done(null, false);
    }
    
    return done(null, user);

};

export function postLoginController(req, res) {

    res.status(200).json(req.user)
}

export function postSignupController(req, res) {
    res.status(200).json(req.user)
}

export function getfailloginController(req, res) {

    res.status(400).json( {"descripcion":"username o contraseña incorrecta" })
}

export function getfailsignupController(req, res) {
    res.status(401).json( req.error)
}

export function getlogoutController(req, res) {
    res.status(200).json({ 'status': 'ok' })
}
