const mongoose = require('mongoose');

const collection_carritos = 'carritos';

const schema_producto = mongoose.Schema({
    codigo: { type: String, required: true, max: 100 },
    timestamp: { type: Date, required: true},
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true, max: 100 },
    stock: { type: Number, required: true }
});

const schema_carrito = mongoose.Schema({
    timestamp: { type: Date, required: true},
    productos:[schema_producto]
})

const Carrito = mongoose.model(collection_carritos, schema_carrito);

module.exports = Carrito;