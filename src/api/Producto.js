import NUID from 'nuid'

class Producto {

    constructor(data) {
        const { id, codigo, timestamp, nombre, descripcion, precio, thumbnail, stock } = data

        if (id == undefined) {
            this.id = NUID.next();
            this.timestamp = Date.now()
        }
        else {
            this.id = id;
            this.timestamp = timestamp
        }

        this.codigo = codigo
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio
        this.thumbnail = thumbnail
        this.stock = stock

    }

    modificar(data) {

        const { nombre, descripcion, precio, thumbnail, stock } = data

        this.timestamp = Date.now()

        if (nombre != undefined) {
            this.nombre = nombre;
        }
        if (descripcion != undefined) {
            this.descripcion = descripcion;
        }
        if (precio != undefined) {
            this.precio = precio
        }
        if (thumbnail != undefined) {
            this.thumbnail = thumbnail
        }
        if (stock != undefined) {
            this.stock = stock
        }
    }

}
export default Producto