import Producto from './Producto.js';
import NUID from 'nuid'

class Carrito {

    constructor(data) {

        if (data == undefined) {
            this.id= NUID.next();
            this.timestamp = Date.now();
            this.listaProductos = [];
        }
        else{
            const { id, timestamp, listaProductos } = data
            this.id = id
            this.timestamp = timestamp;
            this.listaProductos = listaProductos;
        }
        
    };

    addProducto(producto) {
        this.listaProductos.push(producto)
        return this.listaProductos;
    }

    delProducto(id_prod) {
        let array = []

        this.listaProductos.forEach(element => {
            if (element.id != id_prod) {
                array.push(element);
            }

        });

        this.listaProductos = array;

        return this.listaProductos;
    }

    Confirmar(){
        
    }
}


export default Carrito