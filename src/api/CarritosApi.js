import CarritosDao from '../model/daos/CarritosDao.js';

import CarritoDto from '../model/dtos/CarritoDto.js';


export default class CarritosApi {

    constructor() {
        this.carritosDao = new CarritosDao();
    }

    async agregar(carritoParaAgregar) {
        const carritoAgregado = await this.productosDao.add(carritoParaAgregar);
        return carritoAgregado;
    }

    // async listar(){
    //     const productos = await this.productosDao.getAll();
    //     return productos
    // }

    async obtener(email) {
        const dot = await this.carritosDao.getById({email: email})
        return new CarritoDto(dot)
    }

    async agregarProducto(email, producto) {
        const carrito = this.obtener(email);

        // contenedor.addProducto(producto)
        // return this.listaProductos;
    }

    async quitarProducto(email, producto) {
    }


    modificar(data) {

    //     const { nombre, descripcion, precio, thumbnail, stock } = data

    //     this.timestamp = Date.now()

    //     if (nombre != undefined) {
    //         this.nombre = nombre;
    //     }
    //     if (descripcion != undefined) {
    //         this.descripcion = descripcion;
    //     }
    //     if (precio != undefined) {
    //         this.precio = precio
    //     }
    //     if (stock != undefined) {
    //         this.stock = stock
    //     }

    //     contenedor.update(this)
    }

    async borrar(codigo)
    {
        await this.productosDao.deleteById(codigo)
    }

}






