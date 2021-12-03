

import express from 'express'
const apiCarritos = express.Router()

import Market from "../api/Market.js";
const market = new Market()


// a. POST: '/' - Crea un carrito y devuelve su id.
apiCarritos.post('/', async (req, res) => {
  const { id } = await market.addCarrito()
  res.json(id)
});

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
apiCarritos.delete('/:id', (req, res) => {
  const { id } = req.params

  market.delCarrito(id)

  res.json()
});

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
apiCarritos.get('/:id/productos', async (req, res) => {
  const { id } = req.params
  const carrito = await market.getCarritobyId(id)
  const { listaProductos } = carrito
  res.json(listaProductos)
});

async function mdwObtenerCarrito(req, res, next) {
  const { id } = req.params
  req.carrito = await market.getCarritobyId(id)

  if (req.carrito == undefined) {
    res.status(404).json({ error: 'carrito no encontrado' })
  }

  next()
}

async function mdwObtenerProducto(req, res, next) {
  const { id_prod } = req.params
  req.producto = await market.getProductobyId(id_prod)

  if (req.producto == undefined) {
    res.status(404).json({ error: 'producto no encontrado' })
  }

  next()
}

// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
apiCarritos.post('/:id/productos/:id_prod', mdwObtenerCarrito, mdwObtenerProducto, (req, res) => {

  let { carrito, producto } = req

  const new_carrito = market.addProdutoAlCarrito(carrito, producto)

  res.json(new_carrito)

});

// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
apiCarritos.delete('/:id/productos/:id_prod', mdwObtenerCarrito, mdwObtenerProducto, async (req, res) => {
  let { carrito, producto } = req

  const new_carrito =  await market.delProdutoAlCarrito(carrito, producto)

  res.json(new_carrito)
});


export default  apiCarritos;