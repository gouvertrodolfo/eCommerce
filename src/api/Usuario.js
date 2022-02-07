import { contenedor as Usuarios } from '../daos/Usuarios.js';
import bCrypt from 'bcrypt';
import logger from '../logger.js'

async function buscar(username) {
    const usuario = await Usuarios.getByUserName(username);
    return usuario;
}

async function crear(user) {
    
    try {
        user.password = createHash(user.password)
        user.admin = false;
        const usuarioReg = await Usuarios.create(user)

        logger.info(`Passport registro Ok `);

        return usuarioReg;
    }
    catch (err) {
        logger.error(`Error in Saving user: ${err}`);
        throw (err);
    }
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


export { crear, isValidPassword, buscar }