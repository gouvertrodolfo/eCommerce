import CarritosDao from '../model/daos/CarritosDao.js';
import CarritoDto from '../model/dtos/CarritoDto.js';
import ProductoDto from '../model/dtos/ProductoDto.js';
import ProductosApi from './ProductosApi.js';
import CustomError from '../errores/CustomError.js';
import logger from '../logger.js';

const productosApi = new ProductosApi();

export default class CarritosApi {

    constructor() {
        this.carritosDao = new CarritosDao();
    }

    async agregar(email) {

        const carrito = new CarritoDto({ email })

        carrito._id = await this.carritosDao.add(carrito);

        return carrito;
    }

    async obtener(email) {
        try {
            const dto = await this.carritosDao.getById({ email: email })
            return new CarritoDto(dto)

        } catch (err) {
            if (err.estado == 404) {
                const dto = await this.agregar(email)
                return new CarritoDto(dto)
            }
            else
                throw (err)
        }
    }

    async agregarProducto(email, dataProducto, cantidad) {

        const producto = new ProductoDto(dataProducto)

        const carrito = await this.obtener(email)

        const found = carrito.productos.find(function (element) {
            return element.id == producto.id;
        });

        if (!found) {
            producto.cantidad = cantidad
            if( producto.stock < producto.cantidad ) throw new CustomError(400, 'No existe stock suficiente')
        }
        else
        {
            producto.cantidad = cantidad + found.cantidad
            if( producto.stock < producto.cantidad ) throw new CustomError(400, 'No existe stock suficiente')
            await this.quitarProducto(email, producto.id)
        }

        const dot = await this.carritosDao.addProducto(email, producto.getforCarrito())
        return new CarritoDto(dot)
    }

    async quitarProducto(email, id) {

        const dot = await this.carritosDao.delProducto(email, id)
        return new CarritoDto(dot)

    }

    async eliminar(email) {
        await this.carritosDao.delete(email)
    }

    async confirmar(email) {
        const carrito = await this.obtener(email);

        if (carrito.productos.length == 0)
            throw new CustomError(400, `No se puede confirmar un carrito sin productos`)

        for (const producto of carrito.productos) {
            await productosApi.validarStock(producto.id, producto.cantidad)
        }

        for (const producto of carrito.productos) {
            await productosApi.descontarStock(producto.id, producto.cantidad)
        }

        await this.carritosDao.delete(email)

        return carrito;
    }

}






