import { MongoClient, ObjectId } from 'mongodb';
import logger from '../../logger.js'
import CustomError from '../../errores/CustomError.js'

const mongo_url = process.env.MONGO_URL
const base = process.env.MONGO_BASE

const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });
await client.connect();

export default class ContenedorDao {

    constructor(collection) {
        this.coleccionName = collection
        this.collection = client.db(base).collection(collection)
        logger.info(`Mongo Base:${base} collection: ${collection} instanciada`)
    }

    async getAll() {
        try {
            const array = await this.collection.find().toArray()
            return array
        }
        catch (err) {
            throw new CustomError(500, `error al obtener todos los registros de la coleccion ${this.coleccionName}`, err)
        }
    }

    async getById(query) {

        let buscado
        try {
            buscado = await this.collection.findOne(query);
            
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, 'error al obtener un registro por codigo', err)
        }

        if (!buscado) {
           throw new CustomError(404, `registro no encontrado con ese ${JSON.stringify(query)}`)
        }
        return buscado

    }

    async add(data) {
        const { insertedId } = await this.collection.insertOne(data)
        return insertedId;
    }

    async deleteById(query) {
        this.collection.deleteOne({ codigo: codigo }, function (err, obj) {
          if (err)
            throw new CustomError(500, 'error al obtener todos los productos', err)
          logger.error("1 document deleted");
        });
      }

}
