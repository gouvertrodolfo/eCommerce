import { MongoClient } from 'mongodb';
import fs from 'fs'

const {mongo_url} = JSON.parse(await fs.promises.readFile('./options/config.json', 'utf-8'))

const client = new MongoClient(mongo_url, { serverSelectionTimeOutMS: 5000 });
await client.connect();

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
            const [object] = await this.collection.find({ id: Number.parseInt(id) }).toArray()
            return object
        }
        catch (err) {
            console.log(err)
        }
    }

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo
    async deleteAll() {
        this.collection.findOne({}).deleteAll()
    }

    async deleteById(id) {
        this.collection.deleteOne({ id: Number.parseInt(id) }, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
        });
    }

}

export default Mongo