const { Router } = require('express');

const apiCarritos = Router();
const Contenedor = require("../Contenedor")
const carritos = new Contenedor('carrito.txt')
const inventario = new Contenedor('productos.txt')


// a. POST: '/' - Crea un carrito y devuelve su id.
apiCarritos.post('/', async (req, res) => {
  const carrito= {
    "listaProductos": []
  }
  
  const id = await carritos.save(carrito)
  res.json(id)
});

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
apiCarritos.delete('/:id', async (req, res) => {
  const id = req.params
  await carritos.deleteById(Id)
  res.json()
});

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
apiCarritos.get('/:id/productos', async (req, res) => {
  const id = req.params
  const { listaProductos } = await carritos.getById(Id)
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
apiCarritos.post('/:id/productos', mdwObtenerCarrito, mdwObtenerProducto, async (req, res) => {
  const carrito = req.carrito
  carrito.listaProductos.push(req.producto)
  await carritos.update(carrito)
  res.json(carrito.listaProductos)
});

// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
apiCarritos.delete('/:id/productos/:id_prod', mdwObtenerCarrito, mdwObtenerProducto, async (req, res) => {
  const carrito = req.carrito
  carrito.listaProductos.push(req.producto)
  await carritos.update(carrito)
  res.json(carrito.listaProductos)
});


exports.apiCarritos = apiCarritos;