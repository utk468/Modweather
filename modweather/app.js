document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

   
    document.getElementById("error").textContent = "";
    document.getElementById("weatherInfo").textContent = "";

    if (!city) {
        document.getElementById("error").textContent = "Please enter a city name.";
        return;
    }

    const apiKey = API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("City not found or invalid API key.");
        }

        const data = await response.json();

        const weatherInfo = `
            <p><strong>City:</strong> ${data.name}</p>
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
        `;

        document.getElementById("weatherInfo").innerHTML = weatherInfo;
    } catch (error) {
        console.error(error);
        document.getElementById("error").textContent = error.message;
    }
}
