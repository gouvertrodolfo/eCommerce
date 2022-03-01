import Contenedor from '../DaosBase/FireBase.js';
import logger from '../../../logger.js'

class Firebase extends Contenedor {

    constructor() {
        super('carrito');
    }


    async create(object) {

        const { id, timestamp, listaProductos } = object

        let doc = this.coleccion.doc(`${id}`)

        await doc.create({ id: id, timestamp: timestamp, listaProductos: listaProductos })

    }

    async addProducto(id, producto) {

        const carrito = this.coleccion.doc(`${id}`);

        await carrito.update({
            productos: FieldValue.arrayUnion(producto)
        });
    }

    async delProducto(id, producto) {

        const carrito = this.coleccion.doc(`${id}`);

        await carrito.update({
            productos: FieldValue.arrayRemove(producto)
        });

    }


}

export function getInstancia()
{
    const instacia = new Firebase()
    logger.info('instancia contenedor de carritos Firebase')
    return instacia;
}
