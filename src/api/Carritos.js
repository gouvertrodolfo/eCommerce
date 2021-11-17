const Contenedor = require("../persistencia/carritoMongo");
const Carrito = require("./Carrito");
const fs = require('fs');


class Carritos {
    
    constructor(NombreArchivo) {
        this.Contenedor = new Contenedor()
    }

    
    addCarrito(){

        let carrito = new Carrito({id: 0});
        carrito = this.Contenedor.create(carrito)

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
module.exports= Carritos