import CarritosApi from '../api/CarritosApi.js'
import ProductosApi from '../api/ProductosApi.js'
import logger from '../logger.js';

const carritos = new CarritosApi();
const productos = new ProductosApi(); 




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

    try {
        const carrito = await carritos.obtener(req.email)
        res.status(200).json(carrito)
    } catch (err) {
        res.status(err.estado).json({ descripcion: err.descripcion, detalle: err.detalle })
    }
}

export async function agregarProducto(req, res) {

    try {
        const producto = await  productos.buscar(req.productoId)
        carritos.agregarProducto(req.email, producto)
        res.status(201).json(carrito)

    } catch (err) {
        res.status(err.estado).json({ descripcion: err.descripcion, detalle: err.detalle })
    }

}
export async function quitarProducto(req, res) {

    try {

        carritos.quitarProducto(req.email, req.productoId)
        res.status(204).json(carrito)
    } catch (err) {
        res.status(err.estado).json({ descripcion: err.descripcion, detalle: err.detalle })
    }

}




