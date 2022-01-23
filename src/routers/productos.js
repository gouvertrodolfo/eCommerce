import express from 'express'

const apiProductos = express.Router()

import Market from '../api/Market.js';
const market = new Market();


/* ------------------------------------------------------ */

// a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
apiProductos.get('/', async (req, res) => {
  const array = await market.getAllProductos()
  res.json(array);
});

// GET '/api/productos/:id' -> devuelve un producto según su id.
apiProductos.get('/:id', async (req, res) => {
  const  id  = req.params.id

  const producto = await market.getProductobyId( id )

  if (producto == undefined) {
    res.status(404).json({ error: 'producto no encontrado' })
  }
  else {
    res.json(producto)
  }
});

function mwdRoleAdministrador(req, res, next) {
  const role = req.headers['role'];
  if (role != 'Admin') {
    res.status(401).json({ error: 'ruta no autorizada' })
  }
  else {
    next()
  }
}

function mwdProductoValido(req, res, next) {
  let { nombre, precio } = req.body
  if (nombre.length < 2 || precio <= 0) {
    res.status(400).json({ error: 'El producto no tiene una estructura valida' })
  }
  else {
    next()
  }

}

// b. POST: '/' - Para incorporar productos al listado (disponible para administradores)
apiProductos.post('/', mwdRoleAdministrador, mwdProductoValido, (req, res) => {
  let object = req.body

  const producto = market.addProducto(object)

  res.json(producto)

});

// c. PUT: '/' - registrar los cambios echos en memoria al archivo
apiProductos.put('/', mwdRoleAdministrador, async (req, res) => {
  await market.commit()
  res.json()
});

// c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
apiProductos.put('/:id', mwdRoleAdministrador, (req, res) => {
  const { id } = req.params
  let data = req.body

  const producto = market.updateProducto(id, data)

  res.json(producto)
});

// d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
apiProductos.delete('/:id', mwdRoleAdministrador, (req, res) => {
  const { id } = req.params
  const array = market.delProducto(id)
  res.json(array)
});



const _apiProductos = apiProductos;
export { _apiProductos as apiProductos };