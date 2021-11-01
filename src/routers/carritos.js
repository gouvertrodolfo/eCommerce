const apiCarritos = require('express').Router();

const listaCarritos = require("../ContenedorCarritos")
const carritos = new listaCarritos()
carritos.init();

const listaProductos = require("../ContenedorProductos")
const inventario = new listaProductos()

// a. POST: '/' - Crea un carrito y devuelve su id.
apiCarritos.post('/', async (req, res) => {

  const id = await carritos.addCarrito()
  res.json(id)

});

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
apiCarritos.delete('/:id', (req, res) => {
  const { id } = req.params
  const lista = carritos.delCarrito(id)
  res.json(lista)

});

apiCarritos.put('/', async (req, res) => {
  await carritos.commit();
  res.json()
})

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
apiCarritos.get('/:id/productos', async (req, res) => {
  const { id } = req.params
  const { listaProductos } = await carritos.getById(id)
  res.json(listaProductos)
});

async function mdwObtenerCarrito(req, res, next) {
  const { id } = req.params
  req.carrito = await carritos.getById(id)

  if (req.carrito == undefined) {
    res.status(404).json({ error: 'carrito no encontrado' })
  }

  next()
}

async function mdwObtenerProducto(req, res, next) {
  const { id_prod } = req.params
  req.producto = await inventario.getById(id_prod)

  if (req.producto == undefined) {
    res.status(404).json({ error: 'producto no encontrado' })
  }

  next()
}

// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
apiCarritos.post('/:id/productos/:id_prod', mdwObtenerCarrito, mdwObtenerProducto, async (req, res) => {
  let carrito = req.carrito
  carrito.listaProductos.push(req.producto)

  await carritos.update(carrito.id, carrito)
  res.json(carrito)
});

// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
apiCarritos.delete('/:id/productos/:id_prod', mdwObtenerCarrito, mdwObtenerProducto, async (req, res) => {
  let carrito = req.carrito
  carrito.listaProductos.push(req.producto)

  await carritos.update(carrito.id, carrito)
  res.json(carrito)
});


exports.apiCarritos = apiCarritos;