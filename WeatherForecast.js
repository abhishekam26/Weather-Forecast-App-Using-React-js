import React, { useEffect, useState } from 'react';

const API_Key = '2e5c7297adfaebe1ebbcd65405309921'; 

const WeatherForecast = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_Key}&units=metric`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [location]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { main, weather, wind } = weatherData;

  return (
    <div>
      <h2>Current Weather</h2>
      <p>Location: {location}</p>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s</p>
      <p>Description: {weather[0].description}</p>
    </div>
  );
};

export default WeatherForecast;
