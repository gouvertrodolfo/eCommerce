//  const ContenedorProductos = require("../persistencia/MongoProductos");
//  const ContenedorCarritos = require("../persistencia/MongoCarritos");

import ContenedorProductos from "../daos/FireBase";
import ContenedorCarritos from "../daos/FireBase";


import Producto from "./Producto";
import Carrito from "./Carrito";


class Market {

    constructor() {
        this.contenedorProductos = new ContenedorProductos('productos');
        this.ContenedorCarritos = new ContenedorCarritos('carrito');
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

        await this.ContenedorCarritos.create(carrito)

        return carrito;
    }

    async getCarritobyId(id) {

        const dot = await this.ContenedorCarritos.getById(id);

        const carrito = new Carrito(dot)

        return carrito;
    }

    addProdutoAlCarrito(carrito, producto) {

        carrito.addProducto(producto)
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