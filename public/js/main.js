crearCarrito()
cargarProductos()

async function cargarProductos() {
    const [ plantilla, listaProductos ] = await Promise.all([ buscarPlantilla('ListadoProductos'), buscarProductos() ])

    const html = armarHTML(plantilla, listaProductos)
    document.getElementById('productos').innerHTML = html
}

async function crearCarrito() {

    return fetch('/carritos/',{method: "POST"} )
    .then(response => response.json())
    .then(data => sessionStorage.setItem('IdCarrito', data))
    
}

function buscarProductos() {
    return fetch('/productos/' )
        .then(response => response.json())
}

function buscarPlantilla(name) {
    return fetch(`/plantillas/${name}.ejs`)
        .then(respuesta => respuesta.text())
}

function armarHTML(plantilla, listaProductos) {
    const render = ejs.compile(plantilla);
    const html = render({ listaProductos })
    return html
}

async function AddCarrito(params){

    let idProd = params

    const [ plantilla, {listaProductos} ] = await Promise.all([ buscarPlantilla('carrito'), AddProduAlCarrito(idProd) ])

    const html = armarHTML(plantilla, listaProductos)
    document.getElementById('productos').innerHTML = html

}

async function verCarrito(){

    const [ plantilla, listaProductos ] = await Promise.all([ buscarPlantilla('carrito'), GetProdCarrito() ])

    const html = armarHTML(plantilla, listaProductos)
    document.getElementById('productos').innerHTML = html
}

function AddProduAlCarrito(idProd) {
   
    let idCarrito = sessionStorage.getItem('IdCarrito');
    return fetch('/Carritos/'+idCarrito+'/productos/'+idProd,{method: "POST"})
         .then(response => response.json())
}

function GetProdCarrito(params) {
    let idCarrito = sessionStorage.getItem('IdCarrito');

    return fetch('/Carritos/'+idCarrito+'/productos',{method: "GET"})
         .then(response => response.json())
}

