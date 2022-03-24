
import moment from 'moment'
import MensajeDao from '../model/daos/MensajesDao.js';

class Chat {
    
    constructor() {
        this.contenedor = new MensajeDao();
    }

    async getAll() {
        return await this.contenedor.getAll()
    }

    async AddMensaje(data) {
        data.fechayhora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        return await this.contenedor.add(data)
    }

    
}

export default Chat