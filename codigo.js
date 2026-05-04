const claveApi = 'cea229477ea14c6c8af140642260405';
const inpCiudad = document.getElementById('input-ciudad');
const idioma = "es";

async function buscarClima() {

    const ciudad = inpCiudad.value;

    if(!ciudad) {
        alert('Por favor, ingresa el nombre de una ciudad.');
        return;
    }

    const apiClimaActual = `https://api.weatherapi.com/v1/current.json?q=${ciudad}&lang=${idioma}&key=${claveApi}`;

    try {
        const response = await fetch(apiClimaActual);
        
        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }

        const data = await response.json();
        console.log(data);
        mostrarClima(data);

    } catch (error) {
        alert("No se pudo encontrar el clima para esa ciudad. Intenta con otra.");
        console.error(error);
    }
}

function mostrarClima(data) {
    document.querySelector('.clima-icono').src = data.current.condition.icon;
    document.querySelector('.clima-texto').innerHTML = data.current.condition.text;
    document.querySelector('.temp').innerHTML = data.current.temp_c + '°C';
    document.querySelector('.ciudad').innerHTML = data.location.name;
    document.querySelector('.humedad').innerHTML = data.current.humidity + '%';
    document.querySelector('.viento').innerHTML = data.current.wind_kph + ' km/h';

    document.getElementById('clima-contenedor').style.display = 'block';
}