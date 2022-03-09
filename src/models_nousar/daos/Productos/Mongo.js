import Contenedor from '../DaosBase/Mongo.js';
import logger from '../../../logger.js'

class Mongo extends Contenedor {

    constructor() {
        super('productos');
    }
    
    async getByCodigo(codigo) {

        try {
            const [object] = await this.collection.find({ codigo: codigo }).toArray()
            return object
        }
        catch (err) {
            logger.error(err)
        }
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

export function getInstancia()
{
    const instacia = new Mongo()
    return instacia;
}
