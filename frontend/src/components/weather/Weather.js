import React, { useEffect, useState, useContext } from "react";
import style from "./weather.module.css";
import { QueryContext } from "../../contexts/SearchContext";
import { LocationInfoContext } from "../../contexts/LocationContext";
import ForecastDay from "./ForecastDay";

const Weather = () => {
  const APP_KEY = "88a70d035c9e5f9ab0e1f599a09b7ce7";

  const [location, setLocation] = useContext(LocationInfoContext);
  const [query, setQuery] = useContext(QueryContext);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [feelsLike, setFeelsLike] = useState(0);
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cloudiness, setCloudiness] = useState(0);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [forecast, setForecast] = useState([{}]);

  const setDefaultWeather = () => {
    setName("Location not found");
    setCountry("");
    setCloudiness(0);
    setFeelsLike(0);
    setTemp(0);
    setHumidity(0);
    setWind(0);
    setDescription("");
    setIcon("");

    setLocation("");
  };

  useEffect(async () => {
    getWeather();
    getForecast();
  }, [query]);

  const getWeather = async () => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${
        query.split(", ")[0]
      },${query.split(", ")[1]}&appid=${APP_KEY}`
    );
    const data = await response.json();

    if (data.cod == 404) {
      setDefaultWeather();

      return;
    }

    setName(data.name);
    setCountry(data.sys.country);
    setCloudiness(data.clouds.all);
    setFeelsLike(Math.round(data.main.feels_like - 273.15));
    setTemp(Math.round(data.main.temp - 273.15));
    setHumidity(data.main.humidity);
    setWind(Math.round(data.wind.speed * 3.6));
    setDescription(data.weather[0].description);
    setIcon(data.weather[0].icon);

    setLocation(data.name + ", " + data.sys.country);
  };

  const getForecast = async () => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${
        query.split(", ")[0]
      },${query.split(", ")[1]}&appid=${APP_KEY}`
    );
    const data = await response.json();

    if (data.cod == 404) {
      setForecast([]);
      return;
    }

    setForecast([
      {
        dt: data.list[7].dt,
        date: data.list[7].dt_txt,
        temp: Math.round(data.list[7].main.temp - 273.15),
        icon: data.list[7].weather[0].icon,
        description: data.list[7].weather[0].main,
      },
      {
        dt: data.list[15].dt,
        date: data.list[15].dt_txt,
        temp: Math.round(data.list[15].main.temp - 273.15),
        icon: data.list[15].weather[0].icon,
        description: data.list[15].weather[0].main,
      },
      {
        dt: data.list[23].dt,
        date: data.list[23].dt_txt,
        temp: Math.round(data.list[23].main.temp - 273.15),
        icon: data.list[23].weather[0].icon,
        description: data.list[23].weather[0].main,
      },
    ]);
  };

  return (
    <div className={style["weather-container"]}>
      <h1>
        {name}, {country}
      </h1>
      <p className={style.description}>{description}</p>
      <div className={style.iconDiv}>
        <img
          className={style.icon}
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Weather icon"
        />
        <label className={style.label}>{temp}℃</label>
      </div>
      <div className={style.infoDiv}>
        <p>Cloudiness: {cloudiness}%</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {wind} km/h</p>
        <p>Feels like: {feelsLike}℃</p>
      </div>
      <div className={style.forecastDiv}>
        {forecast.map((day) => (
          <ForecastDay
            temp={day.temp}
            icon={day.icon}
            description={day.description}
            date={day.date}
            key={day.dt}
          />
        ))}
      </div>
    </div>
  );
};

export default Weather;
