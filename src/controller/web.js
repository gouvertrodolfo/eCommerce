import UsuariosApi from '../api/UsuariosApi.js'
import logger from '../logger.js'
import jwt from 'jsonwebtoken'
import { jwtOpts } from '../../config/config.js'
import schema from '../validations/usuarios.js'

const usuarios = new UsuariosApi();

export async function getInicio(req, res) {
    const title = 'Login'
    res.render('pages/index',{ titulo: title, user:undefined, token:undefined })
}

export async function getlogin(req, res) {
    const title = 'Login'
    res.render('pages/login', { titulo: title })
}

export async function postlogin(req, res) {

    const user = req.user;

    console.log(user)

    const title = 'eCommerce'
    const token = jwt.sign({ user: user }, jwtOpts.secretOrKey, { expiresIn: jwtOpts.expireIn });
    
    

    res.render('pages/index',{ titulo: title, user })
}


export async function getfailloginController(req, res) {
    const title = 'Login'
    res.render('pages/error', { titulo: title })
}

export function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
  }
  