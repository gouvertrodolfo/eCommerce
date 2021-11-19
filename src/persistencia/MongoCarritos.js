const ContenedorMongo = require('./MongoNativo');

class MongoCarritos extends ContenedorMongo {

    constructor() {
        super('eCommerce', 'carrito');
    }

    update(id, producto){

        this.collection.updateOne(
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

}
module.exports = MongoCarritos