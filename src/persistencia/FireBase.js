const admin = require('firebase-admin');
const { Admin } = require('mongodb');

const serviceAccount = require('../../options/ecommerce-ad388-firebase-adminsdk-dgeq4-ddf54374f5.json');


class FireBase {
    constructor(coleccion) {

        if (admin.apps.length == 0) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }

        this.db = admin.firestore();
        this.query = this.db.collection(coleccion);

        console.log(`base conectada coleccion ${coleccion}`)
    }

    async create(object) {

         let id=Date.now()
         let doc = this.query.doc(`${id}`)

        await doc.create(  { id: 3, timestamp: 1637353331544, listaProductos: [] })

    }

    async getNextId(){
        return 2;
    }
}


module.exports = FireBase
