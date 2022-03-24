
import ProductosApi from '../api/ProductosApi.js';
import schema from '../validations/productos.js';

const productos = new ProductosApi();

export async function listar(req, res) {
    const array = await productos.listar()
    res.json(array);
}

export async function buscar(req, res) {
    const { id } = req.params
    try {
        const producto = await productos.Obtener(id)
        res.status(200).json(producto)
    } catch (err) {
        res.status(err.estado).json(err.descripcion)
    }
};

export async function crear(req, res) {
    
    let data
    try {
        data = await schema.validateAsync(req.body)
    } catch (err) { res.status(400).json({ descripcion: err }) }

    try {
        const producto = await productos.agregar(data)
        res.status(201).json(producto.get())
    }
    catch (err) {
        res.status(err.estado).json(err.descripcion)
    }
}

export async function actualizar(req, res) {
  

    try {
        const produc = await productos.modificar(req.body)
        res.status(201).json(produc)
    }
    catch (err) {
        res.status(err.estado).json(err.descripcion)
    }
}

export async function borrar(req, res) {
    const { id } = req.params
    try {
        productos.borrar(id);
        res.status(204).json()
    } catch (err) {
        res.status(err.estado).json(err.descripcion)
    }

}


