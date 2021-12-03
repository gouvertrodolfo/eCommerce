//  const ContenedorProductos = require("../persistencia/MongoProductos");
//  const ContenedorCarritos = require("../persistencia/MongoCarritos");

import ContenedorProductos from "../daos/ContenedorProductos.js";
import ContenedorCarritos from "../daos/ContenedorCarrito.js";


import Producto from "./Producto.js";
import Carrito from "./Carrito.js";


class Market {

    constructor() {
        this.contenedorProductos = new ContenedorProductos();
        this.ContenedorCarritos = new ContenedorCarritos();
    }

    async addProducto(object) {

        const producto = new Producto(object);

        await this.contenedorProductos.create(producto)

        return producto
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

        let carrito = new Carrito();

        await this.ContenedorCarritos.create(carrito)

        return carrito;
    }

    async getCarritobyId(id) {

        const dot = await this.ContenedorCarritos.getById(id);

        const carrito = new Carrito(dot)

        return carrito;
    }

    addProdutoAlCarrito(carrito, producto) {

        //carrito.addProducto(producto)
        this.ContenedorCarritos.addProducto(carrito.id, producto)

        return carrito;
    }

    async delProdutoAlCarrito(carrito, producto) {
        const { id } = carrito

        await this.ContenedorCarritos.delProducto(id, producto)

        carrito = await this.getCarritobyId(id)

        return carrito;
    }

    delCarrito(id) {
        this.ContenedorCarritos.deleteById(id)
    }

    updateCarrito(id) { }
}

export default Market