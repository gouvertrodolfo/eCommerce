import logger from '../../logger.js';
import config from '../../../config/config.js';
const file = config.TIPO_PERSISTENCIA;

let contenedor;
try {
    contenedor = await import(`./Usuarios/${file}.js`)
        .then(module => module.getInstancia())
        .then();
}
catch(err) {
    logger.error(`Persistencia de usuario ${file} no implementada`)
    logger.error(err)
}


export { contenedor };
