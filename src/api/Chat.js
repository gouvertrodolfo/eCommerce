
const moment = require('moment')
const contenedor = require('../daos/ContenedorMensajes')


class Chat {
    
    constructor() {
        
    }

    async getAll() {
        return await contenedor.getAll()
    }

    async AddMensaje(data) {

        data.fechayhora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');

        return await contenedor.create(data)
    }

}

module.exports = Chat