import Contenedor from '../contenedores/Mongo.js';
import logger from '../../logger.js'

class Mongo extends Contenedor {

    constructor() {
        super('eCommerce', 'carritos');
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

function getInstancia()
{
    const instacia = new Mongo()
    logger.info('instancia contenedor de carritos mongo')
    return instacia;
}

export  {getInstancia};