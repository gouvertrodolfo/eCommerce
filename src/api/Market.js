 const ContenedorProductos = require("../persistencia/MongoProductos");
// const ContenedorProductos = require("../persistencia/MongooseCarritos");
 const ContenedorCarritos = require("../persistencia/MongoCarritos");
//  const ContenedorCarritos = require("../persistencia/MongooseCarritos");
const Producto = require("./Producto")
const Carrito = require("./Carrito")


class Market {

    constructor() {
        this.contenedorProductos = new ContenedorProductos();
        this.ContenedorCarritos = new ContenedorCarritos();
    }

    async addProducto(object) {

        // object.id = await this.contenedorProductos.getNextId()

        await this.contenedorProductos.create(object)

        return object
    }

    async getAllProductos() {
        const array = await this.contenedorProductos.getAll();
        return array
    }

    async getProductobyId(id) {

        const dot = await this.contenedorProductos.getById(id)

        const producto = new Producto(dot)

        return producto;
    }

    updateProducto(id, data) {

        let producto = this.getProductobyId(id)

        if (producto != undefined) {

            producto.modificar(data);

            this.contenedorProductos.update(producto)

            return producto
        }

    }

    delProducto(id) {
        this.contenedorProductos.deleteById(id)
    }

    /*************************************************************************************************** */
    async addCarrito() {

        const id = await this.ContenedorCarritos.getNextId()

        let carrito = new Carrito({ id: id });

        carrito = await this.ContenedorCarritos.create(carrito)

        return carrito;
    }

    async getCarritobyId(id) {

        const dot = await this.ContenedorCarritos.getById(id);

        const carrito = new Carrito(dot)

        return carrito;
    }

    async addProdutoAlCarrito(carrito, producto) {

        // const dot = await this.ContenedorCarritos.getById(id);
        // const carrito = new Carrito(dot)
        // carrito.addProducto(producto)
console.log(carrito)
console.log(producto)
        await this.ContenedorCarritos.update(carrito.id, producto)

    }

    delCarrito(id) {
        this.ContenedorCarritos.deleteById(id)
    }

    updateCarrito(id) { }
}

module.exports = Market