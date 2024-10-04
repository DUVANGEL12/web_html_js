
document.addEventListener("DOMContentLoaded", function () {
    // Cargar las noticias desde un archivo JSON
    fetch('../data/noticias.json')
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            const newsContent = document.getElementById('news-content');
            let newsHTML = '';
            // Recorrer las noticias y generar el HTML correspondiente
            data.noticias.forEach(noticia => {
                newsHTML += `
                <div class="news-item">
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.descripcion}</p>
                    <span>${noticia.fecha}</span>
                </div>`;
            });
            newsContent.innerHTML = newsHTML;
        })
        .catch(error => console.error('Error cargando las noticias:', error)); 
});
// Funcionalidad del formulario de presupuesto
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('presupuestoForm');
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const telefono = document.getElementById('telefono');
    const producto = document.getElementById('producto');
    const plazo = document.getElementById('plazo');
    const presupuestoTotal = document.getElementById('presupuestoTotal');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Función para calcular el presupuesto total
    function calcularPresupuesto() {
        let total = 0;

        // Sumar el precio del producto seleccionado
        total += parseInt(producto.value) || 0;

        // Sumar el precio de los extras seleccionados
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseInt(checkbox.value);
            }
        });

        // Aplicar descuento si el plazo es mayor a 12 meses
        const meses = parseInt(plazo.value) || 0;
        if (meses > 12) {
            total *= 0.9; // 10% de descuento
        }

        // Mostrar el total calculado en el campo de presupuesto
        presupuestoTotal.value = `$${total.toFixed(2)}`;
    }

    // Escuchar cambios en el formulario y recalcular el presupuesto
    form.addEventListener('input', calcularPresupuesto);

    // Validación del formulario al enviarlo
    form.addEventListener('submit', function (event) {
        // Validar el campo de nombre (solo letras, máximo 15 caracteres)
        if (!/^[A-Za-z]{1,15}$/.test(nombre.value)) {
            alert("El nombre debe contener solo letras y un máximo de 15 caracteres.");
            event.preventDefault(); // Evitar envío del formulario
            return;
        }

        // Validar el campo de apellidos (solo letras, máximo 40 caracteres)
        if (!/^[A-Za-z\s]{1,40}$/.test(apellidos.value)) {
            alert("Los apellidos deben contener solo letras y un máximo de 40 caracteres.");
            event.preventDefault();
            return;
        }

        // Validar el campo de teléfono (solo 9 dígitos)
        if (!/^\d{9}$/.test(telefono.value)) {
            alert("El teléfono debe contener solo números y 9 dígitos.");
            event.preventDefault();
            return;
        }

        // Validar si los términos y condiciones han sido aceptados
        if (!document.getElementById('acepto').checked) {
            alert("Debe aceptar los términos y condiciones.");
            event.preventDefault();
            return;
        }
    });
});

//informacion sobre mapa//

var map = L.map('map').setView([40.416775, -3.703790], 13); 


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var marker = L.marker([40.416775, -3.703790]).addTo(map)
    .bindPopup('<b>AlcalaSchool España</b><br>Calle hernan cortes 123, Madrid, España')
    .openPopup();
