export default class CarritoDto {
  _id;
  email;
  listaProductos;
  timestamp;

  constructor({ email, _id, timestamp, listaProductos }) {
    this.email = email
    if (_id == undefined) {
        this.timestamp = Date.now();
        this.listaProductos = [];
    }
    else{
        this._id = _id; 
        this.timestamp = timestamp;
        this.listaProductos = listaProductos;
    }
  }

  static fromJson(json) {
    const datos = JSON.parse(json)
    return new ProductoDto(datos)
  }

  toJson() {
    return JSON.stringify(this)
  }
}
