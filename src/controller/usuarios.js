import { buscar, crear, isValidPassword } from '../api/Usuario.js'
import logger from '../logger.js'

function SignUp(req, username, password, done) {


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
        res.statusMessage = 'username already exists'
        return done(null, false)

    }

}

async function login(username, password, done) {
    
    const user = await buscar(username)
    if (user == undefined) {
        logger.warn(`Usuario ${username} no encontrado`);
        return done(null, false)
    }

    if (!isValidPassword(user, password)) {
        logger.warn(`Usuario ${username} Password no valido` );
        return done(null, false);
    }

    return done(null, user);

};

function postLoginController(req, res) {

    res.status(200).json(req.user)
}

function postSignupController(req, res) {
    res.status(200).json(req.user)
}

function getfailloginController(req, res) {
    console.log(req)
    res.status(401).json({ 'status': 'getfailloginController' })
}

function getfailsignupController(req, res) {
    res.status(401).json({ 'status': 'getfailsignupController' })
}

function getlogoutController(req, res) {
    res.status(200).json({ 'status': 'ok' })
}

export {
    buscar,
    SignUp,
    login,
    postLoginController,
    postSignupController,
    getfailloginController,
    getfailsignupController,
    getlogoutController
}