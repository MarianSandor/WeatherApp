import React from "react";
import style from "./weather.module.css";

const ForecastDay = ({ date, icon, description, temp }) => {
  return (
    <div>
      <p className={style.forecastDescription}>
        {date !== undefined ? date.split(" ")[0] : ""}
      </p>
      <p className={style.forecastDescription}>
        {description !== undefined ? description : ""}
      </p>
      <div className={style.forecastIcon}>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Weather icon"
        />
        <label className={style.label}>{temp !== undefined ? temp : ""}℃</label>
      </div>
    </div>
  );
};

export default ForecastDay;
