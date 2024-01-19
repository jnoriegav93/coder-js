let map;
let drawingManager;

let menuPanel  = document.querySelector("#floating-menu-panel");
let submenuPanel = document.querySelector("#floating-submenu-panel");
let menuIcon = document.querySelector("#btnMenu > i");
let floatingModal  = document.querySelector("#floating-modal");

function initMap() {
    // Asigna eventos de clic a los botones
    document.getElementById('btnMenu').addEventListener('click', function () {
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
    });

    document.getElementById('btnCrear').addEventListener('click', function () {
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
        activateDrawInteraction('marker', 'ONU');
    });
    document.getElementById('btnMufa').addEventListener('click', function () {
        activateDrawInteraction('marker', 'Mufa');
    });
    document.getElementById('btnPoste').addEventListener('click', function () {
        activateDrawInteraction('marker', 'Poste');
    });
    document.getElementById('btnSplitter').addEventListener('click', function () {
        activateDrawInteraction('marker', 'Splitter');
    });
    document.getElementById('btnFibra').addEventListener('click', function () {
        activateDrawInteraction('line', 'Fibra');
    });
    // document.getElementById('polygonBtn').addEventListener('click', function () {
    //     activateDrawInteraction('polygon', 'Dibujar Polígono');
    // });


    

    document.getElementById('btnGuardar').addEventListener('click', function () {
        // Aquí puedes agregar la lógica para guardar según la herramienta seleccionada
        alert('Guardando datos de la herramienta: ');
    });

    document.getElementById('btnCancelar').addEventListener('click', function () {
        document.querySelectorAll('#formRegistrar [required]').forEach(function(elemento) {
            elemento.removeAttribute('required');
          });
        if (!floatingModal.classList.contains("d-none")) {
            floatingModal.classList.add("d-none");
        }
    });
    
    document.querySelector('#formRegistrar').addEventListener("submit", (e) => {
        e.preventDefault();
    });

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

    // google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
    //     if (event.type == 'marker' || event.type == 'polygon' || event.type == 'polyline') {
    //         drawingManager.setDrawingMode(null);
    //         // Aquí puedes realizar acciones adicionales con el objeto event.overlay, por ejemplo, guardar las coordenadas o personalizar el objeto.
    //     }
    // });

    function activateDrawInteraction(objectType, toolTitle) {
        if (floatingModal.classList.contains("d-none")) {
            floatingModal.classList.remove("d-none");
        }
        document.querySelector('#modal-title').innerHTML = 'Agregar '+ toolTitle;
        let arrayIconos = [
            { tipo: 'ONU', url: '../resources/img/onu.png' },
            { tipo: 'Mufa', url: './resources/img/mufa.png' },
            { tipo: 'Poste', url: './resources/img/poste.png' },
            { tipo: 'Splitter', url: './resources/img/splitter.png' }
        ];
        console.log(toolTitle);
        drawingManager.setMap(null);
        switch (objectType) {
            case 'marker':
                //Agregar formulario
                document.querySelector('#modal-content').innerHTML = `
                <label for="marker-title">Título:</label>
                <input type="text" id="marker-title" name="marker-title" class="form-control" required>
                <label for="marker-description">Descripción:</label>
                <textarea id="marker-description" name="marker-description" class="form-control" required></textarea>
                `;
                
                let iconoSeleccionado = arrayIconos.find(objeto =>objeto.tipo === toolTitle);
                // Crear marcador
                drawingManager.setOptions({
                    drawingControl: false,
                    drawingMode: google.maps.drawing.OverlayType.MARKER,
                    markerOptions: {
                        //icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                        icon: iconoSeleccionado ? iconoSeleccionado.url : null
                    }
                });
                break;
            case 'line':
                // Dibujar línea
                drawingManager.setOptions({
                    drawingControl: false,
                    drawingMode: google.maps.drawing.OverlayType.POLYLINE,
                    polylineOptions: {
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    }
                });
                break;
            case 'polygon':
                // Dibujar polígono
                drawingManager.setOptions({
                    drawingControl: false,
                    drawingMode: google.maps.drawing.OverlayType.POLYGON,
                    polygonOptions: {
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35
                    }
                });
                break;
            default:
                break;
        }
        drawingManager.setMap(map);


    }

}
