import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
const WeatherApp = () => {
    const [cityInput, setCityInput] = useState('');
    const [weatherData, setWeatherData] = useState({
        humidity: null,
        windSpeed: null,
        temperature: null,
        location: null,
        weatherIcon: cloud_icon // Default icon
    });
    let api_key="b1d1c6830ef57e3559e9d7fdff08f1ce";

    
    const search = async () => {
        if (cityInput === "") {
            return;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;
        
        let response = await fetch(url);
        let data = await response.json();
        
        setWeatherData({
            humidity: `${Math.floor(data.main.humidity)} %`,
            windSpeed: `${Math.floor(data.wind.speed)} km/h`,
            temperature: `${data.main.temp} °c`,
            location: data.name,
            weatherIcon: getWeatherIcon(data.weather[0].icon)
        });

       
    }
    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case "01d":
            case "01n":
                return clear_icon;
            case "02d":
            case "02n":
                return cloud_icon;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                return drizzle_icon;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                return rain_icon;
            case "13d":
            case "13n":
                return snow_icon;
            default:
                return clear_icon;
        }
    }
  return (
    <div className='container'>
    <div className='top-bar'>
    <input type="text" className="cityInput" placeholder='Search'  value={cityInput} onChange={(e) => setCityInput(e.target.value)}/>
    <div className='search-icon' onClick={search}>
    <img src={search_icon} alt=""/>
    </div>
    </div>
    <div className="weather-image">
    <img src={weatherData.weatherIcon} alt=" " />
    </div>
    <div className='weather-temp'>{weatherData.temperature}</div>
    <div className='weather-location'>{weatherData.location}</div>
    <div className="data-container">
    <div className="element">
    <img src={humidity_icon} alt="" className="icon"/>
    <div className='data'>
    <div className="humidity-percent">{weatherData.humidity}</div>
    <div className="text">Humidity</div>
    </div>
    </div>
    <div className="element">
    <img src={wind_icon} alt="" className="icon"/>
    <div className='data'>
    <div className="wind-rate">{weatherData.windSpeed}</div>
    <div className="text">Wind Speed</div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default WeatherApp