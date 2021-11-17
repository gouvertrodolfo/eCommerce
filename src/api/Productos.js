const Contenedor = require("../persistencia/productosMongo");
const Producto = require("./Producto")


class Productos {

    constructor() {
        this.contenedor = new Contenedor();
    }

    async init() {
        let dots = await this.contenedor.getAll();
        this.listaProductos = dots.map(dot => new Producto(dot))
    }

    addProducto(object) {

        object = this.contenedor.create(object)

        let producto = new Producto(object)

        this.listaProductos.push(producto);

        return producto
    }

    getAllProductos() {
        return this.listaProductos;
    }

    getProductobyId(id) {
        const producto = this.contenedor.getById(id)

        return producto;
    }

    updateProducto(id, data) {

        let producto = this.getProductobyId(id)

        if (producto != undefined) {
        
            producto.update(data);
            
            this.contenedor.update(producto)

            return producto
        }

    }

    delProducto(id) {
        this.contenedor.deleteById(id)
    }

}

module.exports = Productos