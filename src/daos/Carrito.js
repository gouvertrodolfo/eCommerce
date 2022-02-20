import logger from '../logger.js';
import dotenv from 'dotenv';
dotenv.config()

const file = process.env.CARRITO_TIPO_PERSISTENCIA;

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
