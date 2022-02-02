import { contenedor as Usuarios } from '../daos/Usuarios.js';
import bCrypt from 'bcrypt';
import logger from '../logger.js'


async function registrarUsuario( user, callback ) 
{

    const usuario = await Usuarios.getByUserName(user.username);

    if (usuario == undefined) {
  
        try {
            user.password = createHash(user.password)
            
            const usuarioReg = await Usuarios.create(user)

            logger.info(`Passport registro Ok usuario:${usuarioReg.username}`);

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

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


export {registrarUsuario}