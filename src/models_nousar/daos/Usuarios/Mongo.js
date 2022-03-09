import Contenedor from '../DaosBase/Mongo.js';
import logger from '../../../logger.js'

class Mongo extends Contenedor {

    constructor() {
        super( 'usuarios');
    }

    async getByUserName(username) {

        try {
            const [object] = await this.collection.find({ username: username }).toArray()
            return object
        }
        catch (err) {
            logger.error(err)
        }
    }

    async getByEmail(email) {

        try {
            const [object] = await this.collection.find({ email: email }).toArray()
            return object
        }
        catch (err) {
            logger.error(err)
        }
    }

    async listar( condiciones){
        try {
            return await this.collection.find(condiciones).toArray()
        }
        catch (err) {
            logger.error(err)
        }
    }

    update(usuario) {
        const { email, username, password, firstName, lastName, avatar } = usuario

        this.collection.updateOne(
            {
                email: email,
            },
            {
                '$set':
                {
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    avatar: avatar
                }
            })
            .then()
            .catch(err => { logger.error(err) })
    }

}

export function getInstancia()
{
    const instacia = new Mongo()
    return instacia;
}
