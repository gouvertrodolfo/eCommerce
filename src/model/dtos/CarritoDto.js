export default class CarritoDto {
  _id;
  email;
  productos;
  timestamp;

  constructor({ email, _id, timestamp, productos }) {
    this.email = email
    if (_id == undefined) {
      this.timestamp = Date.now();
      this.productos = [];
    }
    else {
      this._id = _id;
      this.timestamp = timestamp;
      this.productos = productos;
    }
  }

  get() {
    return this
  }
}
