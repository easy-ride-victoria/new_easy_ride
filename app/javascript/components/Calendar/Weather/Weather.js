import React, { useState, useEffect } from 'react';
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import ForecastCard from './ForecastCard';

// Material ui customization
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));

const Weather = () => {
  const classes = useStyles();
  const [ weather, setWeather ] = useState([]);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=48.612128&lon=-123.401191&exclude=minutely,hourly&units&appid=`)
      .then(response => {
        console.log(response.data);
        console.log(response.data.list);
        let weatherData = response.data.list.filter(entry => entry.dt_txt.includes("12:00:00"));
        let forecasts = [];
        console.log("weather data", weatherData);
        weatherData.forEach((element, index) => {
          let day = (new Date(element.dt_txt)).getDay();
          console.log("day", day);
          let currentElementWeather = element.weather[0];
          let temp = Math.trunc(element.main.feels_like / 10) + "°C";
          console.log(temp);
          console.log("current e weather CIONS", currentElementWeather.icon);
          let dailyForecast = {'key': index, 'day': day, 'weather': currentElementWeather.main, 'icon': currentElementWeather.icon, "temp": temp};
          console.log("daily forecast", dailyForecast);
          forecasts.push(dailyForecast); console.log(forecasts);
        });
        console.log(forecasts); setWeather(forecasts);
      });
  }, []);
  console.log("WEATHER IS", weather);

  return (
    <div>
      <Grid item xs={12} justify-items="end" >
        <Grid container justify-items="end" spacing={2} >
          {weather.map((value) => {
            // const { day, weather, icon } = weather;
            return (<Grid key={value.key} item>
              <ForecastCard day={value.day} weather={value.weather} value={value.key} icon={value.icon} temp={value.temp} />
            </Grid>);
          })}
        </Grid>
      </Grid>
    </div>
  );
};
export default Weather;