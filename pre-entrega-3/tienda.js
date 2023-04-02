const titulo =  document.getElementById('usuarioRegistrado'); 
const inputNombre =  document.getElementById('nombresUsuario'); 
const inputApellido =  document.getElementById('apellidosUsuario'); 
const formGuardarUsuario =  document.getElementById('formGuardarUsuario'); 
const divProductos =  document.getElementById('listaProductos'); 
const formRealizarCompra =  document.getElementById('formRealizarCompra'); 
let infoUsuario;
$(window).load(function() {
    infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'));
    //console.log(infoUsuario);
    if(infoUsuario){
        titulo.innerText = `${infoUsuario.nombre} ${infoUsuario.apellido}`;
    }else{
        titulo.innerText = 'Invitado';
        $("#modalUsuario").modal("show");
    }
})


formGuardarUsuario.onsubmit = (e) => {
    e.preventDefault();
    const infoUsuario = {
        nombre: inputNombre.value,
        apellido: inputApellido.value
    }
    localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario));
    //formGuardarUsuario.remove();
    $("#modalUsuario").modal("hide");
    titulo.innerText = `${infoUsuario.nombre} ${infoUsuario.apellido}`;
}


class Producto {
    constructor(id, nombre, tipo, color, precio, stock, imagen) {
    this.id = id
    this.nombre = nombre
    this.tipo = tipo
    this.color = color
    this.precio = precio
    this.stock = stock
    this.imagen = imagen
    }
}

const productos = [
    new Producto(1, "Polo con diseño de cráneo", "Polo",  "Beige",  49.90, 10, 'craneo-1.jpg'),
    new Producto(2, "Gorro con diseño",          "Gorro", "Rojo",   30.00, 20, 'gorro-2.jpg'),
    new Producto(3, "Polo con diseño festival",  "Polo",  "Negro",  45.00, 80, 'polo2.jpg'),
    new Producto(4, "Polo con guitarra",         "Polo",  "Negro",  45.00, 65, 'polo-guitarra.jpg'),
    new Producto(5, "Taza Blanca",               "Taza",  "Blanco", 29.90, 50, 'taza-blanca.jpg'),
    new Producto(6, "Taza Negra",                "Taza",  "Negro",  29.90, 50, 'taza-negra.jpg')
];

productos.forEach(prod =>{
    divProductos.innerHTML += `<div class="card col-md-3 m-x1">
    <div class="card-body">
        <img src="resources/img/shop/${prod.imagen}" alt=""  style="width: 100%; max-width:600px" class="img-fluid"> 
        <small class="text-muted">Categoría: ${prod.tipo}</small>
        <h5 class="card-title">${prod.nombre}</h5> 
        <p class="card-text">Color: ${prod.color}</p>
        <p class="card-text">Precio: ${prod.precio}</p>
        <button class="btn btn-primary btnAgregar" id="${prod.id}">Agregar</button>
    </div>
</div>`;
});



const carrito = [];

const botonesAgregar = document.querySelectorAll('.btnAgregar');
botonesAgregar.forEach(boton =>{
    boton.onclick = () =>{
        const producto = productos.find(p=>p.id === parseInt(boton.id));        
        const prodCarrito = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        }
        const prodEnCarrito = carrito.find(prod => prod.id === prodCarrito.id );
        if(!prodEnCarrito){
            carrito.push(prodCarrito);
        }else{
            prodEnCarrito.cantidad++;
        }
        console.log(carrito);
        toastr.success(`${producto.nombre} agregado al carrito`,'Mensaje');
    }
});

const botonFinalizar = document.querySelector('.finalizarCompra');
const txtCarrito = document.querySelector('#txtCarrito');
const tbCarrito = document.querySelector('#tbCarrito');
let totalCompra = 0;

botonFinalizar.onclick = () =>{
    txtCarrito.innerHTML = `<p>Hola ${titulo.innerText.toUpperCase()}, el resumen de tu pedido es el siguiente:</p>`;
    $("#modalCarrito").modal("show");
    tbCarrito.innerHTML= `
        <thead>
            <tr>
                <th scope="col" width="50%">Producto</th>
                <th scope="col" width="20%">Cantidad</th>
                <th scope="col" width="30%" class="text-end pe-3">Total</th>
            </tr>
        </thead>
        <tbody>`;
    carrito.forEach(prod => {
        tbCarrito.innerHTML+= `
            <tr>
                <td>${prod.nombre}</td>
                <td class="text-center">${prod.cantidad}</td>
                <td class="text-end pe-3">${(prod.cantidad*prod.precio).toFixed(2)}</td>
            </tr>`;
        totalCompra += (prod.cantidad*prod.precio);
    });
    
    tbCarrito.innerHTML+= `
            <tr class="font-weight-bold">
                <td colspan="2">TOTAL</td>
                <td class="text-end pe-3">${totalCompra.toFixed(2)}</td>
            </tr>
        </tbody>`;

}


formRealizarCompra.onsubmit = (e) => {
    e.preventDefault();
    $("#modalCarrito").modal("hide");
    toastr.success(`Se agendó tu pedido, por favor revisa la bandeja de entrada de tu correo.`,'Mensaje');
    //alert('Coming soon.')
}
