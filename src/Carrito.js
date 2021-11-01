const Contenedor = require("./Contenedor");
const fs = require('fs');

class Carrito{

    constructor(id){
        this.listaProductos = [];
        this.id = id
        this.timestamp = Date.now();
    };

    addProducto(producto) {
        listaProductos.push(producto)      
        return listaProductos.length();  
    }

    delProducto(id_prod){
        let array = []

        this.listaProductos.forEach(element => {
            if(element.id != id_prod){
                array.push(element);
            }
            
        });

        this.listaProductos = array;

        return this.listaProductos;
    }


}

module.exports= Carrito