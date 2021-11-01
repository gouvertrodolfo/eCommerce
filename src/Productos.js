
class Producto {

    constructor(id, codigo, nombre, descripcion, precio, thumbnail, stock) {

        this.id = id;
        this.codigo = codigo
        this.timestamp = Date.now()
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio
        this.thumbnail = thumbnail
        this.stock = stock
    }

    update(data) {

        const { codigo, nombre, descripcion, precio, thumbnail, stock } = data
        if (codigo != undefined) {
            this.codigo = codigo
        }

        this.timestamp = Date.now()

        if (codigo != undefined) {
            this.nombre = nombre;
        }
        if (codigo != undefined) {
            this.descripcion = descripcion;
        }
        if (codigo != undefined) {
            this.precio = precio
        }
        if (codigo != undefined) {
            this.thumbnail = thumbnail
        }
        if (codigo != undefined) {
            this.stock = stock
        }
    }

}
module.exports = Producto