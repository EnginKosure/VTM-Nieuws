import axios from "axios";
const kelvinToCelsius = require("kelvin-to-celsius");

export default class Weather {
  constructor(holder) {
    this._holder = holder;
    this._weatherRef = this.generateHTML();
    this.cityName = document.getElementById("cityInput");
    this.weatherButton = document.getElementById("weatherButton");
    this.weatherInput = document.getElementById("cityInput__form");
    this.temperatureOutput = document.getElementById("temperatureOutput");
    this.temperatureKelvin = document.getElementById("temperatureKelvin");
    this.weatherImg = document.getElementById("weatherImg");
    this.humidity = document.getElementById("humidity");
    this.wind = document.getElementById("wind");

    this.weatherInput.addEventListener = ("submit",
    function(evt) {
      evt.preventDefault();
      this.getWeather; //()olacak mi
    }.bind(this));

    this.weatherButton.onclick = this.getWeather.bind(this);
    this.getWeather();
  }

  generateHTML() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      ` <div class="weather">
            <h2>Enter the location...</h2>
      <form action="" id="cityInput__form">
      <input type="text" id=cityInput autofocus
      placeholder="Location...">
    </form>
      <button id='weatherButton'>Get Weather</button>
     
      <h2>Temperature</h2>
      <p id='temperatureOutput'></p>
      <p id='temperatureKelvin'></p>
      <p id="weatherImg"></p>
      <p id="humidity"></p>
      <p id="wind"></p>
      </div>`
    );
    return this._holder.querySelector("div.weather");
  }

  getWeather() {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          this.cityName.value +
          "&APPID=f7c0e24048ec9b63bbf4a27084c4a7a3"
      )
      .then(result => {
        //console.log(result.data.main.temp);
        //console.log(result.data.weather[0].icon);
        const src =
          "//openweathermap.org/img/w/" + result.data.weather[0].icon + ".png";
        const alt = result.data.weather[0].description || "forecast";
        const image =
          '<img class="weather__icon" alt="' + alt + '" src="' + src + '">';

        temperatureKelvin.innerHTML = result.data.main.temp + " Kelvin(°K)";
        temperatureOutput.innerHTML = `${kelvinToCelsius(
          result.data.main.temp
        )} Celcius (°C)`;
        weatherImg.innerHTML = image;
        humidity.innerHTML = `Humidity: ${result.data.main.humidity} %`;
        wind.innerHTML = `Wind speed: ${result.data.wind.speed} km/h (${
          result.data.wind.deg
        }deg)`;
      });
  }
}
