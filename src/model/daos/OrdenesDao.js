import ContenedorDao from './ContenedorDao.js';


export default class OrdenesDao extends ContenedorDao {

  constructor() {
    super('ordenes')
  }

  async delete(email) {
    await super.deleteById({ email: email })
  }

}
