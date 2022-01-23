import Contenedor from '../contenedores/FireBase.js';
// import admin from 'firebase-admin';

class Firebase extends Contenedor {

    constructor() {
        super('carrito');
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
function getInstancia() {
    const instacia = new Firebase()
    logger.info('instancia contenedor de carritos firebase')
    return instacia;
}

export default { getInstancia }