import Market from '../api/Market.js';
const market = new Market();

async function listarTodo(req, res) {
    const array = await market.getAllProductos()
    res.json(array);
}

async function buscarxId(req, res) {
    const id = req.params.id

    const producto = await market.getProductobyId(id)

    if (producto == undefined) {
        res.status(404).json({ error: 'producto no encontrado' })
    }
    else {
        res.json(producto)
    }
};

async function crear(req, res) {
    let object = req.body
    const producto = market.addProducto(object)
    res.json(producto)
}

function actualizar(req, res) {
    const { id } = req.params
    let data = req.body
    const producto = market.updateProducto(id, data)
    res.json(producto)
}

function borrar (req, res) {
    const { id } = req.params
    const array = market.delProducto(id)
    res.json(array)
  }

export { listarTodo, buscarxId, crear, actualizar, borrar }