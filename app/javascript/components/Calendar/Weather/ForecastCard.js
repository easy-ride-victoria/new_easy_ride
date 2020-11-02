import React from 'react';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    paddingBottom: 18,
  },
  paper: {
    width: 100,
    spacing: 5,
    padding: 5,
  },
  dayHeading: {
    paddingBottom: 0,
    justifyContent: "space-around",
    margin: "auto",
    textAlign: "center",
   
  },
  forecastImage: {
    padding: 2,
  }});


const ForecastCard = (props) => {
  const classes = useStyles();

  const retrieveDayName = (dayNumber) => {
    let dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return dayArray[dayNumber];
  };

  const retrieveIconURL = (icon) => {
    let showIcon = "";
    switch (icon) {
    case "01d":
    case "01n": {
      // return "https://vtra.smugmug.com/Weathericons/n-bFxtHL/i-8dVHt5n/A";
      showIcon = `https://raw.githubusercontent.com/easy-ride-victoria/new_easy_ride/add-weather/docs/weatherIcons/01d.png`;
      break;
    }
    case "02d":
    case "02n": {
      // return "https://vtra.smugmug.com/Weathericons/n-bFxtHL/i-Mgr3C75/A";
      showIcon = "https://raw.githubusercontent.com/easy-ride-victoria/new_easy_ride/add-weather/docs/weatherIcons/02d.png";
      break;
    }
    case "03d":
    case "03n": {
      // return "https://vtra.smugmug.com/Weathericons/n-bFxtHL/i-htWNHsc/A";
      showIcon = "https://github.com/easy-ride-victoria/new_easy_ride/blob/add-weather/docs/weatherIcons/03d.png?raw=true";
      break;
    }
    case "04d":
    case "04n": {
      // return "https://vtra.smugmug.com/Weathericons/n-bFxtHL/i-PZvg7pf/A";
      showIcon = "https://github.com/easy-ride-victoria/new_easy_ride/blob/add-weather/docs/weatherIcons/04d.png?raw=true";
      break;
    }
    case "09d":
    case "10d":
    case "09n":
    case "10n": {
      // return "https://vtra.smugmug.com/Weathericons/n-bFxtHL/i-WKz5xFV/A";
      showIcon = `https://github.com/easy-ride-victoria/new_easy_ride/blob/add-weather/docs/weatherIcons/09d.png?raw=true`;
      break;
    }
    case "11d":
    case "11n": {
      // return "https://vtra.smugmug.com/Weathericons/n-bFxtHL/i-BdkMbXW/A";
      showIcon = "https://github.com/easy-ride-victoria/new_easy_ride/blob/add-weather/docs/weatherIcons/11d.png?raw=true";
      break;
    }
    case "13d":
    case "13n": {
      // return "https://vtra.smugmug.com/Weathericons/n-bFxtHL/i-vcLN9Xp/A";
      showIcon = "https://github.com/easy-ride-victoria/new_easy_ride/blob/add-weather/docs/weatherIcons/13d.png?raw=true";
      break;
    }
    case "50d":
    case "50n": {
      // return "https://vtra.smugmug.com/Weathericons/n-bFxtHL/i-sZLRgwN/A";
      showIcon = "https://github.com/easy-ride-victoria/new_easy_ride/blob/add-weather/docs/weatherIcons/50d.png?raw=true";
      break;
    }
    default:
      console.log("Icon not available", icon);
    }
    return showIcon;
  };

  return (
    <>
      <Paper elevation={2} className={classes.paper} >
        <Grid justify="space-between" container className={classes.root} >
          <Grid item xs={12} className={classes.dayHeading}>
            <Typography variant="subheading" align="center" >  {retrieveDayName(props.day)} </Typography>
          </Grid>
          <Grid item xs={12} className={classes.forecastImage}>
            <Grid
              container
              justify="center">
              <img src={retrieveIconURL(props.icon)} alt={props.weather} height="30" width="30" />
            </Grid>
          </Grid>
          <Grid item xs={12} container justify="space-between">
            <Typography inline variant="subheading" align="left"> {props.weather} </Typography>
            <Typography inline variant="subheading" align="right" > {props.temp} </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
             
export default ForecastCard;