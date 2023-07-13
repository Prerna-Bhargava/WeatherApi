function getWeather() {
    var cityInput = document.querySelector('.cityInput');
    var cities = cityInput.value.trim().split(' ');

    var weatherInfoContainer = document.querySelector('.weatherInfo');
    weatherInfoContainer.innerHTML = '';
   
      fetch('http://localhost:9000/getWeather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            cities:cities})
    }).then(response => response.json())
      .then(function(weatherData) {
       
        cities.forEach(function(city) {
            if (weatherData.weather.hasOwnProperty(city.toLowerCase())) {
              var cityData = weatherData.weather[city.toLowerCase()];
    
              var weatherCard = document.createElement('div');
              weatherCard.className = 'weatherCard';
    
              weatherCard.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${cityData.icon}.png" alt="Weather Icon">
                <h3>${city}</h3>
                <p>Temperature: ${cityData.temperature}</p>
                <p>Weather: ${cityData.weather}</p>
              `;
    
              weatherInfoContainer.appendChild(weatherCard);
            }
          });
        
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  }

  var getWeatherButton = document.querySelector('#getWeatherButton');
  getWeatherButton.addEventListener('click', getWeather);


