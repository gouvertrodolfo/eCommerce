import NUID from 'nuid'

export default class ProductoDto {
  _id;
  id;
  nombre;
  descripcion;
  precio;
  stock;
  categoria;
  caracteristicas;

  constructor({
    _id,
    id,
    nombre,
    descripcion,
    precio,
    stock,
    categoria,
    caracteristicas
  }) {

    if (id == undefined)
      this.id = NUID.next();
    else {
      this.id = id;
      this._id = _id
    }

    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
    this.caracteristicas = caracteristicas;
  }

  get() {
    return this
  }

  getforCarrito(){
    return {
      id: this.id,
      nombre: this.nombre,
      precio: this.precio,
      caracteristicas : this.caracteristicas,
      cantidad: this.cantidad
    }
  }


}
