//Estilos para la animación del mapa de ubicaciones del evento
let listaEntradas = document.querySelectorAll('.lista-entradas > li');
listaEntradas.forEach((item )=>{
    item.addEventListener('mouseover', () =>{
        document.querySelector('#imagen-mapa').src = `resources/img/inicio/mapas/mapa-${item.id}.png`;
    })
    
    item.addEventListener('mouseout', () =>{
        document.querySelector('#imagen-mapa').src = `resources/img/inicio/mapas/mapa-todo.png`;
    })
})

class Entrada {
    constructor(id,nombre,precio,cantidad, total) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
        this.total = total
    }
}
let arrayEntradas = [];


const divSubTotal = document.querySelector('#divSubTotal');
const btnProcederPago = document.querySelector('.btnProcederPago');

//Agregar los subtotales al Array de entradas
const sumarSubTotal = (id_entrada,cantidad) =>{
    let entradaSeleccionada = arrayEntradas.find(item => item.id === id_entrada);
    entradaSeleccionada.cantidad = cantidad;
    entradaSeleccionada.total = parseFloat((parseFloat(entradaSeleccionada.precio) * parseInt(cantidad)).toFixed(2));
    //Habilitar el botón cuando tenga al menos una entrada seleccionada
    console.log(arrayEntradas.some(item => item.total > 0));
    if(arrayEntradas.some(item => item.total > 0)){
        btnProcederPago.removeAttribute('disabled');
        //Mostrar el subtotal
        let costoEntradas = 0;
        let cantidadEntradas = 0;
        arrayEntradas.forEach((obj) => {
            costoEntradas += parseFloat(obj.total.toFixed(2));
            cantidadEntradas += parseInt(obj.cantidad);
          });
        divSubTotal.innerHTML = `
        <table class="table">
        <thead><tr><th>Cantidad de Entradas</th><th>Sub total</th></thead>
            <tr><td>${cantidadEntradas}</td><td>${costoEntradas.toFixed(2)}</td></tr>
        </table>`;
    }else{
        btnProcederPago.setAttribute('disabled', '');
        divSubTotal.innerHTML = ``;
    }
}



//Cargar entrada
async function getEntradas() {
    const response = await fetch('https://jnoriegav93.github.io/coder/entrega-final/resources/json/entradas.json'); //obtener el json con el array de entradas
    const resultado = await response.json();
    //console.log(resultado.entradas);
    return resultado.entradas;
  }
  
async function mostrarEntradas() {
    const entradas = await getEntradas();
    const tablaEntradas = document.querySelector('#tablaEntradas');
    let resultado = '';
    entradas.forEach(entrada => {
    //console.log(entrada);
    //Guardamos todo en un array de clase Entrada
    arrayEntradas.push(new Entrada(entrada.id,entrada.nombre, entrada.precio,0,0));
    //Estados de la entrada, si está agotado, si se ha ocupado el 85% de entradas por sector, o si está disponible.
    let entrada_disponible;
    if(entrada.stock_prc === 100) {
        entrada_disponible = '<span class="text-danger">Agotado</span>';
    }else if(entrada.stock_prc >= 85){
        entrada_disponible = '<span class="text-warning">¡Quedan pocas!</span>';
    }else{
        entrada_disponible = '<span class="text-dark">Disponible</span>';

    }
    //Cantidad de Entradas
    let option_entradas = '';
    for(let i = 0; i<=10 ; i++){
        option_entradas += `<option value="${i}">${i}</option>`;
    }
    resultado += 
    `   <tr>
            <td class="text-start">${entrada.tipo}</td>
            <td class="text-center">${entrada_disponible}</td>
            <td class="text-start">${entrada.asientos}</td>
            <td class="text-end pe-3">$ <span class="precio_entradas">${entrada.precio}</span></td>
            <!--<td class="text-right">${entrada.detalle}</td>-->
            <td class="text-center">`+
            (entrada.habilitado ?
            `<select name="compra_entrada_${entrada.id}" id="compra_entrada_${entrada.id}" class="form-control cant_entradas max-w-100px" onchange="sumarSubTotal(${entrada.id},this.value)">${option_entradas}</select>`
            :`<input type="text" name="" id="" class="form-control max-w-100px" disabled style="cursor: not-allowed">`)
            +`</td>
        </tr>
        `;
    });
    tablaEntradas.innerHTML = 
    `<thead>
        <tr class="bg-dark text-light text-center my-2">
            <th>Tipo de Entrada</th>
            <th>Estado</th>
            <th>Tipo de Asientos</th>
            <th>Precio $</th>
            <!--<th>Detalle</th>-->
            <th>Compra</th>
        </tr>
    </thead> 
    <tbody>
        ${resultado}
    </tbody>`; 
  }

  
let btnComprarEntrada = document.querySelector('#comprarEntrada');

btnComprarEntrada.addEventListener('click', () =>{
    btnProcederPago.setAttribute('disabled', '');
    divSubTotal.innerHTML = ``;
    $("#modalEntradas").modal("show");
    mostrarEntradas();
});


document.querySelector('#formProcederPago').addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e)
});