import ContenedorDao from './ContenedorDao.js';
import CustomError from '../../errores/CustomError.js'

export default class ProductosDao extends ContenedorDao {

  constructor() {
    super('productos')
  }

  async update({
    id,
    nombre,
    descripcion,
    precio,
    stock,
    categoria,
    caracteristicas
  }) {

    try {
      await this.collection.updateOne(
        {
          id: id
        },
        {
          '$set':
          {
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            stock: stock,
            categoria: categoria,
            caracteristicas: caracteristicas
          }
        })

    } catch (err) {
      logger.error(err)
      throw new CustomError(500, 'error al moduficar un producto por codigo', err)
    }
  }

  async updateStock( id, stock ) {

    try {
      await this.collection.updateOne(
        {
          id: id
        },
        {
          '$set':
          {
            stock: stock
          }
        })

    } catch (err) {
      logger.error(err)
      throw new CustomError(500, 'error al moduficar un producto por codigo', err)
    }
  }


  async getById(id) {
    return await super.getById({ id: id })
  }


  async deleteById(id) {
    return await super.deleteById({ id: id })
  }

  async buscarXNombre(nombre) {
    return await super.listByQuery({ nombre: nombre })
  }

}
