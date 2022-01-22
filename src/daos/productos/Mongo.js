import Contenedor from '../contenedores/Mongo.js.js';

class MongoProductos extends Contenedor {

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
export default MongoProductos