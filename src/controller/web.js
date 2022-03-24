import UsuariosApi from '../api/UsuariosApi.js'
import logger from '../logger.js'
import jwt from 'jsonwebtoken'
import { jwtOpts } from '../../config/config.js'
import schema from '../validations/usuarios.js'

const usuarios = new UsuariosApi();

export async function getInicio(req, res) {
  const title = 'eComerce'

  const info = {
    'Path': process.execPath,
    'Node_version': process.version,
    'Carpeta_Proyecto': process.cwd(),
    'Memoria': process.memoryUsage().rss
  }

  res.render('pages/index', { titulo: title, user: undefined, info })
}

export async function getlogin(req, res) {
  const title = 'Login'
  res.render('pages/login', { titulo: title })
}

export async function postlogin(req, res) {

  const user = req.user;

  const title = 'eCommerce'
  const token = jwt.sign({ user: user }, jwtOpts.secretOrKey, { expiresIn: jwtOpts.expireIn });

  res.render('pages/index', { titulo: title, user })
}

export async function getlogout(req, res) {
  res.render('pages/bye')
}

export async function getsignup(req, res) {
  res.render('pages/signup')
}


export async function getfaillogin(req, res) {
  const title = 'Error usuario y/o contraseña no validos'

  res.render('pages/error', { titulo: title, detalle: undefined })
}

export async function getfailSignup(req, res) {
  const title = 'Error en el registro de usuario'
  res.render('pages/error', { titulo: title, detalle: undefined })
}

export async function mdwValidaUser(req, res, next) {
  let data
  const title = 'Error en el registro de usuario'
  try {
    data = await schema.validateAsync(req.body)
  }
  catch (err) {
    logger.warn(`Error al validaciones esquema de usuarios`)

    const detalle = err.details
    res.render('pages/error', { titulo: title, detalle })

  }

  try {
    if (await usuarios.existeEmail(data.email)) {
      const detalle = 'El email ya esta registrado'
      res.render('pages/error', { titulo: title, detalle })
    }

    if (await usuarios.existeUsername(data.username)) {
      const detalle = 'El username ya esta registrado'
      res.render('pages/error', { titulo: title, detalle })
    }

  }
  catch (err) {
    logger.error(`Error al ejecutar validaciones de usuarios ${err}`)
    const detalle = err
    res.render('pages/error', { titulo: title, detalle })
  }

  next();

}
