export default class ProductoDto {
    id;
    nombre;
    precio;
    stock;
  
    constructor({ id, nombre, caracteristicas, precio, stock }) {
      this.id = id
      this.nombre = nombre;
      this.precio = precio;
      this.stock = stock;
      this.caracteristicas = caracteristicas
    }
 
    get() {
      return this
    }
  }
  