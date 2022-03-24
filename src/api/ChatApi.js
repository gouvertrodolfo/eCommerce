
import moment from 'moment'
import MensajeDao from '../model/daos/MensajesDao.js';

class ChatApi {
    
    constructor() {
        this.contenedor = new MensajeDao();
    }

    async getAll() {
        return await this.contenedor.getAll()
    }

    async AddMensaje(data) {
        data.fechayhora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        await this.contenedor.add(data)
        return await this.contenedor.getAll()
    }

    
}

export default ChatApi