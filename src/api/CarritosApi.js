import CarritosDao from '../model/daos/CarritosDao.js';

import CarritoDto from '../model/dtos/CarritoDto.js';


export default class CarritosApi {

    constructor() {
        this.carritosDao = new CarritosDao();
    }

    async agregar(email) {
        const carrito = new CarritoDto({ email })
        carrito._id = await this.productosDao.add(carrito);
        return carrito;
    }

    // async listar(){
    //     const productos = await this.productosDao.getAll();
    //     return productos
    // }

    async obtener(email) {
        try {
            const dot = await this.carritosDao.getById({ email: email })
            return new CarritoDto(dot)

        } catch (err) {
            if (err.estado = 404) {
                const carrito = await this.agregar(email)
                return carrito
            }
            else
                throw (err)
        }
    }

    async agregarProducto(email, producto) {
        const dot = this.carritosDao.agregarProducto(email,producto)
        return new CarritoDto(dot)
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

    async borrar(codigo) {
        await this.productosDao.deleteById(codigo)
    }

}






