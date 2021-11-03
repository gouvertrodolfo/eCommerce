const Producto = require("./Productos");

class Carrito {

    constructor(data) {

        const { id, timestamp, listaProductos } = data

        this.id = id
        

        if (timestamp == undefined) {
            this.timestamp = Date.now();
        }
        else {
            this.timestamp = timestamp;
        }

        if (listaProductos == undefined) {
            this.listaProductos = [];
        }
        else {
            this.listaProductos = listaProductos.map(prod => new Producto())
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


}

module.exports = Carrito