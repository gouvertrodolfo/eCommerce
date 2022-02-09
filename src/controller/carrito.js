import Market from '../api/Market.js';
const market = new Market();

// export async function crear() {

//     let carrito = new Carrito();
//     console.log(carritosDao)
//     await carritosDao.create(carrito)

//     return carrito;
// }

export async function crear(req, res) {
    const { id } = await market.addCarrito()
    res.json(id)
}

export function borrar(req, res) {
    const { id } = req.params
    market.delCarrito(id)
    res.json()
}

export async function listaProductos(req, res) {
    const { id } = req.params
    const carrito = await market.getCarritobyId(id)
    const { listaProductos } = carrito

    res.json(listaProductos)
}

export function agregarProducto(req, res) {
    let { carrito, producto } = req
    const new_carrito = market.addProdutoAlCarrito(carrito, producto)
    res.json(new_carrito)

}

export  async function quitarProducto(req, res) {
    let { carrito } = req
    const { id_prod } = req.params
    carrito.delProducto(id_prod)
 
    res.json(new_carrito)
  }