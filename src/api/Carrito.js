import { contenedor  } from "../models/daos/Carrito.js";
import NUID from 'nuid'

class Carrito {

    constructor(data) {

        const {email, _id, timestamp, listaProductos} = data

        this.email = email

        if (id == undefined) {
            this.timestamp = Date.now();
            this.listaProductos = [];
        }
        else{
            this.id = _id; 
            this.timestamp = timestamp;
            this.listaProductos = listaProductos;
        }
        
    };

    async agregarProducto(producto) {
        this.listaProductos.push(producto)
        contenedor.addProducto(producto)
        return this.listaProductos;
    }

    async quitarProducto(id_prod) {
        
        await contenedor.delProducto(this.id, id_prod)
        const {listaProductos} = await contenedor.getById(id)
        this.listaProductos = listaProductos

        return this.listaProductos;
    }

    listaProductos(){
        return this.listaProductos;
    }

    Confirmar(){
        throw `TODO api carrito confirmar`
    }

    eliminar(){
        contenedor.deleteById(this.id)
    }
}

export async function crear() {

    let carrito = new Carrito();
    await contenedor.create(carrito)
    return carrito;

}

export async function obtener(id){
    const data = contenedor.getById(id)
    if(data!=undefined){
        const carrito = new Carrito(data);
        return carrito;
    }
    else{
        throw `carrito ${id} no existe`
    }
}

