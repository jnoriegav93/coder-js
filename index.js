//alert('sape');

document.getElementById('calcularEnvio').addEventListener('click',function(){
    let input1 = document.getElementById('input1').value;
    let input2 = document.getElementById('input2').value;
    let input3 = document.getElementById('input3').value;
    console.log('123',input1,input2,input3);

    document.getElementById('result').innerHTML = input1 + ' '+  input2 + ' '+ input3 ;
});