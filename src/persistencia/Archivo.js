const fs = require('fs');

 class Archivos{

    constructor(NombreArchivo){
        this.ruta=`./archivos/${NombreArchivo}`
        this.encoding='utf-8'
    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll(){
        let array = await fs.promises.readFile(this.ruta, this.encoding)
        .then(JSON.parse)
        .catch(()=>{return []})

        return array
    }

    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(object){
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(object));
        }
        catch(error){
            console.log(`Error al guardar archivo ${error}` )
        }
    }
    
    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(clave){
        const items = await this.getAll()

        for (const element of items) {
            if (element.id==clave) {
                return element
            } 
        }
    }
  
    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(clave){
     
        let items = await fs.promises.readFile(this.ruta, this.encoding)
        .then(JSON.parse)
        .catch(()=>{return [] })
        
        let array=[];

        items.forEach(element => {
            if (element.id!=clave) {
                array.push(element);
            } 
        });

        await fs.promises.writeFile(this.ruta, JSON.stringify(array));
    }
    
    // deleteAll(): void - Elimina todos los objetos presentes en el archivo
    async deleteAll(){
        const items=[]
        await fs.promises.writeFile(this.ruta, JSON.stringify(items));
    }

}

module.exports= Archivos