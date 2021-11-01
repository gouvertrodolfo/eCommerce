const Contenedor = require("./Contenedor");
const Carrito = require("./Carrito");
const fs = require('fs');


class ContenedorCarritos {
    
    constructor(NombreArchivo) {
        this.archivo = new Contenedor('carritos.json')
    }

    async init()
    {
        this.listaCarritos = await this.archivo.getAll();
    }
    
    async commit() {
        this.archivo.save(this.listaCarritos)        
    }

    nextId(){
        let id = 0
        this.listaCarritos.forEach(item=> {
            if (item.id>id) {
                id=item.id;
            }
        });

        return id
    }

    addCarrito(){

        let carrito = new Carrito(this.nextId()+1);
                
        this.listaCarritos.push(carrito);
        
        return this.listaCarritos
    }

    getCarrito(id){
        JSON.parse(this.listaCarritos).forEach(element => {
            if(element.id = id){
                return element
            }
        });
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