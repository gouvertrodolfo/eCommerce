//  const ContenedorProductos = require("../persistencia/MongoProductos");
//  const ContenedorCarritos = require("../persistencia/MongoCarritos");

// import { contenedor as productosDao } from "../daos/Productos.js";
import { contenedor as carritosDao } from "../daos/Carrito.js";

import Producto from "./Producto.js";
import Carrito from "./Carrito.js";


class Market {

    constructor() {
    }

    // async addProducto(object) {
    //     const producto = new Producto(object);
    //     await productosDao.create(producto)
    //     return producto
    // }

    // async getAllProductos() {

    //     const array = await productosDao.getAll();
    //     return array
    // }

    // async getProductobyId(id) {

    //     const dot = await productosDao.getById(id)
    //     if (dot == undefined) { return undefined; }
    //     {
    //         const producto = new Producto(dot)
    //         return producto;
    //     }
    // }

    // updateProducto(id, data) {

    //     let producto = this.getProductobyId(id)

    //     if (producto != undefined) {

    //         producto.modificar(data);

    //         productosDao.update(producto)

    //         return producto
    //     }

    // }

    // delProducto(id) {
    //     productosDao.deleteById(id)
    // }

    /*************************************************************************************************** */
    async addCarrito() {

        let carrito = new Carrito();
        console.log(carritosDao)
        await carritosDao.create(carrito)

        return carrito;
    }

    async getCarritobyId(id) {

        const dot = await carritosDao.getById(id);
        const carrito = new Carrito(dot)
        return carrito;
    }

    addProdutoAlCarrito(carrito, producto) {
        carritosDao.addProducto(carrito.id, producto)
        return carrito;
    }

    async delProdutoAlCarrito(carrito, producto) {
        const { id } = carrito

        await carritosDao.delProducto(id, producto)

        carrito = await this.getCarritobyId(id)

        return carrito;
    }

    delCarrito(id) {
        carritosDao.deleteById(id)
    }

    updateCarrito(id) { }
}

export default Market