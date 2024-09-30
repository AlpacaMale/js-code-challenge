const weatherToggle = document.querySelector(".header__widget");
const weather = document.querySelector(".weather");

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}&units=metric`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather1 = document.querySelector(".header__weather");
      const weather2 = document.querySelector(".weather__temperature");
      const city1 = document.querySelector(".header__location");
      const city2 = document.querySelector(".weather__location");
      const wind = document.querySelector(".weather__wind");
      const feels_like = document.querySelector(".weather__perceived");
      const weatherMain = document.querySelector(".weather__condition");
      const icon1 = document.querySelector(".header__icon");
      const icon2 = document.querySelector(".weather__icon");
      const weatherCondition = data.weather[0].main;
      const temp = Math.floor(parseInt(data.main.temp));
      const tempFeels = Math.floor(parseInt(data.main.feels_like));
      const icon = getIcon(weatherCondition);
      weather1.innerText = `${temp}°`;
      weather2.innerText = `${temp}°`;
      city1.innerText = data.name;
      city2.innerText = data.name;
      wind.innerText = data.wind.speed;
      feels_like.innerText = `${tempFeels}°`;
      weatherMain.innerText = weatherCondition;
      icon1.innerHTML = icon;
      icon2.innerHTML = icon;
    });
}

function onGeoError() {
  alert("can't find you. No weather for you.");
}

function getIcon(weatherCondition) {
  if (weatherCondition === "Thunderstorm") return '<i class="fa-solid fa-cloud-bolt"></i>';
  else if (weatherCondition === "Drizzle" || weatherCondition === "Rain") return '<i class="fa-solid fa-cloud-rain"></i>';
  else if (weatherCondition === "Snow") return '<i class="fa-solid fa-snowflake"></i>';
  else if (weatherCondition === "Atmosphere") return '<i class="fa-solid fa-smog"></i>';
  else if (weatherCondition === "Clear") return '<i class="fa-solid fa-sun"></i>';
  else if (weatherCondition === "Clouds") return '<i class="fa-solid fa-cloud"></i>';
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
weatherToggle.addEventListener("click", () => weather.classList.toggle(HIDDEN_CLASSNAME));
