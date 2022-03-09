import ProductosDao from '../model/daos/ProductosDao.js';
import ProductoDto from '../model/dtos/ProductoDto.js';

export default class ProductosApi {

    constructor() {
        this.productosDao = new ProductosDao();
    }

    async agregar(prodParaAgregar) {
        const prodAgregado = await this.productosDao.add(prodParaAgregar);
        return prodAgregado;
    }

    async listar(){
        const productos = await this.productosDao.getAll();
        return productos
    }

    async Obtener(codigo) {

        const dot = await this.productosDao.getById({codigo: codigo})
        return new ProductoDto(dot)
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






