const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");

async function checkWeather(city) {
  const apiKey = "108c71e55f722dfeca70d0a754ed6ea8"; // Replace with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const weatherData = await response.json();

    if (response.ok) {
      locationNotFound.style.display = "none";
      weatherBody.style.display = "flex";
      updateWeatherInfo(weatherData);
    } else {
      // Show error image for invalid city
      locationNotFound.style.display = "flex";
      weatherBody.style.display = "none";
    }
  } catch (error) {
    locationNotFound.style.display = "flex";
    weatherBody.style.display = "none";
    console.error(error);
  }
}

function updateWeatherInfo(data) {
  temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
  description.innerHTML = `${data.weather[0].description}`;
  humidity.innerHTML = `${data.main.humidity}%`;
  windSpeed.innerHTML = `${data.wind.speed} Km/H`;

  // Set the weather image based on the weather condition
  switch (data.weather[0].main) {
    case "Clouds":
      weatherImg.src = "cloud.png";
      break;
    case "Clear":
      weatherImg.src = "clear.png";
      break;
    case "Rain":
      weatherImg.src = "rain.png";
      break;
    case "Mist":
      weatherImg.src = "mist.png";
      break;
    case "Snow":
      weatherImg.src = "snow.png";
      break;
    default:
      weatherImg.src = "cloud.png";
  }
}

searchBtn.addEventListener("click", () => {
  const city = inputBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    locationNotFound.style.display = "flex";
    weatherBody.style.display = "none";
    locationNotFound.innerHTML =
      "<h1>Please enter a city name.</h1><img src='404.png' alt='404 Error' />";
  }
});
