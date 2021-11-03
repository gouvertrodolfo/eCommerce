
class Producto {

    constructor(data) {

        const { id, codigo, timestamp, nombre, descripcion, precio, thumbnail, stock } = data

        this.id = id;
        this.codigo = codigo
        
        if (timestamp == undefined) {
            this.timestamp = Date.now()
        }
        else { this.timestamp = timestamp }

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio
        this.thumbnail = thumbnail
        this.stock = stock
    }

    update(data) {

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
module.exports = Producto