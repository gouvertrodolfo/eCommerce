import OrdenesDao from '../model/daos/OrdenesDao.js';
import OrdenDto from '../model/dtos/OrdenDto.js';

import CarritosApi from './CarritosApi.js'

const carritoApi = new CarritosApi();

export default class OrdenesApi {

    constructor() {
        this.ordenesDao = new OrdenesDao();
    }

    async agregar(email) {

        const carrito = await carritoApi.confirmar(email);

        carrito._id = await this.ordenesDao.add(carrito);

        return carrito;
    }

    async obtener(email) {
        try {
            const dto = await this.carritosDao.getById({ email: email })
            return new CarritoDto(dto)

        } catch (err) {
            if (err.estado == 404) {
                const carrito = await this.agregar(email)
                return carrito
            }
            else
                throw (err)
        }
    }

    /*

    async agregarProducto(email, producto, cantidad) {
        producto.cantidad = cantidad

        const carrito = await this.obtener(email)

        carrito.productos.forEach(async element => {
            if (element.id === producto.id)
                await this.quitarProducto(email, producto.id)
        });

        const dot = await this.carritosDao.addProducto(email, producto)
        return new CarritoDto(dot)
    }

    async quitarProducto(email, id) {

        const dot = await this.carritosDao.delProducto(email, id)
        return new CarritoDto(dot)

    }

    async eliminar(email) {
        await this.carritosDao.delete(email)
    }

    async borrar(codigo) {
        await this.productosDao.deleteById(codigo)
    }
*/
}
