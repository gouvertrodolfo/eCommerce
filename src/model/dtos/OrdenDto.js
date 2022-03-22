import NUID from 'nuid'

export default class CarritoDto {
  _id;
  id;
  email;
  productos;
  fechayhora;
  Estado;

  constructor({ id, email, _id, fechayhora, items }) {
    this.email = email
    this.items = items;

    if (_id == undefined) {

      this.id = NUID.next();
      this.fechayhora = Date.now();
    }
    else {
      this._id = _id;
      this.id = id;
      this.fechayhora = fechayhora;
    }



  }

  get() {
    return this
  }

  tohtml(){
    return JSON.stringify(this)
  }
}
