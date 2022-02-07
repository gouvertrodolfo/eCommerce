

function mwdProductoValido(req, res, next) {
    let { nombre, precio } = req.body
    if (nombre.length < 2 || precio <= 0) {
        res.status(400).json({ error: 'El producto no tiene una estructura valida' })
    }
    else {
        next()
    }

}

export { mwdProductoValido }