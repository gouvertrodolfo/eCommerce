const apiCarritos = require('express').Router();

const Carritos = require("../api/Carritos")
const carritos = new Carritos()
carritos.init();

const listaProductos = require("../api/Productos")
const inventario = new listaProductos()
inventario.init();

// a. POST: '/' - Crea un carrito y devuelve su id.
apiCarritos.post('/', (req, res) => {
  const { id } = carritos.addCarrito()
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
apiCarritos.get('/:id/productos',  (req, res) => {
  const { id } = req.params
  const { listaProductos } = carritos.getCarrito(id)
  res.json(listaProductos)
});

function mdwObtenerCarrito(req, res, next) {
  const { id } = req.params
  req.carrito = carritos.getCarrito(id)

  if (req.carrito == undefined) {
    res.status(404).json({ error: 'carrito no encontrado' })
  }

  next()
}

function mdwObtenerProducto(req, res, next) {
  const { id_prod } = req.params
  req.producto = inventario.getProductobyId(id_prod)

  if (req.producto == undefined) {
    res.status(404).json({ error: 'producto no encontrado' })
  }

  next()
}

// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
apiCarritos.post('/:id/productos/:id_prod', mdwObtenerCarrito, mdwObtenerProducto,  (req, res) => {

  let {carrito, producto } = req
  carrito.addProducto(producto)
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