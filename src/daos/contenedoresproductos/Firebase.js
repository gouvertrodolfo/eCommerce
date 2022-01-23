import Contenedor from '../contenedores/FireBase.js';
import logger from '../../logger.js'

class Firebase extends Contenedor {

    constructor() {
        super('productos');
    }

    update(product) {
        const { id, codigo, timestamp, nombre, descripcion, precio, thumbnail, stock } = product

        this.collection.updateOne(
            {
                id: id
            },
            {
                '$set':
                {
                    codigo: codigo,
                    timestamp: timestamp,
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    thumbnail: thumbnail,
                    stock: stock
                }
            })
            .then()
            .catch(err => { logger.error(err) })
    }

}

function getInstancia()
{
    const instacia = new Firebase()
    logger.info('instancia contenedor de productos Firebase')
    return instacia;
}

export  {getInstancia};