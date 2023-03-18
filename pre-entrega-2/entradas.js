//Pre entrega 2


const usuario = {
    nombres : '',
    entradas: [],
    subtotal : 0,
    total : 0
}

class Entrada  {
    constructor(id,nombre,precio,stock,enumerado,grupos) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
        this.enumerado = enumerado
    }
}

const dscto = 0.15;

const arrayEntrada = [
    new Entrada(1, "General",  35, 321,false),
    new Entrada(2, "Campo"  ,  50,  88,false),
    new Entrada(3, "VIP"    ,  70,  45,true ),
    new Entrada(4, "Box"    , 130,  12,true )
];


const msg_saltoLinea = '####################################';
const msg_Bienvenida = 'Bienvenido a la plataforma de Tickets-online.\n'+
                          'Evento: Verano Latino 2023';
const msg_detalleEntradas   = 'Entradas\n'+
                          '1. General: $ 35 (La ubicación es por orden de llegada)\n'+
                          '2. Campo: $ 50 (La ubicación es por orden de llegada)\n'+
                          '3. VIP: $ 70 (Contiene asientos enumerados)\n'+
                          '4. Box: $130 (Es la ubicación más cercana al escenario) \n\n'+
                          '¡Descuentos con tarjeta VISA del 15%!\n'+
                          '* Descuento aplica a todas las entradas pagando con una tarjeta con este sistema.\n'+
                          ' Válido hasta el 31/05/2023 11:59 p.m.\n\n'+
                          'Por favor, ingrese la opción de entrada que desea comprar (del 1 al 4):';
const msg_cantidadEntradas = 'Por favor ingresar la cantidad de entradas a solicitar';

alert(msg_saltoLinea + '\n\n' + msg_Bienvenida + '\n\n' + msg_saltoLinea);


usuario.nombres = prompt(`Buen día, por favor ingrese su nombres`);

let tipoEntradas = parseInt(prompt(msg_detalleEntradas)) || 0;
while (tipoEntradas < 1 || tipoEntradas > 4){
    alert('Ingrese la información correcta');
    tipoEntradas = parseInt(prompt(msg_detalleEntradas)) || 0;
}
//Tipo de entrada elegida
const tipoEntrada = arrayEntrada.find(en=> en.id === tipoEntradas);
let cantidadEntradas = 0;
if(tipoEntrada){
    cantidadEntradas = parseInt(prompt(`Has elegido la entrada del tipo ${tipoEntrada.nombre}\n\nStock actual: ${tipoEntrada.stock}\n\n${msg_cantidadEntradas}`)) || 0;
    while (cantidadEntradas < 1 || cantidadEntradas > tipoEntrada.stock){
        alert('Ingrese la información correcta' + (cantidadEntradas > tipoEntrada.stock ? '\nNo hay suficientes entradas.':''));
        cantidadEntradas = parseInt(prompt(`Has elegido la entrada del tipo ${tipoEntrada.nombre}\n\nStock actual: ${tipoEntrada.stock}\n\n${msg_cantidadEntradas}`)) || 0;
    }
}

let pagaConVISA = prompt(   '¡Descuentos con tarjeta VISA del 15%!\n'+
                            '* Descuento aplica a todas las entradas pagando con una tarjeta con este sistema.\n'+
                            ' Válido hasta el 31/05/2023 11:59 p.m.\n\n'+
                            ' Pagará con VISA? (responda solo con SI o NO):').toUpperCase();

//Cantidad de entradas ingresadas
while ( !['SI','NO'].includes(pagaConVISA)){
    alert('Ingrese una respuesta correcta: SI o NO');
    pagaConVISA = prompt(   '¡Descuentos con tarjeta VISA del 15%!\n'+
                            '* Descuento aplica a todas las entradas pagando con una tarjeta con este sistema.\n'+
                            ' Válido hasta el 31/05/2023 11:59 p.m.\n\n'+
                            ' Pagará con VISA? (responda solo con SI o NO):').toUpperCase();
}
usuario.subtotal = tipoEntrada.precio*cantidadEntradas;
usuario.total = pagaConVISA === 'SI' ? usuario.subtotal * (1-dscto)  : usuario.subtotal;

alert( `Estimado/a ${usuario.nombres.toUpperCase()}:\n\nLe confirmamos el detalle de su pedido:\n\n`+
        `Tipo de entrada: ${tipoEntrada.nombre}\n`+
        `Cant. de entradas: ${cantidadEntradas}\n--------------------\n`+
        `Sub Total a pagar: $ ${usuario.subtotal}\n`+
        `¿Paga con VISA (15% dscto)?: ${pagaConVISA}\n`+
        `Total a pagar: $ ${usuario.total}`+
        ``);

