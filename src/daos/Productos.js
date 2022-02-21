import logger from '../logger.js';
import config from '../../config/config.js';
const file = config.TIPO_PERSISTENCIA;

let contenedor;
try {
    contenedor = contenedor = await import(`./Productos/${file}.js`)
        .then(module => module.getInstancia())
        .then();
}
catch {
    logger.error(`Persistencia de productos ${file} no implementado`)
}

export { contenedor };

