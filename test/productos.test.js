import app from '../src/server.js'
import logger from '../src/logger.js'
import supertest from 'supertest'
import { expect } from 'chai'

let request
let response
let cookies
let server

const producto = {
    codigo: 'testin',
    nombre: 'producto de prueba',
    descripcion: 'producto de prueba generado desde mocha',
    precio: 14.224,
    stock: 200
};

const user = {
    username: 'r02',
    password: '123'
}
const admin = {
    username: 'admin',
    password: '123'
}

describe('Pruebas APIRestFull Productos', () => {

    before(async function () {
        server = await startServer()
        request = supertest(`http://localhost:${server.address().port}`)
    })

    after(async function () {
        await server.close()

    })

    describe('Pruebas sin estar logeado',  function(){

        it('debería retornar un status 200', async () => {
            const response = await request.get('/productos/')
            expect(response.status).to.eql(200)
        })

        it('debería retornar un status 401', async () => {
            const response = await request.post(`/productos/`).send(producto)
            expect(response.status).to.eql(401)
        })

    })


    describe('Pruebas con login usuario ', function() {

        beforeEach( async function () {
            response = await request.post('/login').send(user)
            expect(response.status).to.eql(200)

            // recupero las cookies del response del login 
            cookies = response.headers["set-cookie"].pop().split(";")[0];

        })
    
        afterEach(async function () {
            response =await request.get('/logout').set("Cookie", [cookies])
            expect(response.status).to.eql(200)
        })

        it('debería retornar un status 403', async function()  {
            response =await request.post('/productos').set("Cookie", [cookies]).send(producto)
            expect(response.status).to.eql(403)
        })
    })

    describe('Pruebas con login Admin', function(){

        beforeEach( async function () {
            response = await request.post('/login').send(admin)
            expect(response.status).to.eql(200)

            // recupero las cookies del response del login 
            cookies = response.headers["set-cookie"].pop().split(";")[0];
        })
    
        afterEach(async function () {
            response =await request.get('/logout').set("Cookie", [cookies])
            expect(response.status).to.eql(200)
        })

        it('Crear un producto debería retornar un status 200', async function() {
            response =await request.post('/productos').set("Cookie", [cookies]).send(producto)
            producto.id = response.body.id
            expect(response.status).to.eql(200)
        })
        it('Modificar un debería retornar un status 200', async function() {
            producto.stock = 150
            response =await request.put(`/productos/${producto.id}`).set("Cookie", [cookies]).send(producto)
            expect(response.status).to.eql(200)
        })
        it('obtener el producto modificado debería retornar un status 200', async function() {
            response =await request.get(`/productos/${producto.id}`).set("Cookie", [cookies])
            expect(response.status).to.eql(200)
            expect(response.body.stock).to.eql(150)
        })

        it('eliminar el producto modificado debería retornar un status 200', async function() {
            response =await request.delete(`/productos/${producto.id}`).set("Cookie", [cookies])
            expect(response.status).to.eql(200)
        })

    })

})

async function startServer() {

    return new Promise((resolve, reject) => {
        const PORT = 0

        const server = app.listen(PORT, () => {
            resolve(server)
        });
        server.on('error', error => {
            logger.error(`Error en Servidor: ${error}`)
            reject(error)
        });

    })

}

