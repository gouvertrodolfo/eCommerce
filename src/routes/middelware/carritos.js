
export async function mdwObtenerCarrito(req, res, next) {
  const { id } = req.params
  req.carrito = await market.getCarritobyId(id)

  if (req.carrito == undefined) {
    res.status(404).json({ error: 'carrito no encontrado' })
  }

  next()
}


