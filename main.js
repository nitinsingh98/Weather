const icon_data = [
  ["01d", "http://openweathermap.org/img/wn/01d@2x.png"],
  ["02d", "http://openweathermap.org/img/wn/02d@2x.png"],
  ["03d", "http://openweathermap.org/img/wn/03d@2x.png"],
  ["04d", "http://openweathermap.org/img/wn/04d@2x.png"],
  ["09d", "http://openweathermap.org/img/wn/09d@2x.png"],
  ["10d", "http://openweathermap.org/img/wn/10d@2x.png"],
  ["11d", "http://openweathermap.org/img/wn/11d@2x.png"],
  ["13d", "http://openweathermap.org/img/wn/13d@2x.png"],
  ["50d", "http://openweathermap.org/img/wn/50d@2x.png"],
  ["01n", "http://openweathermap.org/img/wn/01n@2x.png"],
  ["02n", "http://openweathermap.org/img/wn/02n@2x.png"],
  ["03n", "http://openweathermap.org/img/wn/03n@2x.png"],
  ["04n", "http://openweathermap.org/img/wn/04n@2x.png"],
  ["09n", "http://openweathermap.org/img/wn/09n@2x.png"],
  ["10n", "http://openweathermap.org/img/wn/10n@2x.png"],
  ["11n", "http://openweathermap.org/img/wn/11n@2x.png"],
  ["13n", "http://openweathermap.org/img/wn/13n@2x.png"],
  ["50n", "http://openweathermap.org/img/wn/50n@2x.png"],
];

async function check_Weather(e) {
  e.preventDefault();
  const apiKey = "a4db5ff1eacbc5fbf02cd02a8396372c"; // ← Add your own key
  const city = e.target.input.value;
  const selected = document.querySelector(
    'input[name="inlineRadio"]:checked'
  ).value;

  if (city) {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    ).then((response) => response.json());

    if (data.cod == "200") {
      const tempCurrent = Math.floor(data.main.temp - 273);
      const tempFelt = Math.floor(data.main.feels_like - 273);
      const tempMin = Math.floor(data.main.temp_min - 273);
      const tempMax = Math.floor(data.main.temp_max - 273);
      const humidity = data.main.humidity;
      const wind = Math.floor(data.wind.speed * 3.6);
      const atmosphere = data.weather[0].description;
      const icon = data.weather[0].icon;
      let url = "";

      console.log(data.wind);

      for (const key in icon_data) {
        if (icon_data[key][0] === icon) {
          url = icon_data[key][1];
          console.log(url);
          break;
        }
      }

      const child = `<div class="card-body p-4 ">
                <h4 class="mb-1 sfw-normal" id="cityName">${data.name}, ${data.sys.country}</h4>
                <p class="para bigger mb-2" id="current">Current temperature: <strong>${tempCurrent}°C</strong></p>
                <p class="para" id="feels">Feels like: <strong>${tempFelt}°C</strong></p>
                <p class="para">
                  Max: <strong>${tempMax}°C</strong>, Min: <strong>${tempMin}°C</strong>
                </p>
                <p class="para" id="feels">Humidity: <strong>${humidity}%</strong></p>
                <p class="para" id="feels">Wind: <strong>${wind} km/h</strong></p>

                <div class="d-flex flex-row align-items-center">
                  <p class="bigger mb-0 me-4">${atmosphere}</p>
                  <img src=${url} alt="image of current weather">
                  <i class="fas fa-cloud fa-3x" style="color: #eee"></i>
                </div>
              </div>`;
      document.getElementById("mainElement").innerHTML = child;
    } else {
      document.getElementById("mainElement").innerHTML =
        "<h5>Please enter a valid city name</h5>";
    }
  } else {
    document.getElementById("mainElement").innerHTML =
      "<h5>Please enter a city name</h5>";
  }
}
