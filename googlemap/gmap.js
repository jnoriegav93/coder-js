let map;
let drawingManager;
let marker;
let leftClickListener;
let rightClickListener;
let doubleClickListener;
let dragEndListener;
let infoWindow;
let lineNodes = [];
let line;

let menuPanel  = document.querySelector("#floating-menu-panel");
let submenuPanel = document.querySelector("#floating-submenu-panel");
let menuIcon = document.querySelector("#btnMenu > i");
let floatingModal  = document.querySelector("#floating-modal");

function initMap() {
    alert('initMap');
    // Configura la ubicación inicial del mapa
    let myLatLng = { lat: -12.0651359, lng: -77.0337622 };

    // Crea un nuevo mapa y pásale la configuración
    let map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 15
    });

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: false,
        map: map
    });
    // Asigna eventos de clic a los botones
    document.getElementById('btnMenu').addEventListener('click', function () {
        ocultarPaneles();
        if (menuIcon.classList.contains("fa-bars")) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-times");
            if (menuPanel.classList.contains("d-none")) {
                menuPanel.classList.remove("d-none");
                if (!submenuPanel.classList.contains("d-none")) {
                    submenuPanel.classList.add("d-none");
                }
            }
        } else {
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
            menuPanel.classList.add("d-none");
        }
    });
    
    document.getElementById('btnVista').addEventListener('click', function () {
        drawingManager.setOptions({
            drawingControl: false,
            drawingMode: null
        });
        map.setOptions({ draggable: true });
        if (!menuPanel.classList.contains("d-none")) {
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
            menuPanel.classList.add("d-none");
        }
        if (!submenuPanel.classList.contains("d-none")) {
            submenuPanel.classList.add("d-none");
        }
        ocultarPaneles();
        limpiarObjetos();
        limpiarListeners();
    });

    document.getElementById('btnCrear').addEventListener('click', function () {
        ocultarPaneles();
        if(submenuPanel.classList.contains("d-none")){
            submenuPanel.classList.remove("d-none");
            if (!menuPanel.classList.contains("d-none")) {
                menuPanel.classList.add("d-none");
                menuIcon.classList.remove("fa-times");
                menuIcon.classList.add("fa-bars");
            }
        }else{
            submenuPanel.classList.add("d-none");
        }
        
    });

    //Crear
    document.getElementById('btnONU').addEventListener('click', function () {
        limpiarListeners();
        limpiarObjetos();
        //Mapa
        leftClickListener = map.addListener('click', function(event) {
            marker && marker.setMap(null); // limpiar marcadores
            document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + event.latLng.lat() + '<br>Lon: ' +event.latLng.lng();
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                icon: '../resources/img/onu.png',
                infoWindow: new google.maps.InfoWindow({
                    content: 'Nueva ONU'
                })
            });
            marker.addListener('click', function() {
                this.infoWindow.open(map, this);
              });
            marker.addListener('dragend', function() {
                document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + marker.getPosition().lat() + '<br>Lon: ' +marker.getPosition().lng();
            });
        });
        //Modal
        document.querySelector('#modal-title').innerHTML = 'Agregar ONU';
        document.querySelector('#modal-content').innerHTML = `
        <label for="">Título:</label>
        <input type="text" id="onuTitulo" name="onuTitulo" class="form-control" required>
        <label for="marker-description">Descripción:</label>
        <textarea id="marker-description" name="onuDescripcion" class="form-control" required></textarea>
        `;
        if (floatingModal.classList.contains("d-none")) {
            floatingModal.classList.remove("d-none");
        }
        if (!document.querySelector('#btnFinalizarLinea').classList.contains("d-none")) {
            document.querySelector('#btnFinalizarLinea').classList.add("d-none");
        }
    });

    document.getElementById('btnMufa').addEventListener('click', function () {
        limpiarListeners();
        limpiarObjetos();
        //Mapa
        leftClickListener = map.addListener('click', function(event) {
            marker && marker.setMap(null); // limpiar marcadores
            document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + event.latLng.lat() + '<br>Lon: ' +event.latLng.lng();
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                icon: '../resources/img/mufa.png',
                infoWindow: new google.maps.InfoWindow({
                    content: 'Nueva mufa'
                })
            });
            marker.addListener('click', function() {
                this.infoWindow.open(map, this);
              });
            marker.addListener('dragend', function() {
                document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + marker.getPosition().lat() + '<br>Lon: ' +marker.getPosition().lng();
            });
        });
        //Modal
        document.querySelector('#modal-title').innerHTML = 'Agregar Mufa';
        document.querySelector('#modal-content').innerHTML = `
        <label for="marker-title">Título:</label>
        <input type="text" id="marker-title" name="marker-title" class="form-control" required>
        <label for="marker-description">Descripción:</label>
        <textarea id="marker-description" name="marker-description" class="form-control" required></textarea>
        `;
        if (floatingModal.classList.contains("d-none")) {
            floatingModal.classList.remove("d-none");
        }
        if (!document.querySelector('#btnFinalizarLinea').classList.contains("d-none")) {
            document.querySelector('#btnFinalizarLinea').classList.add("d-none");
        }
    });
    document.getElementById('btnPoste').addEventListener('click', function () {
        limpiarListeners();
        limpiarObjetos();
        //Mapa
        leftClickListener = map.addListener('click', function(event) {
            marker && marker.setMap(null); // limpiar marcadores
            document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + event.latLng.lat() + '<br>Lon: ' +event.latLng.lng();
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                icon: '../resources/img/poste.png',
                infoWindow: new google.maps.InfoWindow({
                    content: 'Nuevo poste'
                })
            });
            marker.addListener('click', function() {
                this.infoWindow.open(map, this);
              });
            marker.addListener('dragend', function() {
                document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + marker.getPosition().lat() + '<br>Lon: ' +marker.getPosition().lng();
            });
        });
        //Modal
        document.querySelector('#modal-title').innerHTML = 'Agregar Poste';
        document.querySelector('#modal-content').innerHTML = `
        <label for="marker-title">Título:</label>
        <input type="text" id="marker-title" name="marker-title" class="form-control" required>
        <label for="marker-description">Descripción:</label>
        <textarea id="marker-description" name="marker-description" class="form-control" required></textarea>
        `;
        if (floatingModal.classList.contains("d-none")) {
            floatingModal.classList.remove("d-none");
        }
    });
    document.getElementById('btnSplitter').addEventListener('click', function () {
        limpiarListeners();
        limpiarObjetos();
        //Mapa
        leftClickListener = map.addListener('click', function(event) {
            marker && marker.setMap(null); // limpiar marcadores
            document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + event.latLng.lat() + '<br>Lon: ' +event.latLng.lng();
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                icon: '../resources/img/splitter.png',
                infoWindow: new google.maps.InfoWindow({
                    content: 'Nuevo splitter'
                })
            });
            marker.addListener('click', function() {
                this.infoWindow.open(map, this);
              });
            marker.addListener('dragend', function() {
                document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + marker.getPosition().lat() + '<br>Lon: ' +marker.getPosition().lng();
            });
        });
        //Modal
        document.querySelector('#modal-title').innerHTML = 'Agregar Splitter';
        document.querySelector('#modal-content').innerHTML = `
        <label for="marker-title">Título:</label>
        <input type="text" id="marker-title" name="marker-title" class="form-control" required>
        <label for="marker-description">Descripción:</label>
        <textarea id="marker-description" name="marker-description" class="form-control" required></textarea>
        `;
        if (floatingModal.classList.contains("d-none")) {
            floatingModal.classList.remove("d-none");
        }
        if (!document.querySelector('#btnFinalizarLinea').classList.contains("d-none")) {
            document.querySelector('#btnFinalizarLinea').classList.add("d-none");
        }
    });
    
    document.getElementById('btnFibra').addEventListener('click', function () {
        limpiarListeners();
        limpiarObjetos();
        let nodeMarker;
        //Mapa
        marker && marker.setMap(null); // limpiar marcadores
        line && line.setMap(null); // limpiar lineas
        leftClickListener = map.addListener('click', function(event) {
            console.log(`Nodo añadido: ${event.latLng.lat()}, ${event.latLng.lng()}`);
            nodeMarker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                icon: '../resources/img/lineNode.png',
                title: `Nodo ${lineNodes.length + 1}`
              });
            nodeMarker.addListener('dragend', function() {
                line.setPath(lineNodes.map(marker => marker.getPosition()));
            });
            lineNodes.push(nodeMarker);
            // Dibuja la línea con los nodos actuales
            if (line) {
                line.setMap(null);
            }
            line = new google.maps.Polyline({
                path: lineNodes.map(marker => marker.getPosition()),
                geodesic: true,
                strokeColor: '#0798ec',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            line.setMap(map);
        });

        
        //Modal
        document.querySelector('#modal-title').innerHTML = 'Agregar Fibra';
        document.querySelector('#modal-content').innerHTML = `
        <label for="marker-title">Título:</label>
        <input type="text" id="marker-title" name="marker-title" class="form-control" required>
        <label for="marker-description">Descripción:</label>
        <textarea id="marker-description" name="marker-description" class="form-control" required></textarea>
        `;
        if (floatingModal.classList.contains("d-none")) {
            floatingModal.classList.remove("d-none");
        }
        if (document.querySelector('#btnFinalizarLinea').classList.contains("d-none")) {
            document.querySelector('#btnFinalizarLinea').classList.remove("d-none");
        }
    });
    
    //Finalizar la línea
    document.getElementById('btnFinalizarLinea').addEventListener('click', function () {
        if(lineNodes.length > 1){
            if(confirm('¿Está seguro de que desea guardar? No podrá modificarlo luego de confirmar.')){
                limpiarListeners();
                lineNodes.filter(marker => {
                    const marcadorEnLinea = google.maps.geometry.poly.isLocationOnEdge(marker.getPosition(), line);
                    if (marcadorEnLinea) {
                        marker.setMap(null); 
                        return false;
                    }
                    return true;
                });
                console.log('Coordenadas finales:');
                let coordMsg = '';
                line.getPath().getArray().forEach(function(node, index) {
                    coordMsg += `N°: ${index + 1}<br> Lat: ${node.lat()}<br>Lon: ${node.lng()}<br>`;
                });
                
                document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>' + coordMsg;
            }
        }else{
            alert('Debe seleccionar más de un nodo para crear la línea.');
        }
    });

    document.getElementById('btnCancelar').addEventListener('click', function () {
        ocultarPaneles();
        marker && marker.setMap(null);
        marker && marker.infoWindow.close();
        line && line.setMap(null); // limpiar lineas
        lineNodes = lineNodes.filter(marker => {
            const marcadorEnLinea = google.maps.geometry.poly.isLocationOnEdge(marker.getPosition(), line);
            if (marcadorEnLinea) {
                marker.setMap(null); 
                return false;
            }
            return true;
        });
    });
    
    document.querySelector('#formRegistrar').addEventListener("submit", (e) => {
        e.preventDefault();
        let formData = new FormData(event.target);
        let formDataObject = {};

        formData.forEach(function(value, key) {
            formDataObject[key] = value;
        });
        let res = JSON.stringify(formDataObject);
        // Mostrar los datos en consola como un objeto JSON
        console.log(res);
        alert(res);
    });

}

function ocultarPaneles(){
    document.querySelectorAll('#formRegistrar [required]').forEach(function(elemento) {
        elemento.removeAttribute('required');
      });
    if (!floatingModal.classList.contains("d-none")) {
        floatingModal.classList.add("d-none");
    }
    if (!menuPanel.classList.contains("d-none")) {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
        menuPanel.classList.add("d-none");
    }
    if (!submenuPanel.classList.contains("d-none")) {
        submenuPanel.classList.add("d-none");
    }
}
function limpiarListeners(){
    google.maps.event.removeListener(leftClickListener);
    google.maps.event.removeListener(rightClickListener);
    google.maps.event.removeListener(doubleClickListener);
    google.maps.event.removeListener(dragEndListener);
}
function limpiarObjetos(){
    lineNodes = lineNodes.filter(marker => { // limpiar marcadores encima de las lineas
        if(marker){
            const marcadorEnLinea = google.maps.geometry.poly.isLocationOnEdge(marker.getPosition(), line);
            if (marcadorEnLinea) {
                marker.setMap(null); 
                return false;
            }
            return true;
        }
    });
    line && line.setMap(null); // limpiar lineas
    marker && marker.setMap(null); // limpiar marcadores
    marker = null;
    line = null;
    document.querySelector('#modal-info').innerHTML = '';
}
