import { contenedor  } from "../models/daos/Carrito.js";
import logger from "../logger.js";

class Carrito {

    constructor(data) {

        const {email, _id, timestamp, listaProductos} = data

        this.email = email

        if (_id == undefined) {
            this.timestamp = Date.now();
            this.listaProductos = [];
        }
        else{
            this._id = _id; 
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

export async function crear(email) {

    const data = {email:email};
    const carrito = new Carrito(data);
    try{
        await contenedor.create(carrito);
    }catch(err)
    {
        logger.error(`Error al registrar el carrito ${email} error:${err}`);
    }
    return carrito;
}

export async function obtener(email){
    let data = await contenedor.getByEmail(email)
    let carrito
    if(data!=undefined){
        carrito = new Carrito(data);
    }
    else{
                carrito = await crear(email);
    }
    return carrito;
}

