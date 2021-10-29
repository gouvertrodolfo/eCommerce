const { Router } = require('express');

const apiProductos = Router();
const Contenedor = require("../Contenedor")
const inventario = new Contenedor('productos.txt')

/* ------------------------------------------------------ */

// a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
apiProductos.get('/', async (req, res) => {
  const array = await inventario.getAll();
  res.json(array);
});

async function mdwObtenerProducto(req, res, next) {
  const { id } = req.params
  res.producto = await inventario.getById(id)
  next()
}

function mdwValidarProducto(req, res, next) {
  if (res.producto == undefined) {
    res.status(404).json({ error: 'producto no encontrado' })
  }
  next()
}

// GET '/api/productos/:id' -> devuelve un producto según su id.
apiProductos.get('/:id', mdwObtenerProducto, mdwValidarProducto, (req, res, next) => {
  res.json(res.producto)
}
);

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
apiProductos.post('/', mwdRoleAdministrador, mwdProductoValido, async (req, res) => {
  let producto = req.body
  const id = await inventario.save(producto)
  producto = await inventario.getById(id)
  res.json(producto)
});


// c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
apiProductos.put('/:id', mwdRoleAdministrador,mwdProductoValido, async (req, res) => {
  const { id } = req.params
  let data = req.body

  await inventario.update(id, data)
  const producto = await inventario.getById(id)
  res.json(producto)
});

// d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
apiProductos.delete('/:id', mwdRoleAdministrador, async (req, res) => {
  const { id } = req.params
  await inventario.deleteById(id)
  res.json({ borrado: "Ok" })
});

exports.apiProductos = apiProductos;