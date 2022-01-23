
import logger from '../logger.js'
import dotenv from 'dotenv';
dotenv.config()

const file = process.env.CARRITO_TIPO_PERSISTENCIA;



class Carrito{
    constructor(){
        logger.info(`clase carrito ${this.contenedor}`)
    }

}

Carrito.contenedor = await import(`./contenedorescarritos/${file}.js`)
.then(module => module.getInstancia())
.then();

export function getInstancia(){
    return Carrito.contenedor;
}

export default Carrito;