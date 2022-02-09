import * as apiProducto from '../api/Producto.js';

export async function mdwObtenerProducto(req, res, next) {
    const { productoId } = req.params

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
    let object = req.body
    const producto = await apiProducto.crear(object)
    res.status(200).json(producto)
}

export async function actualizar(req, res) {
    const data = req.body
    const { productoId } = req.params
    try {
        const producto = await apiProducto.buscar(productoId)
        producto.modificar(data)
        res.status(200).json(producto)
    
    } catch (err) {
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


