import logger from '../../logger.js';
import config from '../../../config/config.js';
const file = config.TIPO_PERSISTENCIA;

let contenedor;
try {
    contenedor = await import(`./Carritos/${file}.js`)
        .then(module => module.getInstancia())
        .then();
}
catch {
    logger.error(`Persistencia de carritos ${file} no implementada`)
}

export { contenedor };
