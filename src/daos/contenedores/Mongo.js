import { MongoClient } from 'mongodb';
import logger from '../../logger.js'

const mongo_url = process.env.PRODUCTOS_URL 

const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });
await client.connect();
logger.info('Contenedor Mongo Base conectada')

class Mongo {

    constructor(base, collection) {
        this.collection = client.db(base).collection(collection)
    }

    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async create(object) {

        await this.collection.insertOne(object)
            .then()
    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        const array = await this.collection.find().toArray()

        return array
    }

    async getById(id) {

        try {
            const [object] = await this.collection.find({ id: id }).toArray()
            return object
        }
        catch (err) {
            logger.error(err)
        }
    }

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo
    async deleteAll() {
        this.collection.findOne({}).deleteAll()
    }

    async deleteById(id) {
        this.collection.deleteOne({ id: Number.parseInt(id) }, function (err, obj) {
            if (err) throw err;
            logger.error("1 document deleted");
        });
    }

}

export default Mongo