import admin from 'firebase-admin';
import fs from 'fs'
import logger from '../../logger.js'

const serviceAccount = JSON.parse(await fs.promises.readFile(process.env.FIREBASE_FILE, 'utf-8'))

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
