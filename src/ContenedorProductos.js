const Contenedor = require("./Contenedor");
const Producto = require("./Productos")


class ContenedorProductos {

    constructor() {
        this.archivo = new Contenedor('productos.json');
    }

    async init() {
        let dots = await this.archivo.getAll();
        this.listaProductos = dots.map(dot => new Producto(dot))

    }

    async commit() {
        await this.archivo.save(this.listaProductos);
    }


    nextId() {
        let id = 0
        this.listaProductos.forEach(item => {
            if (item.id > id) {
                id = item.id;
            }
        });

        return id
    }

    addProducto(object) {
        object.id = this.nextId() + 1        
        let producto = new Producto(object)
        this.listaProductos.push(producto);
        return producto
    }

    getAllProductos() {
        return this.listaProductos;
    }

    getProductobyId(id) {
        for (const element of this.listaProductos) {
            if (element.id == id) {
                return element
            }
        }
    }

    updateProducto(id, data) {
        let producto = this.getProductobyId(id)

        if (producto != undefined) {
            producto.update(data);
            return producto
        }


    }

    delProducto(id) {
        let array = []

        this.listaProductos.forEach(element => {
            if (element.id != id) {
                array.push(element)
            }
        });
        this.listaProductos = array;
        return this.listaProductos;
    }

}

module.exports = ContenedorProductos