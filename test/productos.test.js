import app from '../src/server.js'
// import {commerce} from 'faker'
import supertest from 'supertest'
import { expect } from 'chai'

let request
let server

describe('Pruebas APIRestFull Productos', () => {

    before(async function () {
        console.log('\n********* inicio de Test Api Rest*********')
        server = await startServer()
        request = supertest(`http://localhost:${server.address().port}`)
    })

    after(function () {
        server.close()
        console.log('\n********* Fin de Test Api Rest*********')
    })

    beforeEach(function () {
        console.log('\n********* Inicio test unitario*********')
    })

    afterEach(function () {
        console.log('\n********* fin test unitario*********')
    })

    describe('Get Listado de productos', () => {

        it('debería retornar un status 200', async () => {
            const response = await request.get('/productos/')
            expect(response.status).to.eql(200)
        })

    })


    describe('Post de productos sin persmiso', () => {
        const data = {
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

        it('debería retornar un status 401', async () => {
            const response = await request.post('/productos/').send(data)
            expect(response.status).to.eql(401)
        })


        it('debería retornar un status 403', async () => {

            let response = await request.post('/login').send(user)
            expect(response.status).to.eql(200)

            // recupero las cookies del response del login 
            const cookies = response.headers["set-cookie"].pop().split(";")[0];
            
            response =await request.post('/productos').set("Cookie", [cookies]).send(data)
            expect(response.status).to.eql(403)
        })

    })


    // describe('Get Listado de productos', () => {
    //     it('debería retornar un status 200', async () => {
    //         const response = await request.get('/productos/')
    //         expect(response.status).to.eql(200)
    //     })
    // })







})

async function startServer() {

    return new Promise((resolve, reject) => {
        const PORT = 0

        const server = app.listen(PORT, () => {
            resolve(server)
        });
        server.on('error', error => {
            console.log(`Error en Servidor: ${error}`)
            reject(error)
        });
    })
}