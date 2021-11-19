const ContenedorMongo = require('./MongoNativo');

class MongoProductos extends ContenedorMongo {

    constructor() {
        super('eCommerce', 'productos');
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
            .catch(err => { console.log(err) })
    }




}
module.exports = MongoProductos