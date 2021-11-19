const mongoose= require('mongoose');
const { database } = require("../../options/mongoDB");

class myMongoose {

    constructor() {

        this.client =  mongoose.connect('mongodb://root:1234@localhost:27017/eCommerce', {
            serverSelectionTimeOutMS:5000
        })      
        
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
            .then(console.log)

    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        const array = await this.collection.find().toArray()

        return array
    }

    async getById(valor) {
        
        try{
            const object = await this.collection.find({ id: {$eq:valor} })

            console.log(object)
            return object
        }
        catch(err){
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

    deleteById(id) {
        this.collection.find({ id: id }).delete()

        return array
    }


}

module.exports = myMongoose