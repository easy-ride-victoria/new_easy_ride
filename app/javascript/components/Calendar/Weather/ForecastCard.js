import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import 01d from './01d.png';
import 02d from './02d.png';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: 100,
    spacing: 8,
    padding: 8,
  },
  dayHeading: {
    paddingBottom: 0,
    paddingTop: 8
  },
  forecastImage: {
    padding: 0
  }});


const ForecastCard = (props) => {
  const classes = useStyles();

  const retrieveDayName = (dayNumber) => {
    let dayArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return dayArray[dayNumber];
  };

  // const retrieveIconURL = (icon) => {
  //   return `http://openweathermap.org/img/wn/${icon}.png`;
  // };

  // const imageIcon = (icono) => {
  //   return `${icono}.png`;
  // };

  return (
    <>
      <Paper className={classes.paper} >
        <Grid container className={classes.root} justify="space-between">
          <Grid item xs={12} className={classes.dayHeading}>
            <Typography variant="subheading" align="center"> {retrieveDayName(props.day)} </Typography>
          </Grid>
          <Grid item xs={12} className={classes.forecastImage}>
            <Grid
              container
              justify="center">
              <img src={imageIcon(props.icon)} alt={props.weather} height="100" width="100" />
            </Grid>
          </Grid>
          <Grid item xs={12} container justify="space-between">
            <Typography inline variant="subheading" align="left"> {props.weather} </Typography>
            <Typography inline variant="subheading" align="right"> {props.temp} </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
             
export default ForecastCard;