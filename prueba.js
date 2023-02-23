let inicio;
do{
    inicio = parseInt(prompt('Bienvenido\n'+
    'Digite una opción\n\n1. Evaluación\n\n0. Salir'));
    switch(inicio){
        case 1:
            evaluacion();
            break;
        case 2:
            alert('eligió 2');
            break;
    }

}while(inicio !== 0);


function evaluacion(){
    let usuario = {
        nombres : '',
        respuestas: [],
        correctas: 0,
        incorrectas: 0
    };
    //Preguntas
    let prueba = [
        {   
            preguntaID: 1,
            bloque: 1,
            nroPregunta: 1,
            pregunta: '¿Cuáles de estas son marcas para la inserción del código JavaScript en las páginas HTML?',
            alternativas : {1: '<javascript_code> y </javascript_code>', 
                            2: '<script> y </script>', 
                            3: '<?script> y </script?>'},
            respuesta: 2
        },{   
            preguntaID: 2,
            bloque: 1,
            nroPregunta: 2,
            pregunta: 'La llamada al código Javascript debe colocarse en:',
            alternativas : {1: 'La sección Body de la página', 
                            2: 'Antes de la etiqueta HTML', 
                            3: 'Puede colocarse en la sección Head o en Body'},
            respuesta: 3
        },{   
            preguntaID: 3,
            bloque: 1,
            nroPregunta: 3,
            pregunta: '¿Cuál es la instrucción usada para devolver un valor en una función de JavaScript?',
            alternativas : {1: 'Return', 
                            2: 'Send', 
                            3: 'Value'},
            respuesta: 1
        },{   
            preguntaID: 4,
            bloque: 2,
            nroPregunta: 4,
            pregunta: 'Para terminar las instrucciones en Javascript se utiliza:',
            alternativas : {1: 'Un punto y coma', 
                            2: 'La sentencia End', 
                            3: 'Un punto y coma o un salto de línea'},
            respuesta: 3
        },{   
            preguntaID: 5,
            bloque: 2,
            nroPregunta: 5,
            pregunta: '¿Cuál de estas instrucciones está correctamente escrita en Javascript?',
            alternativas : {1: 'if (a==0) alert (a);', 
                            2: 'if (a=0) print a;', 
                            3: 'if (a==0) { print [a] }', 
                            4: 'if (a==0): print a;'},
            respuesta: 1
        }
    ];
    //Iniciar la prueba
    usuario.nombres = prompt('Bienvenido a la evaluación, ingrese sus nombres (al menos 3 caracteres):');
    while(usuario.nombres.length < 3){
        usuario.nombres = prompt('Bienvenido a la evaluación, ingrese sus nombres (al menos 3 caracteres):');
    }
    prueba.forEach(function(item){
        let respuesta_, pregunta_;
        // Estructura de las preguntas
        pregunta_ = 'Pregunta #'+ item.nroPregunta +
        '\n------------------------------------------------\n'+
        item.pregunta + '\n';
        for (const [nro, alternativa] of Object.entries(item.alternativas)) {
            pregunta_ += nro + ') '+ alternativa + '\n';
        }
        pregunta_ += '\nDigite una opción:';
        // Fin de Estructura de las preguntas
        respuesta_ = parseInt(prompt(pregunta_)) || -1;
        while(respuesta_ < 0){
            alert('Opción incorrecta, por favor digitar una opción de la lista');
            respuesta_ = parseInt(prompt(pregunta_)) || -1;
        };

        usuario.respuestas =  [ { preguntaID: item.preguntaID, respuesta:  respuesta_ }];
        //Validar respuestas
        usuario.correctas   += item.respuesta === respuesta_ ? 1 : 0;
        usuario.incorrectas += item.respuesta !== respuesta_ ? 1 : 0;
    });
    let resultado_final_ = '------------------------------------------------\n'+
    'Estimado(a) ' + usuario.nombres + ':'+
    '\nEl resultado de su prueba es de ('+(usuario.correctas*100/(usuario.correctas+usuario.incorrectas))+'%):\n'+
    'Correctas:   ' + usuario.correctas + '\nIncorrectas: '+ usuario.incorrectas;
    //Mostrar resultados
    alert('Resultado final:\n'+resultado_final_);


    
    let resultado_final_html = '<b>Estimado(a) ' + usuario.nombres + ':</b><br>'+
    'El resultado de su prueba es de ('+(usuario.correctas*100/(usuario.correctas+usuario.incorrectas))+'%):<br>'+
    'Correctas:   ' + usuario.correctas + '<br>Incorrectas: '+ usuario.incorrectas;

    document.getElementById('resultado_prueba').innerHTML = resultado_final_html;
}