let cityNameDisplay = document.querySelector('.weather_city');
let dateTime = document.querySelector('.weather_date_time');
let w_forecast = document.querySelector('.weather_forecast');
let w_icon = document.querySelector('.weather_icon');
let w_temperature = document.querySelector('.weather_temperature');
let w_min= document.querySelector('.weather_min');
let w_max= document.querySelector('.weather_max');

let pressure = document.querySelector('.pressure');
let humidity = document.querySelector('.humidity');
let windDiv = document.querySelector('.wind');
let feelsLike = document.querySelector('.feelsLike');
let cityInput = document.querySelector('.cityName');

let citySearch = document.querySelector('.weather_search');

let myCityName = 'mumbai';  // Default city name
citySearch.addEventListener('submit', (e) => {
    e.preventDefault();
    let city = cityInput.value;  // Correct input field reference
    console.log(city);
    myCityName = city;
    getWeatherData();
    cityInput.value = "";  // Clear the input field after submission
});

// Fetch Weather API

const option = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};

const getDateTime = (date) => {
    const newDate = new Date(date * 1000);
    return newDate.toLocaleDateString('en-US', option);
}

const getCountryName = (code) => {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
}

const getWeatherData = async () => {
    const apiKey = 'f534542f311930fade4b587d7d846189';  // Replace with your OpenWeather API key
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${myCityName}&appid=${apiKey}&units=metric`;  // Added units=metric for Celsius
    try {
        const response = await fetch(weather_url);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        console.log(data);

        const {main, name, weather, wind, sys, dt} = data;
        cityNameDisplay.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);
        w_forecast.innerHTML = `${weather[0].main}`;
        w_temperature.innerHTML = `${main.temp}&#176;C`;  // Use Celsius
        w_min.innerHTML = `Min: ${main.temp_min}&#176;C`;
        w_max.innerHTML = `Max: ${main.temp_max}&#176;C`;
        w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather icon"/>`;

        pressure.innerHTML = `${main.pressure} hPa`;
        feelsLike.innerHTML = `${main.feels_like}&#176;C`;
        humidity.innerHTML = `${main.humidity}%`;
        windDiv.innerHTML = `${wind.speed} m/s`;  // Use wind.speed instead of gust

    } catch (err) {
        console.error(err);
        alert(err.message);  // Show an alert if city is not found
    }
}

// Load weather data for default city on page load
window.onload = getWeatherData;
