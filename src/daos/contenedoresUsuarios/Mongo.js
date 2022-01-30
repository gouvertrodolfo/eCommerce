import Contenedor from '../contenedores/Mongo.js';
import logger from '../../logger.js'

class Mongo extends Contenedor {

    constructor() {
        super('eCommerce', 'usuarios');
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
    const instacia = new Mongo()
    logger.info('instancia contenedor de usuarios Mongo')
    return instacia;
}

export  {getInstancia};