import logger from '../logger.js';
import dotenv from 'dotenv';
dotenv.config()

const file = process.env.USUARIO_TIPO_PERSISTENCIA;

let contenedor;
try {
    contenedor = await import(`./contenedoresUsuarios/${file}.js`)
        .then(module => module.getInstancia())
        .then();
}
catch {
    logger.error(`Persistencia de usuario ${file} no implementada`)
}


export { contenedor };
