import ContenedorDao from './ContenedorDao.js';
// import CustomError from '../../errores/CustomError.js'

export default class CarritosDao extends ContenedorDao {

  constructor() {
    super('carritos')
  }

  async addProducto(email, producto) {

    await this.collection.updateOne(
      { email: email },
      { '$push': { productos: producto } })

    return await super.getById({ email: email })
  }


  async delProducto(email, id) {

    await this.collection.updateOne(
      { email: email },
      { '$pull': { productos: { id: { $eq: id } } } }
    )

    return await super.getById({ email: email })
  }

  async delete(email){
    await super.deleteById({email : email})
  }

}
