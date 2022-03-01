import { date } from 'joi'
import mongoose from 'mongoose'

/* --------------------------------------------------------------------- */
/*  Definición del esquema de documento y del modelo                     */
/*  (para poder interactuar con la base de datos: leer, escribir, etc)   */
/* --------------------------------------------------------------------- */
const mensajeSchema = new mongoose.Schema({
    id: String,
    email: String,
    tipo: String,
    fechayHora: Date,
    cuerpoMensaje: String
})

const usuarioModel = mongoose.model('mensajes', usuarioSchema)