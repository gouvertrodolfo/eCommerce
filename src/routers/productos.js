const apiProductos = require('express').Router();

const Productos = require("../api/Productos")
const inventario = new Productos();
inventario.init();

/* ------------------------------------------------------ */

// a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
apiProductos.get('/', (req, res) => {
  const array = inventario.getAllProductos()
  res.json(array);
});

function mdwObtenerProducto(req, res, next) {
  const { id } = req.params
  res.producto = inventario.getProductobyId(id)
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
apiProductos.post('/', mwdRoleAdministrador, mwdProductoValido, (req, res) => {
  let object = req.body
  const producto  = inventario.addProducto(object)
  res.json(producto)
});

// c. PUT: '/' - registrar los cambios echos en memoria al archivo
apiProductos.put('/', mwdRoleAdministrador, async (req, res) => {
  await inventario.commit()
  res.json()
});

// c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
apiProductos.put('/:id', mwdRoleAdministrador, (req, res) => {
  const { id } = req.params
  let data = req.body

  const producto = inventario.updateProducto(id, data)

  res.json(producto)
});

// d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
apiProductos.delete('/:id', mwdRoleAdministrador,  (req, res) => {
  const { id } = req.params
  const array = inventario.delProducto(id)
  res.json(array)
});



exports.apiProductos = apiProductos;