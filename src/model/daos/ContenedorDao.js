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
            throw new CustomError(500, `error al obtener un Documento por codigo en la coleccion ${this.coleccionName}`, err)
        }

        if (!buscado) {
            throw new CustomError(404, `Documento no encontrado en ${this.coleccionName} con ese ${JSON.stringify(query)}`)
        }
        return buscado
    }

    async listByQuery(query){
        try {
            const array = await this.collection.find(query).toArray()
            return array
        }
        catch (err) {
            throw new CustomError(500, `error al obtener todos los registros de la coleccion ${this.coleccionName}`, err)
        }

    }


    async add(data) {
        try {
            const { insertedId } = await this.collection.insertOne(data)
            return insertedId;
        }
        catch (err) {
            throw new CustomError(500, `error al Agregar un documento mongo en la coleccion ${this.coleccionName}`, err)
        }
    }

    async deleteById(query) {
        await this.collection.deleteOne(query, function (err, obj) {
            if (err) {
                throw new CustomError(500, `error al obtener todos los documento de la coleccion ${this.coleccionName}`, err)
            }
        });
    }

}
