import React, {useEffect, useState} from "react";
import axios from "axios";

const Weather = ({apiKey, cityName}) => {
    const [weatherDetail, setWeatherDetail] = useState(null)
    const [fetchWeather, setFetchWeather] = useState(true)

    useEffect(() => {
        if (cityName !== null && fetchWeather ) {
            console.log("Fetching weather of ", cityName, " using api key ", apiKey)
            axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityName}`)
                .then(response => {
                    console.log(response.data)
                    setFetchWeather(false)
                    if (response.data === null || response.status !== 200) return;
                    if (response.data.success !== undefined && !response.data.success) return;
                    setWeatherDetail(
                        {
                            city: cityName,
                            temperature: response.data.current.temperature,
                            weatherIcon: response.data.current.weather_icons[0],
                            windSpeed: response.data.current.wind_speed,
                            windDirection: response.data.current.wind_dir
                        }
                    )
                })
        }}, [apiKey, cityName, fetchWeather, setFetchWeather, setWeatherDetail])

    if (weatherDetail === null) return "";

    return <div>
        <h3>Weather in {cityName}</h3>
        <b>temperature: </b> {weatherDetail.temperature} Celcius <br/>
        <img src={weatherDetail.weatherIcon} alt={""}/> <br/>
        <b>wind: </b> {weatherDetail.windSpeed} mph. direction: {weatherDetail.windDirection}
    </div>

}

export default Weather