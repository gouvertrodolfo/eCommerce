import * as apiCarrito from '../api/Carrito.js'
import { buscar as obtenerProducto } from '../api/Producto.js'
import logger from '../logger.js';

export function mdwValidarEmail(req, res, next) {
    const { email } = req.user;

    if (email == undefined) {
        logger.error('Error al obtener el identificador del carrito')
        res.status(400).json({ descripcion: 'Error al obtener el identificador del carrito' })
    }
    else {
        req.email = email;
        next()
    }
}

export function mdwValidarProductoId(req, res, next) {
    const { productoId } = req.params
    if (productoId == undefined) {
        logger.error('Error al obtener el identificador del producto');
        res.status(400).json({ descripcion: 'Error al obtener el identificador del producto' })
    }
    else
        req.productoId = productoId
        next()
}


export async function obtener(req, res) {
     console.log(`controller carrito obtener email:${req.email}`)
    try {
        const carrito = await apiCarrito.obtener(req.email)
        res.status(200).json(carrito)
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

export async function agregarProducto(email, productoId, res) {


    try {
        const [carrito, producto] = await Promises.all([apiCarrito.obtener(req.email), obtenerProducto(req.productoId)])
        carrito.agregarProducto(producto)
        res.status(201).json(carrito)

    } catch (err) {
        res.status(400).json({ error: err })
    }

}
export async function quitarProducto(email, productoId, res) {

    try {
        const carrito = await apiCarrito.obtener(req.email)
        carrito.quitarProducto(req.productoId)
        res.status(204).json(carrito)
    } catch (err) {
        res.status(400).json({ error: err })
    }

}




