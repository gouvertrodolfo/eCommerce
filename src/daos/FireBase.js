import admin from 'firebase-admin';

// import { Admin } from 'mongodb';

import serviceAccount from '../../options/ecommerce-ad388-firebase-adminsdk-dgeq4-ddf54374f5.json';


class FireBase {
    constructor(coleccion) {

        if (admin.apps.length == 0) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL:"https://ecommerce-ad388.firebaseio.com"
            });
        }

        this.db = admin.firestore();
        this.coleccion = this.db.collection(coleccion);

        console.log(`base conectada coleccion ${coleccion}`)
    }

    async create(object) {

        const { id, timestamp, listaProductos } = object

        let doc = this.coleccion.doc(`${id}`)

        await doc.create(  {id:id, timestamp: timestamp, listaProductos:listaProductos} )

    }

    async getNextId(){

        let doc = await this.coleccion.orderBy('id','desc').limit(1).get();

        console.log('------------------------------------------------------------------------')
        console.log(doc.docs)
        console.log('------------------------------------------------------------------------')
                
        return doc.docs.id;

    }

    async getAll() {
        
        const querySnaptShot= await this.coleccion.get();
                
        return querySnaptShot.docs;
    }

    async getById(id) {
        
        let doc = this.coleccion.doc(`${id}`)

        const item = await doc.get();
                
        return item;
    }


}


export default FireBase
