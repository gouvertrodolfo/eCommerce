import Contenedor from '../../contenedores/Mongo.js';

class MongoCarritos extends Contenedor {

    constructor() {
        super('eCommerce', 'carritos');
    }

    async addProducto(id, producto){

        await this.collection.updateOne(
            {
                id: Number.parseInt(id)
            },
            {
                '$push':
                {
                    listaProductos: producto
                }
            })

    }

    async delProducto(id, producto){

        await this.collection.updateOne(
            {
                id: Number.parseInt(id)
            },
            {
                '$pull':
                {
                    listaProductos: {id : {$eq:producto.id}}
                }
            })

    }


}
export default MongoCarritos