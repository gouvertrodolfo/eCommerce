

export function mwdProductoValido(req, res, next) {
    let { nombre, precio } = req.body
    if (nombre.length < 2 || precio <= 0) {
        res.status(400).json({ error: 'El producto no tiene una estructura valida' })
    }
    else {
        next()
    }

}

// export async function mdwObtenerProducto(req, res, next) {
//     const { idproductoId } = req.params
//     req.producto = await apiProducto.buscar(id)
  
//     if (req.producto == undefined) {
//       res.status(404).json({ error: 'producto no encontrado' })
//     }
  
//     next()
//   }
  
