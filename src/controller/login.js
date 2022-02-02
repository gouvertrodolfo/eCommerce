import {registrarUsuario} from '../api/Usuario.js'
import { contenedor as Usuarios } from '../daos/Usuarios.js';
import logger from '../logger.js'




async function SignUp(req, username, password, done){


    const nuevoUsuario = {
        username: username,
        password: password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar
    }

    registrarUsuario(nuevoUsuario, done)

}

async function login (username, password, done) 
{
    const usuario = await Usuarios.getByUserName(username);

    if (usuario == undefined) {
        logger.warn(`User Not Found with username ${usuario}`);
        return done(null, false);
    }

    if (!isValidPassword(usuario, password)) {
        logger.warn(`Username ${usuario} Invalid Password`);
        return done(null, false);
    }

    return done(null, usuario);
};


function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}



function postLoginController(req, res) {

    res.status(200).json(req.user)
}

function postSignupController(req, res) {
    res.status(200).json(req.user)
}

function getfailloginController(req, res) {
    res.status(401).json({'status':'getfailloginController'})
}

function getfailsignupController(req, res) {
    console.log(req)
    console.log(res)
    res.status(401).json({'status':'getfailsignupController'})
}

function getlogoutController(req, res) {
    res.status(200).json({'status':'ok'})
}

export { SignUp, login, postLoginController, postSignupController, getfailloginController, getfailsignupController, getlogoutController }