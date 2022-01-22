import dotenv from 'dotenv'

dotenv.config()
const tipo_persistencia = process.env.PRODUCTOS_TIPO_PERSISTENCIA


import contenedorProductos from './productos/Firebase.js'



export default contenedorProductos;