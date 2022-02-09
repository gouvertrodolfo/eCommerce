import * as apiProducto from '../api/Producto.js';

export async function mdwObtenerProducto(req, res, next) {
    const { productoId } = req.params

    const producto = await apiProducto.buscar(productoId)

    if (producto == undefined) {
        res.status(400).json({ error: 'producto no encontrado' })
    }
    req.producto = producto

    next();
};


export async function listar(req, res) {
    const array = await apiProducto.listar()
    res.json(array);
}


export async function exponer(req, res) {
    const producto = req.producto;
    res.status(200).json(producto)

};

export async function crear(req, res) {
    let object = req.body
    const producto = await apiProducto.crear_prod(object)
    res.status(200).json(producto)
}

export function actualizar(req, res) {
    const producto = req.producto;
    const data = req.body
    producto.modificar(data)
    res.status(200).json(producto)
}

export function borrar(req, res) {
    const producto = req.producto;
    try {
        producto.borrar()
        res.status(200).json({ 'message': 'producto eliminado' })
    } catch (err) { res.json(err) }

}


