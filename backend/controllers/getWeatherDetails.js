const axios = require('axios');

const getWeatherDetails = (async (req, res) => {
    try {
        const { cities } = req.body;
        const weatherData = await Promise.all(
            cities.map(async (city) => {
                const response = await axios.get(
                    ` https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.API_KEY}`
                );
                return {
                    city,
                    temperature: response.data.main.temp + 'C',
                    weather: response.data.weather[0].main,
                    icon: response.data.weather[0].icon,
                };
            })
        );

        const weather = {};
        weatherData.forEach((data) => {
            // For each city,Returning city's temperature, weather description(cloudy,sunny,etc) and icon(for frontend)
            weather[data.city] = {
                temperature: data.temperature,
                weather:data.weather,
                icon:data.icon
            }
        });
        res.json({ weather });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports ={getWeatherDetails}