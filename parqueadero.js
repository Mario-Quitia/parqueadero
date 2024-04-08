document.addEventListener("DOMContentLoaded", function(event) {
    // Esta función se ejecuta cuando el DOM está completamente cargado y listo para ser manipulado

    // Función para mostrar u ocultar el menú lateral al hacer clic en el icono del encabezado
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
              nav = document.getElementById(navId),
              bodypd = document.getElementById(bodyId),
              headerpd = document.getElementById(headerId);

        // Validar que todas las variables existan
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // Mostrar u ocultar el menú lateral
                nav.classList.toggle('show');
                // Cambiar el icono del encabezado
                toggle.classList.toggle('bx-x');
                // Agregar o quitar relleno al cuerpo
                bodypd.classList.toggle('body-pd');
                // Agregar o quitar relleno al encabezado
                headerpd.classList.toggle('body-pd');
            });
        }
    };

    // Llamar a la función showNavbar con los IDs necesarios
    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

    /*===== ENLACE ACTIVO =====*/
    // Obtener todos los elementos con la clase 'nav_link'
    const linkColor = document.querySelectorAll('.nav_link');

    // Función para resaltar el enlace activo cuando se hace clic en él
    function colorLink() {
        if (linkColor) {
            // Eliminar la clase 'active' de todos los enlaces
            linkColor.forEach(l => l.classList.remove('active'));
            // Agregar la clase 'active' al enlace actual
            this.classList.add('active');
        }
    }

    // Agregar un evento 'click' a cada enlace para llamar a la función colorLink
    linkColor.forEach(l => l.addEventListener('click', colorLink));

});

function mostrarComponente(idComponente) {
    // Ocultar todos los componentes
    document.getElementById('registro_entrada').style.display = 'none';
    document.getElementById('registro_salida').style.display = 'none';
    document.getElementById('consulta_componente').style.display = 'none';
    document.getElementById('configuraciones_componente').style.display = 'none';
  
    // Mostrar el componente seleccionado
    document.getElementById(idComponente).style.display = 'block';
}

// Generar las tarjetas dinámicamente
const opciones = [
    { titulo: "Disponibilidad de Espacios", contenido: "Aquí puedes consultar la disponibilidad de espacios." },
    { titulo: "Historial de Entradas y Salidas", contenido: "Aquí puedes ver el historial de entradas y salidas." },
    { titulo: "Revisar Información de Vehículos y Conductores", contenido: "Aquí puedes revisar la información de vehículos y conductores." }
];

const tarjetasContainer = document.getElementById("tarjetas_container");

// Generar las tarjetas dinámicamente
opciones.forEach(opcion => {
    const nuevaTarjeta = document.createElement("div");
    nuevaTarjeta.classList.add("col-md-4");
    nuevaTarjeta.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${opcion.titulo}</h5>
                <p class="card-text">${opcion.contenido}</p>
                <a href="#" class="btn btn-primary">Ir</a>
            </div>
        </div>
    `;
    tarjetasContainer.appendChild(nuevaTarjeta);
});




const registroEntradaForm = document.getElementById('registro_entrada');

// Función para guardar los datos del formulario en la caché del navegador
function guardarDatosEnCache(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const identificacion = document.getElementById('identificacion').value;
    const nombre = document.getElementById('nombre').value;
    const tipoVehiculo = document.getElementById('tipo_vehiculo').value;
    const placa = document.getElementById('placa').value;
    const fechaEntrada = document.getElementById('fecha_entrada').value;
    const horaEntrada = document.getElementById('hora_entrada').value;

    // Guardar los datos del formulario en la caché del navegador
    localStorage.setItem('registro_entrada_data', JSON.stringify({
        identificacion,
        nombre,
        tipoVehiculo,
        placa,
        fechaEntrada,
        horaEntrada
    }));

    // Mostrar una alerta de guardado exitoso
    alert('Registro exitoso. Los datos se han guardado en la caché del navegador.');

    // Actualizar la página
    setTimeout(() => {
        location.reload();
    }, 100); // Espera 100 milisegundos antes de recargar la página

    // Lógica adicional, como enviar los datos a un servidor
    console.log('Datos del formulario guardados en la caché:', {
        identificacion,
        nombre,
        tipoVehiculo,
        placa,
        fechaEntrada,
        horaEntrada
    });
}

// Agregar evento de submit al formulario
registroEntradaForm.addEventListener('submit', guardarDatosEnCache);




function buscarRegistroEntrada() {
    // Obtener el valor de la placa y número de identificación
    const placa = document.getElementById('placaSalida').value.trim();
    const identificacion = document.getElementById('identificacionSalida').value.trim();

    // Verificar si se ingresó al menos uno de los valores
    if (placa === '' && identificacion === '') {
        alert('Por favor ingrese la placa o el número de identificación del vehículo.');
        return;
    }

    // Obtener los datos del registro de entrada de la caché del navegador
    const registroEntradaData = JSON.parse(localStorage.getItem('registro_entrada_data'));

    // Verificar si se encontraron los datos
    if (!registroEntradaData) {
        alert('No se encontraron registros de entrada para la placa o el número de identificación ingresado.');
        return;
    }

    // Verificar si los datos coinciden con la placa o número de identificación ingresado
    if ((placa !== '' && registroEntradaData.placa === placa) ||
        (identificacion !== '' && registroEntradaData.identificacion === identificacion)) {
        // Llenar los campos del formulario de salida con los datos recuperados
        document.getElementById('nombreSalida').value = registroEntradaData.nombre;
        document.getElementById('tipo_vehiculoSalida').value = registroEntradaData.tipoVehiculo;
        document.getElementById('fecha_entradaSalida').value = registroEntradaData.fechaEntrada;
        document.getElementById('hora_entradaSalida').value = registroEntradaData.horaEntrada;
    } else {
        alert('No se encontraron registros de entrada para la placa o el número de identificación ingresado.');
    }

    // Mostrar el formulario de registro de salida
    document.getElementById('registro_salida').style.display = 'block';
}


