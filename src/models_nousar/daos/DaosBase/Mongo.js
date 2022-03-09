import { MongoClient, ObjectId } from 'mongodb';
import logger from '../../../logger.js'

const mongo_url = process.env.MONGO_URL 
const base = process.env.MONGO_BASE

const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });
await client.connect();

class Mongo {

    constructor(collection) {
        this.collection = client.db(base).collection(collection)
        logger.info(`Mongo Base:${base} collection: ${collection} instanciada`)
    }

    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async create(object) {

        const { insertedId } =  await this.collection.insertOne(object)
        return insertedId;
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

    async getByObjectId(id) {

        try {
            const [object] = await this.collection.find({ _id: ObjectId(id) }).toArray()

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
        this.collection.deleteOne({ id: id }, function (err, obj) {
            if (err) throw err;
            logger.error("1 document deleted");
        });
    }

}

export default Mongo