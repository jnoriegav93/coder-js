const mensajeBienvenida = 'Bienvenido a la plataforma de eTickets.\n'+
                          'Evento: Concierto de *****';
const detalleEntradas   = 'Entradas\n'+
                          '1. General: $ 35 (La ubicación es por orden de llegada)\n'+
                          '2. Campo: $ 50 (La ubicación es por orden de llegada)\n'+
                          '3. VIP: $ 70 (Contiene asientos enumerados)\n'+
                          '4. Box: $130 (Es la ubicación más cercana al escenario) \n\n'+
                          'Descuento con tarjeta ****\n'+
                          '- Descuento aplica a todas las entradas. Válido hasta el 31/05/2023 11:59 p.m.\n\n'+
                          'Cuáles entradas desea comprar? Indique el número de la opción (para salir ingrese 0).';
alert(mensajeBienvenida);
prompt(detalleEntradas);
/*
Simulador de compras
de entradas









Bienvenido, lograste pasar la cola virtual. Por favor elige tu ubicación para el concierto
Preferencial
Asiento con código
VIP Box
- BOX #1
- Asientos disponibles



Indispensable ir con tu código QR y tu documento de identidad en físico.
¡Disfruta tu Concierto!
*/