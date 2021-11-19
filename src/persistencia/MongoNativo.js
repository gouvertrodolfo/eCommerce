const { MongoClient } = require('mongodb');
const { database } = require("../../options/mongoDB");

class MongoNativo {

    constructor(base, collection) {

        const client = new MongoClient(database.url, { serverSelectionTimeOutMS: 5000 });

        client.connect();

        this.collection = client.db(base).collection(collection)
    }

    async getNextId() {
        try {
            const [{ id }] = await this.collection.find().sort({ id: -1 }).limit(1).toArray()
            return id + 1

        }
        catch {
            return 1;
        }
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

    async create(object) {

        object.id = await this.getNextId()

        this.collection.insertOne(object)
            .then()

        return object
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

module.exports = MongoNativo