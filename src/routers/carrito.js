const { Router } = require('express');

const apiCarrito = Router();
const Contenedor = require("../Contenedor")
const carrito = new Contenedor('carrito.txt')


// a. POST: '/' - Crea un carrito y devuelve su id.
apiCarrito.post('/',  async (req, res) => {
    let listaProductos =[]
    const id = await carrito.save(listaProductos)
    res.json(id)
  });

// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
apiCarrito.delete('/:id',  async (req, res) => {
    const id = req.params
    await carrito.deleteById(Id)
    res.json()
  });

// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
apiCarrito.get('/:id/productos',  async (req, res) => {
    const id = req.params
    const {listaProductos} = await carrito.getById(Id)
    res.json(listaProductos)
  });
  
// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
// e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto