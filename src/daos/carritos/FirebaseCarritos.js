import Contenedor from '../../contenedores/FireBase.js';
import admin from 'firebase-admin';

class FirebaseCarritos extends Contenedor {

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
export default FirebaseCarritos