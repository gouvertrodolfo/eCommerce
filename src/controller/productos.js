import { query } from 'express';
import * as apiProducto from '../api/Producto.js';
import schema from '../validations/productos.js';

export async function listar(req, res) {
    const array = await apiProducto.listar()
    res.json(array);
}

export async function buscar(req, res) {
    const { productoId } = req.params
    try {
        const producto = await apiProducto.buscar(productoId)
        res.status(200).json(producto)
    } catch (err) {
        res.status(400).json(err)
    }
};

export async function crear(req, res) {

    try {
        const data = await schema.validateAsync(req.body)
        const producto = await apiProducto.crear(data)
        res.status(200).json(producto)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

export async function actualizar(req, res) {
    const data = req.body
    const { productoId } = req.params
    try {
        const producto = await apiProducto.buscar(productoId)
        producto.modificar(data)
        res.status(200).json(producto)
    } 
    catch (err) {
        res.status(400).json(err)
    }
}

export async function borrar(req, res) {
    const { productoId } = req.params
    try {
        const producto = await apiProducto.buscar(productoId)

        producto.borrar();
        res.status(200).json('ok')

    } catch (err) {
        res.status(400).json(err)
    }

}


