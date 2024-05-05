
const url_servidor = 'https://red-api-tjun.onrender.com';
// const url_servidor = 'http://localhost:3001';


document.getElementById('frmIniciarSesion').addEventListener('submit', function(e) {
    e.preventDefault(); // Previene el envío del formulario por defecto

    const usuario = document.getElementById('txtUsuario');
    const contraseña = document.getElementById('txtContrasena');
    let msje = '';
    document.getElementById('errorMessage').innerHTML = msje;

    // Validación básica: verifica que los campos no estén vacíos
    if (usuario.value === "" || contraseña.value === "") {
        msje += "Por favor, completa todos los campos.<br>";
    }else{
        let data = {
            "email"     : usuario.value,
            "password"  : contraseña.value
        };
        enviarJSON(`${url_servidor}/api/login`,'POST',JSON.stringify(data));
    }
    // window.location.href = 'index.html';
});



async function enviarJSON(url_api,metodo_json,data_json) {
    try {
        const response = await fetch(url_api, {
            // mode: 'no-cors', // Añadir esta línea
            method: metodo_json,
            headers: {
                "Content-Type": "application/json",
            },
            body: data_json,
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        document.querySelector('#btnVista').click();
        // console.log(result,"Hora de finalización:", new Date().toLocaleTimeString());
    } catch (error) {
        console.log(`Tipo de fetch: ${metodo_json}`);
        console.log(`URL: ${url_api}`);
        console.log(`Cuerpo de la solicitud: ${data_json}`);
        if (error.message.includes("Failed to fetch")) {
            alert("Error de conexión");
        } else {
            alert(`Error: ${error.message}`);
        }
        console.log(`Error: ${error.message}`);
        console.log("Hora de finalización:", new Date().toLocaleTimeString());
    }
}