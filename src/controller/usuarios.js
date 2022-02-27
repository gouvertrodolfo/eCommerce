import * as UsuarioApi from '../api/Usuario.js'
import logger from '../logger.js'
import jwt from 'jsonwebtoken'

export function SignUp(req, username, password, done) {

    if (UsuarioApi.existe(username)) {
        logger.warn('username already exists');
        req.error = { error: "username already exists" }
        return done(null, false)
    } else {

        const data = {
            username: username,
            password: password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: req.body.avatar
        };
        const user = UsuarioApi.registrar(data);

        registrarUsuario(user.get(), done);
    }

}

export async function login(username, password, done) {

    try {
        const user = await UsuarioApi.buscar(username)

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

export function postLoginController(req, res) {
    const user = req.user;
    const body = { username: user.username, email: user.email, firstName : user.firstName, lastName:user.lastName, avatar:user.avatar, admin:user.admin };
    const token = jwt.sign({ user: body }, 'TOP_SECRET');
    res.status(200).json({token})
}

export function postSignupController(req, res) {
    res.status(200).json(req.user)
}

export function getfailloginController(req, res) {

    res.status(400).json({ "descripcion": "username o contraseña incorrecta" })

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
