import * as apiCarrito from '../api/Carrito.js'
import {buscar as obtenerProducto} from '../api/Producto.js'
export async function crear(req, res) {
    const { id } = await apiCarrito.crear()
    res.json(id)
}

export async function agregarProducto(req, res) {

    const { id, productoId } = req.params
    try {
        const [ carrito, producto] = await Promises.all([ apiCarrito.obtener(id),  obtenerProducto(productoId)])
        carrito.agregarProducto(producto)
        res.status(200).json(carrito.listaProductos())
    }catch(err)
    {
        res.status(400).json({error:err})
    }
    const new_carrito = market.addProdutoAlCarrito(carrito, producto)
    res.json(new_carrito)

}
export async function quitarProducto(req, res) {
    const { id, productoId } = req.params
    try {
        const carrito = await apiCarrito.obtener(id)
        carrito.quitarProducto(productoId)
        res.status(200).json(carrito.listaProductos())
    }catch(err)
    {
        res.status(400).json({error:err})
    }

}
export async function listaProductos(req, res) {
    const { id } = req.params
    try {
        const carrito = await apiCarrito.obtener(id)
        res.status(200).json(carrito.listaProductos())
    }catch(err)
    {
        res.status(400).json({error:err})
    }
}
export async function borrar(req, res) {
    const { id } = req.params
    try {
        const carrito = await apiCarrito.obtener(id)
        carrito.eliminar()
        res.status(200).json()
    }catch(err)
    {
        res.status(400).json({error:err})
    }
}

export async function finalizar(req, res){
    const { id } = req.params
    try {
        const carrito = await apiCarrito.obtener(id)
        carrito.Confirmar()
        res.status(200).json()
    }catch(err)
    {
        res.status(400).json({error:err})
    }
}




