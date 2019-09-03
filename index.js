const input = document.querySelector('#city');
const submit = document.querySelector('#submit');
const form = document.querySelector('form')
const infoDiv = document.querySelector('#info');
const degType = document.querySelector('#c');
const body = document.querySelector('body');
const clouds = document.querySelectorAll('.cloud');
const sun = document.querySelector('#sun');



form.addEventListener('submit', e => {
  e.preventDefault();
  const city = input.value;
  getWeather(city)
  input.value = '';
})

async function getWeather(city) {

  const res = await fetch(`http://api.openweathermap.org/data/2.5/weather/?q=${city}&APPID=e92851a9cd59f34812b2111d73980b22`, {
    mode: "cors"
  }).catch(err => console.log(err));


  if (res.ok) {
    infoDiv.innerHTML = ''
    const weatherData = await res.json();

    const kTemp = weatherData.main.temp
    const weather = {
      name: weatherData.name,
      cTemp: +(kTemp - 273.15).toFixed(0),
      fTemp: +(kTemp * 9 / 5 - 459.67).toFixed(0),
      cloudInfo: weatherData.weather[0].description,
      windSpeed: weatherData.wind.speed,
      humidity: weatherData.main.humidity
    }
    render(weather);

  } else {
    alert("City not found!");
  }

}

// Initial 
getWeather('Tel aviv')



function render(weather) {
  const card = document.createElement('p');
  const title = document.createElement('h1');
  const temp = document.createElement('span');
  const fTemp = document.createElement('span');
  const cloudInfo = document.createElement('span');
  const wind = document.createElement('span');
  const humidity = document.createElement('span');

  title.innerHTML = weather.name;
  temp.innerHTML = weather.cTemp + ' °C';
  fTemp.innerHTML = weather.fTemp + ' °F';
  cloudInfo.innerHTML = weather.cloudInfo[0].toUpperCase() + weather.cloudInfo.slice(1);
  wind.innerHTML = 'Wind speed:  ' + (weather.windSpeed * 3.6).toFixed(1) + ' Km/H';
  humidity.innerHTML = 'Humidity:  ' + weather.humidity + '%'

  setBackground(weather.cloudInfo);

  card.appendChild(title);
  if (degType.checked) {
    card.appendChild(temp);
  } else {
    card.appendChild(fTemp);
  }
  card.appendChild(cloudInfo)
  card.appendChild(wind);
  card.appendChild(humidity);
  infoDiv.appendChild(card);
}

function setBackground(cloudInfo) {
  if (cloudInfo === 'clear sky') {
    body.style.background = 'linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(70,217,252,1) 100%)'
    clouds.forEach(cloud => {
      cloud.style.display = "block"
      cloud.src = 'http://openweathermap.org/img/wn/03d@2x.png'
    })
    sun.style.display = "block"


  } else if (cloudInfo.includes('clouds')) {
    body.style.background = 'linear-gradient(to right, #283048, #859398)'
    clouds.forEach(cloud => {
      cloud.style.display = "block";
      cloud.src = 'http://openweathermap.org/img/wn/04d@2x.png'
    })
    sun.style.display = "block"

  } else if (cloudInfo.includes('rain') && !cloudInfo.includes('thunderstorm') && !cloudInfo.includes('snow')) {
    body.style.background = 'linear-gradient(to right, #0f0c29, #302b63, #24243e)'
    sun.style.display = "none"
    clouds.forEach(cloud => {
      cloud.style.display = "block";
      cloud.src = 'http://openweathermap.org/img/wn/09d@2x.png'
    });

  } else if (cloudInfo.includes('snow') || cloudInfo.includes('sleet') && !cloudInfo.includes('rain')) {
    body.style.background = 'linear-gradient(to right, #c9d6ff, #e2e2e2)'
    sun.style.display = "block"

  } else if (cloudInfo.includes('thunderstorm') && !cloudInfo.includes('rain')) {
    body.stylee.background = 'linear-gradient(to right, #0f2027, #203a43, #2c5364)'
    sun.style.display = "none"
    clouds.forEach(cloud => {
      cloud.src = 'http://openweathermap.org/img/wn/11d@2x.png'
    })

  } else {
    body.style.background = 'linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(70,217,252,1) 100%)'
    clouds.forEach(cloud => cloud.style.display = "block")
    sun.style.display = "block"
  }
}