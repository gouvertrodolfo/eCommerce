import CarritosApi from '../api/CarritosApi.js'
import ProductosApi from '../api/ProductosApi.js'
import {schemaAddProducto, schemaDelProducto} from '../validations/carrito.js'

const carritos = new CarritosApi();
const productos = new ProductosApi();

export async function mdwValidarAddProducto(req, res, next) {
    let data
    try {
        data = await schemaAddProducto.validateAsync(req.body)
    } catch (err) {
        res.status(400).json({ descripcion: err })
    }

    try {
        const producto = await productos.Obtener(data.id)
        req.producto = producto
        req.cantidad = data.cantidad
        next()
    }
    catch (err) { 
        console.log(err)
        res.status(err.estado).json(err) 
    }
}
export async function mdwValidarDelProducto(req, res, next) {
    let data
    try {
        data = await schemaDelProducto.validateAsync(req.body)
    } catch (err) {
        res.status(400).json({ descripcion: err })
    }

    req.producto_id = data.id
    next()
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
    const cantidad = req.cantidad

    try {

        const carrito = await carritos.agregarProducto(email, producto, cantidad)
        res.status(201).json(carrito)

    } catch (err) {
        res.status(err.estado).json(err)
    }

}
export async function quitarProducto(req, res) {

    const { email } = req.user
    const producto_id = req.producto_id

    try {
        const carrito = await carritos.quitarProducto(email, producto_id)
        res.status(201).json(carrito)
    } catch (err) {
        res.status(err.estado).json(err)
    }

}

export async function eliminar(req, res) {

    const { email } = req.user

    try {
        await carritos.eliminar(email)
        res.status(204).json()
    } catch (err) {
        res.status(err.estado).json(err)
    }

}





