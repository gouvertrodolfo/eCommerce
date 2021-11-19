const { model } = require("../models/carrito");
const  myMongoose  = require("./myMongoose");

class MongooseCarritos extends myMongoose{

    constructor(){
        super()
    }

    async create(data){
        const carrito = new model.carrito( data )

        await carrito.save()
    }

    AddProducto(data){

        const carrito = new model.carrito(data)

        carrito.update(
            { _id: autorId },
            { $push: { productos: data } },
            (err, res) => {
                // verificar si hay error
                // manejar la respuesta
            })

        
    }

}
module.exports = MongooseCarritos