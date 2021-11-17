const ContenedorMongo = require('./ContenedorMongo');

class CarritosMongo extends ContenedorMongo {

    constructor() {
        super('eCommerce', 'carrito');
    }


}
module.exports = CarritosMongo