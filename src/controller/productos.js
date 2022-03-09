
import ProductosApi from '../api/ProductosApi.js';
import schema from '../validations/productos.js';

const productos = new ProductosApi(); 

export async function listar(req, res) {
    const array = await productos.listar()
    res.json(array);
}

export async function buscar(req, res) {
    const { productoId } = req.params
    try {
        const producto = await productos.buscar(productoId)
        res.status(200).json(producto)
    } catch (err) {
        res.status(400).json(err)
    }
};

export async function crear(req, res) {
    try {
        const data = await schema.validateAsync(req.body)
        const producto = await productos.agregar(data)
        res.status(201).json(producto)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

export async function actualizar(req, res) {
    const data = req.body
    // const { codigo } = req.params
    try {
        // const producto = await apiProducto.buscarxCodigo(codigo)
        productos.modificar(data)
        res.status(200).json(producto)
    } 
    catch (err) {
        res.status(400).json(err)
    }
}

export async function borrar(req, res) {
    const { productoId } = req.params
    try {
        productos.borrar(productoId);
        res.status(204).json('ok')
    } catch (err) {
        res.status(400).json(err)
    }

}


