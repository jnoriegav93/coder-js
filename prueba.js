let inicio; 
do{
    inicio = parseInt(prompt('Ingrese una opción, para cerrar digite 0'));
    switch(inicio){
        case 1:
            alert('eligió 1');
            evaluacion();
            break;
        case 2:
            alert('eligió 2');
            break;
    }

}while(inicio !== 0);


function evaluacion(){
    let prueba = [
        {   
            preguntaID: 1, 
            bloque: 1, 
            nroPregunta: 1, 
            pregunta: '¿ (a == b) es igual a (a === b)?', 
            alternativas : ['Sí','No','N.A.'],
            respuesta: 1
        },{   
            preguntaID: 1, 
            bloque: 1, 
            nroPregunta: 1, 
            pregunta: '¿ (a % b) es igual a (a / b)?', 
            alternativas : ['Sí','No','N.A.'],
            respuesta: 1
        }
    ];
    prueba.forEach(function(a,b){
        console.log(a,b);
    })
}