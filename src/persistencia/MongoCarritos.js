const ContenedorMongo = require('./MongoNativo');

class MongoCarritos extends ContenedorMongo {

    constructor() {
        super('eCommerce', 'carrito');
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
module.exports = MongoCarritos