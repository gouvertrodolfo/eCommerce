import CustomError from '../errores/CustomError.js';
import ProductosDao from '../model/daos/ProductosDao.js';
import ProductoDto from '../model/dtos/ProductoDto.js';

export default class ProductosApi {

    constructor() {
        this.productosDao = new ProductosDao();
    }

    async agregar(prodParaAgregar) {

        const producto = new ProductoDto(prodParaAgregar)
        await this.productosDao.add(producto);
        return producto;
    }

    async listar() {
        const productos = await this.productosDao.getAll();
        return productos
    }

    async Obtener(id) {
        const dot = await this.productosDao.getById(id)
        return new ProductoDto(dot)
    }

    async modificar(data) {
        await this.productosDao.update(data)

        const dot = await this.productosDao.getById(data.id)
        return new ProductoDto(dot)
    }

    async borrar(id) {
        await this.productosDao.deleteById(id)
    }

    async descontarStock(id, cantidad) {

        const nuevoStock = await this.validarStock(id, cantidad)

        await this.productosDao.updateStock(id, nuevoStock)
    }

    async validarStock(id, cantidad) {

        const producto = await this.Obtener(id)
        const nuevoStock = producto.stock - cantidad

        if (nuevoStock << 0) {
            throw new CustomError(400, 'No existe stock suficiente para satifacer la demanda', `Stock disponible: ${producto.stock} solicitado ${cantidad}`)
        }

        return nuevoStock;

    }


}






