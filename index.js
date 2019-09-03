const input = document.querySelector('#city');
const submit = document.querySelector('#submit');
const infoDiv = document.querySelector('#info');
const degType = document.querySelector('#c');


submit.addEventListener('click', e => {
  e.preventDefault();
  const city = input.value;
  getWeather(city)
  input.value = '';
})

async function getWeather(city) {
  infoDiv.innerHTML = ''
  const res = await fetch(`http://api.openweathermap.org/data/2.5/weather/?q=${city}&APPID=e92851a9cd59f34812b2111d73980b22`, {
    mode: "cors"
  })
  if (res.ok) {
    const weatherData = await res.json();
    const kTemp = weatherData.main.temp
    const weather = {
      name: weatherData.name,
      cTemp: +(kTemp - 273.15).toFixed(0),
      fTemp: +(kTemp * 9 / 5 - 459.67).toFixed(0),
      clouds: weatherData.weather[0].description,
      windSpeed: weatherData.wind.speed,
      humidity: weatherData.main.humidity

    }
    console.log(weather);
    render(weather);
  } else {
    infoDiv.innerHTML = "City not found!"
  }

}

// Initial 
getWeather('London')


function render(weather) {
  const card = document.createElement('p');
  const title = document.createElement('h1');
  const temp = document.createElement('span');
  const fTemp = document.createElement('span');
  const clouds = document.createElement('span');
  const wind = document.createElement('span');
  const humidity = document.createElement('span');

  title.innerHTML = weather.name;
  temp.innerHTML = weather.cTemp + ' °C';
  fTemp.innerHTML = weather.fTemp + ' °F';
  clouds.innerHTML = weather.clouds[0].toUpperCase() + weather.clouds.slice(1);
  wind.innerHTML = (weather.windSpeed * 3.6).toFixed(1) + ' Km/H';
  humidity.innerHTML = 'Humidity ' + weather.humidity + '%'

  card.appendChild(title);
  if (degType.checked) {
    card.appendChild(temp);
  } else {
    card.appendChild(fTemp);
  }
  card.appendChild(clouds)
  card.appendChild(wind);
  card.appendChild(humidity);
  infoDiv.appendChild(card);

}