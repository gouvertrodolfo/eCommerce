import OrdenesApi from '../api/OrdenesApi.js'
const ordenes = new OrdenesApi();


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
        const orden = await ordenes.obtener(email)
        res.status(200).json(carrito)
    } catch (err) {
        res.status(err.estado).json(err)
    }
}
