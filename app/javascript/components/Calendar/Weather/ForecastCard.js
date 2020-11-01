import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: 100,
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

  const retrieveIconURL = (icon) => {
    return `http://openweathermap.org/img/w/${icon}.png`;
  };

  return (
    <>
      <Paper className={classes.paper} >
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.dayHeading}>
            <Typography variant="subheading" align="center"> {retrieveDayName(props.day)} </Typography>
          </Grid>
          <Grid item xs={12} className={classes.forecastImage}>
            <Grid
              container
              justify="center">
              <img src={retrieveIconURL(props.icon)} alt={props.weather} height="100" width="100" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subheading" align="center"> {props.weather} </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
             
export default ForecastCard;