import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";

const weatherStyle = {
  marginRight: "65px",
};

import ForecastCard from "./ForecastCard";

const Weather = () => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=48.612128&lon=-123.401191&exclude=minutely,hourly&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER}`
      )
      .then(({ data }) => {
        let weatherData = data.list.filter((entry) =>
          entry.dt_txt.includes("21:00:00")
        );
        let forecasts = [];
        console.log("weatherData is:", weatherData);
        weatherData.forEach((element, index) => {
          let day = new Date(element.dt_txt).getDay();
          let currentElementWeather = element.weather[0]; //object
          let temp = Math.round(element.main.temp) + "°C";
          // console.log(temp);
          // console.log("current e weather ICONS", currentElementWeather.icon);
          let dailyForecast = {
            key: index,
            day: day,
            weather: currentElementWeather.main,
            icon: currentElementWeather.icon,
            temp: temp,
          };
          forecasts.push(dailyForecast);
        });
        // console.log(forecasts);
        setWeather(forecasts);
      });
  }, []);

  return (
    <div>
      <Grid container item xs={12} justify="flex-end">
        <Grid
          container
          justify-items="end"
          spacing={2}
          justify="flex-end"
          style={weatherStyle}
        >
          {weather.map((value) => {
            return (
              <Grid key={value.key} item>
                <ForecastCard
                  day={value.day}
                  weather={value.weather}
                  value={value.key}
                  icon={value.icon}
                  temp={value.temp}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};
export default Weather;
