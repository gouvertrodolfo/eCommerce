const Contenedor = require("./Contenedor");
const Producto = require("./Productos")


class ContenedorProductos {

    constructor() {
        this.archivo = new Contenedor('productos.json');
    }

    async init() {
        this.listaProductos = await this.archivo.getAll();
    }

    async commit() {
         await this.archivo.save(this.listaProductos);
    }


    nextId() {
        let id = 0
        this.listaProductos.forEach(item => {
            if (item.id > id) {
                id = item.id;
            }
        });

        return id
    }

    addProducto(object) {
        const { nombre, descripcion, precio, thumbnail, stock } = object
        let producto = new Producto(this.nextId() + 1, nombre, descripcion, precio, thumbnail, stock)
        this.listaProductos.push(producto);
        return producto
    }

    getAllProductos() {
        return this.listaProductos;
    }

    getProductobyId(id) {
        let producto;
        this.listaProductos.forEach(element => {
            if (element.id = id) {
                producto=element
            }
        });
        return producto;
    }

        updateProducto(id, data){
            let producto = this.getProductobyId(id)        
            producto.update(data);
            

        // const { codigo, nombre, descripcion, precio, thumbnail, stock } = object
        // if (codigo != undefined) {
        //     producto.codigo = codigo
        // }

        // producto.timestamp = Date.now()

        // if (nombre != undefined) {
        //     producto.nombre = nombre;
        // }
        // if (descripcion != undefined) {
        //     producto.descripcion = descripcion;
        // }
        // if (precio != undefined) {
        //     producto.precio = precio
        // }
        // if (thumbnail != undefined) {
        //     producto.thumbnail = thumbnail
        // }
        // if (stock != undefined) {
        //     producto.stock = stock
        // }
        
        return producto
    }

    delProducto(id){
        let array = []

        this.listaProductos.forEach(element => {
            if (element.id != id) {
                array.push(element)
            }
        });
        this.listaProductos = array;
        return this.listaProductos;
    }

}

module.exports = ContenedorProductos