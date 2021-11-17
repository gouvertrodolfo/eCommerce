const { MongoClient } = require('mongodb');
const { database } = require("../../options/mongoDB");

class ContenedorMongo {

    constructor(base, collection) {

        const client = new MongoClient(database.url, { useNewUrlParser: true, useUnifiedTopology: true });

        client.connect();

        this.collection = client.db(base).collection(collection)
    }

    async getNextId() {
        const [{ id }] = await this.collection.find().sort({ id: -1 }).limit(1).toArray()
        return id + 1
    }

    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async create(object) {

        object.id = await this.getNextId()

        this.collection.insertOne(object)
            .then()
            .catch(err => { console.log(err) })

        return object
    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    getAll() {
        const array = this.collection.find().toArray()
            .then()
            .catch([])

        return array
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

}

module.exports = ContenedorMongo