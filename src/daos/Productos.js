import logger from '../logger.js';
import dotenv from 'dotenv';
dotenv.config()

const file = process.env.PRODUCTOS_TIPO_PERSISTENCIA;

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

