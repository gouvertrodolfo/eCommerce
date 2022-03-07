import Contenedor from '../DaosBase/Mongo.js';
import logger from '../../../logger.js'

class Mongo extends Contenedor {

    constructor() {
        super('carritos');
    }

    async getByEmail(email) {

        try {
            const [object] = await this.collection.find({ email: email }).toArray()
            return object
        }
        catch (err) {
            logger.error(err)
        }
    }

    async addProducto(id, producto) {

        await this.collection.updateOne(
            {
                id: id
            },
            {
                '$push':
                {
                    listaProductos: producto
                }
            })

    }

    async delProducto(id, producto) {

        await this.collection.updateOne(
            {
                id: id
            },
            {
                '$pull':
                {
                    listaProductos: { id: { $eq: producto.id } }
                }
            })

    }

}

export function getInstancia()
{
    const instacia = new Mongo()
    return instacia;
}
