const Contenedor = require("./Contenedor");
const fs = require('fs');


class ContenedorProductos extends Contenedor{

    constructor(nombreArchivo){
        super(nombreArchivo);
    }

     // update(Object):  Recibe un objeto, que busca en el archivo y actualiza .
     async update(clave, data) {

        let items = await this.getAll()
        let array = [];

        items.forEach(element => {
            if (element.id == clave) {
                element.timeStamp = Date.now()
                element.title = data.title
                element.price = data.price
                element.thumbnail = data.thumbnail
                element.stock = data.stock
            }
        });

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(items));
        }
        catch (error) {
            console.log(`Error al guardar archivo ${error}`)
        }
    }
}

module.exports= ContenedorProductos