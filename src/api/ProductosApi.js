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

    async listar(){
        const productos = await this.productosDao.getAll();
        return productos
    }

    async Obtener(id) {
        const dot = await this.productosDao.getById(id )
        return new ProductoDto(dot)
    }


    async modificar(data) {

        await this.productosDao.update(data)

        const dot = await this.productosDao.getById( data.id )
        return new ProductoDto(dot)
    }

    async borrar(id)
    {
        await this.productosDao.deleteById(id)
    }


    async existe(producto)
    //TODO

    {
        try{
            const arrayProductos = buscarXNombre(producto.nombre);
            if(arrayProductos.lenght == 0)
                return false
            else
            {
                arrayProductos.forEach(element => {
                    element.caracteristicas.forEach()
                });
            }
        }catch(err)
        {
            throw new CustomError(500, `error al obtener todos los registros de la coleccion ${this.coleccionName}`, err)
        }

    }

}






