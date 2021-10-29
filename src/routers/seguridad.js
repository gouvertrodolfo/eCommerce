const Express = require('express');
const jwt = require('jsonwebtoken')
const config  = require("./../config/config")

const app = Express();
const apiSeguridad = Express.Router();

app.set('llave', config.llave);

apiSeguridad.post('/autenticar', (req, res) => {
    console.log(req.body)
    console.log(app.get('llave'))

    if (req.body.usuario === "admin") {
        const payload = {
            check: true,
            role:'Administrador'
        };
        const token = jwt.sign(payload, app.get('llave'), {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos" })
    }
})

function tokenAdmin(req, res, next) {
    const token = req.headers['access-token'];

    console.log(token)

    if (token) {
        jwt.verify(token, app.get('llave'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else {
                req.decoded = decoded;
                console.log(decode)
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
}



exports.apiSeguridad = apiSeguridad;