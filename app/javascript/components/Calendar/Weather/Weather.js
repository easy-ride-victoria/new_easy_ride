import React, { useState, useEffect } from 'react';
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import ForecastCard from './ForecastCard';

// Material ui customization
const useStyles = makeStyles((theme) => ({
  // table: {
  // width: "90%",
  // margin: "auto",
  // }, // tableHead: {
  // backgroundColor: "#004578",
  // },
  // tableCellHead: {
  // color: "white",
  // fontSize: "1.5rem",
  // fontFamily: "Roboto",
  // lineHeight: "3rem",
  // },
  // tableCellHeader: {
  // fontSize: "1.5rem",
  // fontFamily: "Roboto",
  // },
  // control: {
  // fontSize: "1.5rem",
  // fontFamily: "Roboto",
  // padding: theme.spacing(3),
  // },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  gridRow: {
    marginTop: 50
  }
}));

const Weather = () => {
  const classes = useStyles();
  const [ weather, setWeather ] = useState([]);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=48.612128&lon=-123.401191&exclude=minutely,hourly&units&appid=`)
      .then(response => {
        console.log(response.data);
        console.log(response.data.list);
        let weatherData = response.data.list.filter(entry => entry.dt_txt.includes("10:00:00"));
        let forecasts = [];
        console.log("weather data", weatherData);
        weatherData.forEach((element, index) => {
          let day = (new Date(element.dt_txt));
          console.log("day", day);
          let currentElementWeather = element.weather[0];
          let temp = Math.trunc(element.main.feels_like) + "C";
          console.log(temp); console.log("current e weather", currentElementWeather);
          let dailyForecast = {'key': index, 'day': day, 'weather': currentElementWeather.main, 'icon': currentElementWeather.icon};
          console.log("daily forecast", dailyForecast);
          forecasts.push(dailyForecast); console.log(forecasts);
        });
        console.log(forecasts); setWeather(forecasts);
      });
  }, []);
  console.log("WEATHER IS", weather);

  return (
    <div>
      <h1>Workind here</h1>
      <Typography variant="display4" align="center">
      Forecast
      </Typography>
      <Grid item xs={12} className={classes.gridRow}>
        <Grid container justify="center" spacing={16}>
          {weather.map((value) => {
            // const { day, weather, icon } = weather;
            return (<Grid key={value.key} item>
              <ForecastCard day={value.day} weather={value.weather} value={value.key} icon={value.icon} />
            </Grid>);
          })}
        </Grid>
      </Grid>
    </div>
  );
};
export default Weather;