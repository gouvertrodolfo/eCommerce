import dotenv from 'dotenv'

dotenv.config()
let contenedor ;

export function getinstancia(){

    if (process.env.PRODUCTOS_TIPO_PERSISTENCIA == 'MONGO') {
        contenedor= 'Mongo'

    } else {
        contenedor= 'Firebase'    
    }

    const instancia = import(`./productos/${contenedor}`)
    .then(module => module.getinstancia());

    return instancia;    
}
