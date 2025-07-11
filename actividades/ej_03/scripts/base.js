document.addEventListener('DOMContentLoaded', () => {
    const fechaElemento = document.getElementById('fecha');
    const fechaActual = new Date(document.lastModified);
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    fechaElemento.textContent = fechaActual.toLocaleDateString('es-ES', opcionesFecha);
    
    // Inicializar el valor del setpoint
    document.getElementById("setpoint-value").innerText = document.getElementById("setpoint-slider").value;
    
    // Iniciar la lectura de temperatura
    setInterval(read_temperature, 500);
});

function read_temperature() {
    fetch(`/sensors/ds18b20/read`).then(response => response.json()).then(json => {
        document.querySelector("#temperature-value").innerText = json.temperature;
    });
}

function send_setpoint() {
    let setpoint_value = parseInt(document.querySelector("#setpoint-slider").value);
    fetch(`/setpoint/set/${setpoint_value}`).then(response => response.json()).then(json => {
        document.querySelector("#buzzer-state").innerText = json.buzzer;
    });
}

function updateSetpointValue(value) {
    document.getElementById("setpoint-value").innerText = value;
    send_setpoint();
}

async function toggleLed(ledNum) {
    const button = document.getElementById(`led${ledNum}`);
    const response = await fetch(`/led/${ledNum}/toggle`);
    
    if (response.ok) {
        const isOn = await response.text() === 'True';
        button.classList.toggle('Encendido', isOn);
        button.classList.toggle('Apagado', !isOn);
    }
}

async function sendRgbValues() {
    try {
        const r = document.getElementById('redValue').value;
        const g = document.getElementById('greenValue').value;
        const b = document.getElementById('blueValue').value;
        
        const response = await fetch(`/neopixel/${r}/${g}/${b}`);
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        alert('Color aplicado correctamente!');
    } catch (error) {
        alert('Error al aplicar el color: ' + error.message);
    }
}