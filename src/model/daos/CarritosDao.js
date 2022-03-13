import ContenedorDao from './ContenedorDao.js';
// import CustomError from '../../errores/CustomError.js'

export default class CarritosDao extends ContenedorDao {

  constructor() {
    super('carritos')
  }

  async addProducto(email, producto) {

    await this.collection.updateOne(
      { email: email },
      {'$push': { productos: producto } })

    return await super.getById({email:email})
  }


}
