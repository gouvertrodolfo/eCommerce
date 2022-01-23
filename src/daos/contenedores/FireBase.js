import admin from 'firebase-admin';
import fs from 'fs'
import logger from '../../logger.js'

const serviceAccount = JSON.parse(await fs.promises.readFile('./options/ecommerce-ad388-firebase-adminsdk-dgeq4-ddf54374f5.json', 'utf-8'))

if (admin.apps.length == 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://ecommerce-ad388.firebaseio.com"
    });
}

logger.info(`firebase admin conectado`)


class FireBase {

    constructor(coleccion) {

        this.db = admin.firestore();
        this.coleccion = this.db.collection(coleccion);

    }

    async create(object) {

        const { id, timestamp, listaProductos } = object

        let doc = this.coleccion.doc(`${id}`)

        await doc.create({ id: id, timestamp: timestamp, listaProductos: listaProductos })

    }

    async getAll() {

        const querySnaptShot = await this.coleccion.get();

        return querySnaptShot.docs;
    }

    async getById(id) {

        let doc = this.coleccion.doc(`${id}`)

        const item = await doc.get();

        return item;
    }


}


export default FireBase
