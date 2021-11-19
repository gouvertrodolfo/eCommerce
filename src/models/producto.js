const mongoose = require('mongoose');

const schema_producto = mongoose.Schema({
    codigo: { type: String, required: true, max: 100 },
    timestamp: { type: Date, required: true},
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true, max: 100 },
    stock: { type: Number, required: true },

});

const Producto = mongoose.model('productos', schema_producto);

module.exports = Producto;