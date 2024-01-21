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
        console.log(menuIcon.classList.contains("fa-bars"));
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
        if (!submenuPanel.classList.contains("d-none")) {
            submenuPanel.classList.add("d-none");
        }
        //Mapa
        leftClickListener = map.addListener('click', function(event) {
            marker && marker.setMap(null); // limpiar marcadores
            document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + event.latLng.lat() + '<br>Lon: ' +event.latLng.lng();
            document.querySelector('#onuCoordenadas').value = `{lat:${event.latLng.lat()},lon:${event.latLng.lng()}}`;
            document.querySelector('#btnGuardar').disabled = false;
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                icon: 'resources/img/onu.png',
                infoWindow: new google.maps.InfoWindow({
                    content: 'Nueva ONU'
                })
            });
            marker.addListener('click', function() {
                this.infoWindow.open(map, this);
            });
            marker.addListener('dragend', function() {
                document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + marker.getPosition().lat() + '<br>Lon: ' + marker.getPosition().lng();
                document.querySelector('#onuCoordenadas').value = `{lat:${marker.getPosition().lat()},lon:${marker.getPosition().lng()}}`;            
            });
        });
        //Modal
        document.querySelector('#modal-title').innerHTML = 'Agregar ONU';
        document.querySelector('#modal-content').innerHTML = `
        <div class="row mx-0 mb-1">
            <div class="col-6">
                <label for="">Hilo:</label>
                <select name="onuHilo" id="onuHilo" class="form-control form-control-sm"required><option value="">Seleccione</option><option value="0">Hilo</option></select>
            </div>
            <div class="col-6">
                <label for="">Splitter:</label>
                <select name="onuSplitter" id="onuSplitter" class="form-control form-control-sm"required><option value="">Seleccione</option><option value="0">Splitter</option></select>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <div class="col-md-12">
                <label for="">Cliente:</label>
                <select name="onuCliente" id="onuCliente" class="form-control form-control-sm"required><option value="">Seleccione</option><option value="0">Cliente</option></select>
            </div>
            <div class="col-md-12">
                <label for="">Dirección del cliente:</label>
                <input type="text" class="form-control form-control-sm" id="onuDireccionCliente" name="onuDireccionCliente" placeholder="Dirección" maxlength="100" required/>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <div class="col-4">
                <label for="">Velocidad en MB:</label>
                <input type="number" class="form-control form-control-sm" id="onuVelocidad" name="onuVelocidad" placeholder="0.00" min="0" step=".01" maxlength="10" required/>
            </div>
            <div class="col-4">
                <label for="">Inicio Contrato:</label>
                <input type="date" class="form-control form-control-sm" id="onuInicioContrato" name="onuInicioContrato" required/>
            </div>
            <div class="col-4">
                <label for="">Monto de Pago:</label>
                <input type="number" class="form-control form-control-sm" id="onuMontoPago" name="onuMontoPago" placeholder="0.00" min="0" step=".01" maxlength="10" required/>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <input type="hidden" class="form-control user-select-none" name="onuCoordenadas"  id="onuCoordenadas" autocomplete="off" required/>
        </div>`;
        /*
        
        SELECT *,
        ST_MakePoint(longitude, latitude) as location
        FROM your_table;

        let coordinates = [{lat: 50, lon: 30}, {lat: 50, lon: 40}];
        let geojson = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "LineString",
            "coordinates": coordinates.map(point => [point.lon, point.lat]) // GeoJSON uses [lon, lat]
        }
        };
        let geojsonString = JSON.stringify(geojson);
        INSERT INTO your_table (geom)
        VALUES (ST_GeomFromGeoJSON(:geojsonString));
        */

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
        if (!submenuPanel.classList.contains("d-none")) {
            submenuPanel.classList.add("d-none");
        }
        //Mapa
        leftClickListener = map.addListener('click', function(event) {
            marker && marker.setMap(null); // limpiar marcadores
            document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + event.latLng.lat() + '<br>Lon: ' +event.latLng.lng();
            document.querySelector('#mufaCoordenadas').value = `{lat:${event.latLng.lat()},lon:${event.latLng.lng()}}`;
            document.querySelector('#btnGuardar').disabled = false;
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                icon: 'resources/img/mufa.png',
                infoWindow: new google.maps.InfoWindow({
                    content: 'Nueva mufa'
                })
            });
            marker.addListener('click', function() {
                this.infoWindow.open(map, this);
            });
            marker.addListener('dragend', function() {
                document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + marker.getPosition().lat() + '<br>Lon: ' +marker.getPosition().lng();
                document.querySelector('#mufaCoordenadas').value = `{lat:${marker.getPosition().lat()},lon:${marker.getPosition().lng()}}`;
            });
        });
        //Modal
        document.querySelector('#modal-title').innerHTML = 'Agregar Mufa';
        document.querySelector('#modal-content').innerHTML = `
        <div class="row mx-0 mb-1">
            <div class="col-12">
                <label for="">Poste:</label>
                <select name="mufaPoste" id="mufaPoste" class="form-control form-control-sm"required><option value="">Seleccione</option><option value="0">M001</option></select>
            </div>
            <div class="col-6">
                <label for="">Capacidad:</label>
                <input type="number" class="form-control form-control-sm" id="mufaCapacidad" name="mufaCapacidad" placeholder="0" maxlength="10" min="0" step=".01" required/>
            </div>
            <div class="col-6">
                <label for="">Código de Mufa:</label>
                <input type="text" class="form-control form-control-sm" id="mufaCodigo" name="mufaCodigo" placeholder="Código" maxlength="10" required/>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <div class="col-6">
                <label for="">Hilo de entrada:</label>
                <select name="mufaHiloEntrada" id="mufaHiloEntrada" class="form-control form-control-sm"required><option value="">Seleccione</option><option value="0">HE1</option></select>
            </div>
            <div class="col-6">
                <label for="">Hilo de salida:</label>
                <select name="mufaHiloSalida" id="mufaHiloSalida" class="form-control form-control-sm"required><option value="">Seleccione</option><option value="0">HS1</option></select>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <input type="hidden" class="form-control user-select-none" name="mufaCoordenadas"  id="mufaCoordenadas" autocomplete="off" required/>
        </div>`;
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
        if (!submenuPanel.classList.contains("d-none")) {
            submenuPanel.classList.add("d-none");
        }
        //Mapa
        leftClickListener = map.addListener('click', function(event) {
            marker && marker.setMap(null); // limpiar marcadores
            document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + event.latLng.lat() + '<br>Lon: ' +event.latLng.lng();
            document.querySelector('#posteCoordenadas').value = `{lat:${event.latLng.lat()},lon:${event.latLng.lng()}}`;
            document.querySelector('#btnGuardar').disabled = false;
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                icon: 'resources/img/poste.png',
                infoWindow: new google.maps.InfoWindow({
                    content: 'Nuevo poste'
                })
            });
            marker.addListener('click', function() {
                this.infoWindow.open(map, this);
            });
            marker.addListener('dragend', function() {
                document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + marker.getPosition().lat() + '<br>Lon: ' +marker.getPosition().lng();
                document.querySelector('#posteCoordenadas').value = `{lat:${marker.getPosition().lat()},lon:${marker.getPosition().lng()}}`;
            });
        });
        //Modal
        document.querySelector('#modal-title').innerHTML = 'Agregar Poste';
        document.querySelector('#modal-content').innerHTML = `
        <div class="row mx-0 mb-1">
            <div class="col-6">
                <label for="">Código de Poste:</label>
                <input type="text" class="form-control form-control-sm" id="posteCodigo" name="posteCodigo" placeholder="Código" maxlength="10" required/>
            </div>
            <div class="col-6">
                <label for="">Apoyos:</label>
                <input type="number" class="form-control form-control-sm" id="posteApoyo" name="posteApoyo" placeholder="0" min="0" maxlength="10" required/>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <div class="col-12">
                <label for="">Propietario:</label>
                <select name="postePropietario" id="postePropietario" class="form-control form-control-sm"required><option value="">Seleccione</option><option value="0">PROPIETARIO</option></select>
            </div>
            <div class="col-6">
                <label for="">Tipo:</label>
                <select name="posteTipo" id="posteTipo" class="form-control form-control-sm" required><option value="">Seleccione</option><option value="0">TIPO</option></select>
            </div>
            <div class="col-6">
                <label for="">Material:</label>
                <select name="posteMaterial" id="posteMaterial" class="form-control form-control-sm" required><option value="">Seleccione</option><option value="0">MATERIAL</option></select>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <div class="col-3">
                <label for="">F12:</label>
                <input type="number" id="posteF12" name="posteF12" placeholder="0" min="0" maxlength="10" class="form-control form-control-sm" required/>
            </div>
            <div class="col-3">
                <label for="">F12B:</label>
                <input type="number" id="posteF12B" name="posteF12B" placeholder="0" min="0" maxlength="10" class="form-control form-control-sm" required/>
            </div>
            <div class="col-3">
                <label for="">F24:</label>
                <input type="number" id="posteF24" name="posteF24" placeholder="0" min="0" maxlength="10" class="form-control form-control-sm" required/>
            </div>
            <div class="col-3">
                <label for="">F24B:</label>
                <input type="number" id="posteF24B" name="posteF24B" placeholder="0" min="0" maxlength="10" class="form-control form-control-sm" required/>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <div class="col-3">
                <label for="">F48:</label>
                <input type="number" id="posteF48" name="posteF48" placeholder="0" min="0" maxlength="10" class="form-control form-control-sm" required/>
            </div>
            <div class="col-3">
                <label for="">F48B:</label>
                <input type="number" id="posteF48B" name="posteF48B" placeholder="0" min="0" maxlength="10" class="form-control form-control-sm" required/>
            </div>
            <div class="col-3">
                <label for="">F96:</label>
                <input type="number" id="posteF96" name="posteF96" placeholder="0" min="0" maxlength="10" class="form-control form-control-sm" required/>
            </div>
            <div class="col-3">
                <label for="">F96B:</label>
                <input type="number" id="posteF96B" name="posteF96B" placeholder="0" min="0" maxlength="10" class="form-control form-control-sm" required/>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <div class="col-3">
                <label for="">F144:</label>
                <input type="number" id="posteF144" name="posteF144" placeholder="0" min="0" maxlength="10" class="form-control form-control-sm" required/>
            </div>
            <div class="col-3">
                <label for="">F144B:</label>
                <input type="number" id="posteF144B" name="posteF144B" placeholder="0" min="0" maxlength="10" class="form-control form-control-sm" required/>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <input type="hidden" class="form-control user-select-none" name="posteCoordenadas"  id="posteCoordenadas" autocomplete="off" required/>
        </div>`;
        if (floatingModal.classList.contains("d-none")) {
            floatingModal.classList.remove("d-none");
        }
        if (!document.querySelector('#btnFinalizarLinea').classList.contains("d-none")) {
            document.querySelector('#btnFinalizarLinea').classList.add("d-none");
        }
    });
    document.getElementById('btnSplitter').addEventListener('click', function () {
        limpiarListeners();
        limpiarObjetos();
        if (!submenuPanel.classList.contains("d-none")) {
            submenuPanel.classList.add("d-none");
        }
        //Mapa
        leftClickListener = map.addListener('click', function(event) {
            marker && marker.setMap(null); // limpiar marcadores
            document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + event.latLng.lat() + '<br>Lon: ' +event.latLng.lng();
            document.querySelector('#splitterCoordenadas').value = `{lat:${event.latLng.lat()},lon:${event.latLng.lng()}}`;
            document.querySelector('#btnGuardar').disabled = false;
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                icon: 'resources/img/splitter.png',
                infoWindow: new google.maps.InfoWindow({
                    content: 'Nuevo splitter'
                })
            });
            marker.addListener('click', function() {
                this.infoWindow.open(map, this);
            });
            marker.addListener('dragend', function() {
                document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>Lat: ' + marker.getPosition().lat() + '<br>Lon: ' +marker.getPosition().lng();
                document.querySelector('#splitterCoordenadas').value = `{lat:${marker.getPosition().lat()},lon:${marker.getPosition().lng()}}`;            
            });
        });
        //Modal
        document.querySelector('#modal-title').innerHTML = 'Agregar Splitter';
        document.querySelector('#modal-content').innerHTML = `
        <div class="row mx-0 mb-1">
            <div class="col-6">
                <label for="">Splitter Padre:</label>
                <select name="splitterPadre" id="splitterPadre" class="form-control form-control-sm"><option value="">Seleccione</option><option value="0">PADRE</option></select>
            </div>
            <div class="col-6">
                <label for="">Código del Splitter:</label>
                <input type="text" class="form-control form-control-sm" id="splitterCodigo" name="splitterCodigo" placeholder="Código" maxlength="10" required/>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <div class="col-6">
                <label for="">Poste:</label>
                <select name="splitterPoste" id="splitterPoste" class="form-control form-control-sm" required><option value="">Seleccione</option><option value="0">POSTE</option></select>
            </div>
            <div class="col-6">
                <label for="">Hilo de entrada:</label>
                <select name="splitterHiloEntrada" id="splitterHiloEntrada" class="form-control form-control-sm" required><option value="">Seleccione</option><option value="0">HE1</option></select>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <div class="col-3">
                <label for="">Capacidad:</label>
                <select name="splitterCapacidad" id="splitterCapacidad" class="form-control form-control-sm" required><option value="">Seleccione</option><option value="0">x4</option></select>
            </div>
            <div class="col-3">
                <label for="">Nro:</label>
                <input type="number" class="form-control form-control-sm" id="splitterNro" name="splitterNro" placeholder="0" min="0" maxlength="10" required/>
            </div>
            <div class="col-3">
                <label for="">Pon:</label>
                <select name="splitterPon" id="splitterPon" class="form-control form-control-sm" required><option value="">Seleccione</option><option value="0">z1</option></select>
            </div>
            <div class="col-3">
                <label for="">Nivel:</label>
                <select name="splitterNivel" id="splitterNivel" class="form-control form-control-sm" required><option value="">Seleccione</option><option value="0">z1</option></select>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <input type="hidden" class="form-control user-select-none" name="splitterCoordenadas"  id="splitterCoordenadas" autocomplete="off" required/>
        </div>`;
        if (floatingModal.classList.contains("d-none")) {
            floatingModal.classList.remove("d-none");
        }
        if (!document.querySelector('#btnFinalizarLinea').classList.contains("d-none")) {
            document.querySelector('#btnFinalizarLinea').classList.add("d-none");
        }
    });
    
    document.getElementById('btnHilo').addEventListener('click', function () {
        limpiarListeners();
        limpiarObjetos();
        if (!submenuPanel.classList.contains("d-none")) {
            submenuPanel.classList.add("d-none");
        }
        let nodeMarker;
        //Mapa
        marker && marker.setMap(null); // limpiar marcadores
        line && line.setMap(null); // limpiar lineas
        leftClickListener = map.addListener('click', function(event) {
            console.log(`Nodo añadido: ${event.latLng.lat()}, ${event.latLng.lng()}`);
            // if(lineNodes.length > 0){
            //     document.querySelector('#btnGuardar').disabled = false;
            // }
            nodeMarker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                icon: 'resources/img/lineNode.png',
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
        document.querySelector('#modal-title').innerHTML = 'Agregar Hilo';
        document.querySelector('#modal-content').innerHTML = `
        <div class="row mx-0 mb-1">
            <div class="col-6">
                <label for="">Código de hilo:</label>
                <input type="text" class="form-control form-control-sm" id="hiloCodigo" name="hiloCodigo" placeholder="Código" maxlength="10" required/>
            </div>
            <div class="col-6">
                <label for="">Nivel:</label>
                <select name="hiloNivel" id="hiloNivel" class="form-control form-control-sm"required><option value="">Seleccione</option><option value="0">Nivel</option></select>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <div class="col-4">
                <label for="">Condición:</label>
                <select name="hiloCondicion" id="hiloCondicion" class="form-control form-control-sm"required><option value="">Seleccione</option><option value="0">Condición</option></select>
            </div>
            <div class="col-4">
                <label for="">Capacidad:</label>
                <input type="number" class="form-control form-control-sm" id="hiloCapacidad" name="hiloCapacidad" placeholder="0.00" min="0" maxlength="10" required/>
            </div>
            <div class="col-4">
                <label for="">Longitud:</label>
                <input type="number" class="form-control form-control-sm" id="hiloLongitud" name="hiloLongitud" placeholder="0.00" min="0" step=".01" maxlength="10" required/>
            </div>
        </div>
        <div class="row mx-0 mb-1">
            <input type="hidden" class="form-control user-select-none" name="hiloCoordenadas"  id="hiloCoordenadas" autocomplete="off" required/>
        </div>`;
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
                document.querySelector('#btnGuardar').disabled = false;
                document.querySelector('#btnFinalizarLinea').disabled = true;
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
                let arrNodes = [];
                line.getPath().getArray().forEach(function(node, index) {
                    coordMsg += `[${index + 1}] Lat: ${node.lat()}, Lon: ${node.lng()}<br>`;
                    arrNodes.push(`{lat:${node.lat()},lon:${node.lng()}}`);
                });
                document.querySelector('#modal-info').innerHTML = 'Coordenadas: <br>' + coordMsg; 
                document.querySelector('#hiloCoordenadas').value = `[${arrNodes.join(',')}]`;            

            }
        }else{
            alert('Debe seleccionar más de un nodo para crear la línea.');
        }
    });

    document.getElementById('btnCancelar').addEventListener('click', function () {
        ocultarPaneles();
        limpiarListeners();
        limpiarObjetos();
    });
    
    document.querySelector('#formRegistrar').addEventListener("submit", (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
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
    document.querySelector('#btnGuardar').disabled = true;
}
