import { contenedor as Usuarios } from '../daos/Usuarios.js';
import bCrypt from 'bcrypt';
import logger from '../logger.js'

async function buscarXUsername( username) 
{
    const usuario = await Usuarios.getByUserName(username);

    return usuario;
}

async function registrarUsuario( user, callback ) 
{

    const usuario = await Usuarios.getByUserName(user.username);

    if (usuario == undefined) {
  
        try {
            user.password = createHash(user.password)
            user.admin = false;
            
            const usuarioReg = await Usuarios.create(user)

            logger.info(`Passport registro Ok `);

            return callback(null, usuarioReg);
        }
        catch (err) {
            logger.error(`Error in Saving user: ${err}`);
            return callback(err);
        }

    }
    else {
        logger.warn('username already exists');
        return callback(null, false)
    }

}

async function loginUsuario(username, password, callback)
{
    const usuario = await Usuarios.getByUserName(username);

    if (usuario == undefined) {
        logger.warn(`User Not Found with username ${usuario}`);
        return callback(null, false);
    }

    if (!isValidPassword(usuario, password)) {
        logger.warn(`Username ${usuario} Invalid Password`);
        return callback(null, false);
    }

    return callback(null, usuario);

}


function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


export {registrarUsuario, loginUsuario, buscarXUsername}