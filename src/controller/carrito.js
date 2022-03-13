import CarritosApi from '../api/CarritosApi.js'
import ProductosApi from '../api/ProductosApi.js'
import logger from '../logger.js';

const carritos = new CarritosApi();
const productos = new ProductosApi();

export async function mdwValidarProducto(req, res, next) {
    const { id, cantidad } = req.body
    if (id == undefined) {
        logger.error('Error al obtener el identificador del producto');
        res.status(400).json({ descripcion: 'Error al obtener el identificador del producto' })
    }
    else {
        try {
            const producto = await productos.Obtener(id)
            req.producto = producto
            next()
        }
        catch (err) { res.status(err.estado).json(err) }
    }
}


export async function obtener(req, res) {
    const { email } = req.user

    try {
        const carrito = await carritos.obtener(email)
        res.status(200).json(carrito)
    } catch (err) {
        res.status(err.estado).json(err)
    }
}

export async function agregarProducto(req, res) {

    const { email } = req.user
    const producto = req.producto

    try {

        const carrito = await carritos.agregarProducto(email, producto)
        res.status(201).json(carrito)

    } catch (err) {
        res.status(err.estado).json(err)
    }

}
export async function quitarProducto(req, res) {

    const { email } = req.user
    const producto = req.producto

    try {
        const carrito = carritos.quitarProducto(email, productoId)
        res.status(204).json(carrito)
    } catch (err) {
        res.status(err.estado).json(err)
    }

}




