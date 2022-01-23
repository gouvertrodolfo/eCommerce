import logger from '../logger.js'
import dotenv from 'dotenv';
dotenv.config()

const file = process.env.PRODUCTOS_TIPO_PERSISTENCIA;

class Productos {
    constructor() {
            this.contenedor = undefined;
    }

}

Productos.contenedor = import(`./contenedoresproductos/${file}.js`)
.then(module => module.getInstancia())
.then();

export function getInstancia() {
    return Productos.contenedor;
}

export default Productos;

