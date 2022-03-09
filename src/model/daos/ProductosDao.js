import ContenedorDao from './ContenedorDao.js';
import CustomError from '../../errores/CustomError.js'

export default class ProductosDao extends ContenedorDao {

  constructor() {
    super('productos')
  }

}
