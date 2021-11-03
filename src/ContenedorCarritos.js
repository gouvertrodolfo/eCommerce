const Contenedor = require("./Contenedor");
const Carrito = require("./Carrito");
const fs = require('fs');


class ContenedorCarritos {
    
    constructor(NombreArchivo) {
        this.archivo = new Contenedor('carritos.json')
    }

    async init()
    {
        let dtos = await this.archivo.getAll();
        this.listaCarritos = dtos.map(dto => new Carrito(dto))
    }
    
    async commit() {
        this.archivo.save(this.listaCarritos)        
    }

    nextId(){
        let id = 0
        this.listaCarritos.forEach(item=> {
            if (item.id > id) {
                id=item.id;
            }
        });

        return id
    }

    addCarrito(){

        let carrito = new Carrito({id: this.nextId()+1});
        // carrito.id = this.nextId()+1;                        
        this.listaCarritos.push(carrito);
        
        return carrito;
    }

    getCarrito(id){
        for (const element of this.listaCarritos) {
            if (element.id == id) {
                return element
            }
        }
    }

    delCarrito(id){
        let array=[]

        this.listaCarritos.forEach(element => {
            if(element.id != id){
                array.push(element)
            }
        });

        this.listaCarritos=array;

        return this.listaCarritos;
    }



 
}
module.exports= ContenedorCarritos