import React, { useState } from "react";
import { Button, Grid, TextField, TextareaAutosize, InputLabel, Container, Checkbox, FormGroup, FormLabel, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Field, Form, ErrorMessage, Formik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import Axios from "axios";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import { green } from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  textfield: {
    marginTop: "30px",
    marginLeft: "25px",
    marginRight: "25px",
  }
}));

  const StyledButton = withStyles({
    root: {
      background: '#004578',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      marginTop: '50px',
      marginLeft: "30px",
      marginRight: "50px",
    },
    })(Button);




export default function AddReportForm() {
  
  // styles
  const classes = useStyles();
  
  const stylesTextArea = {
    width: "500px" 
  }

  const stylesTitle = {
    width: "500px",
    marginTop: "40px" 
  }
  
  // render
  return (
    <Formik
      initialValues={{ first_name: "", last_name: "", horse: "", activity_date: "", answer1: "", answer2: "", answer3: "", answer4: ""}}
      
      validationSchema={Yup.object({
        first_name: Yup.string()
        .required('Required'),
        last_name: Yup.string()
        .required('Required'),
        horse: Yup.string()
        .required('Required'),
        activity_date: Yup.string()
        .required('Required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        Axios.post("/api/v1/reports", values)
        .then( () => {
          console.log ("sent!")
        setTimeout(() => {
          alert('Thank You!');
          setSubmitting(false);
        }, 400);
      })
      }}
    >
    
      <Grid container alignItems="stretch" justify="space-around" direction="column" >
 
        <Grid item xs className={classes.textfield}>
          <Typography gutterBottom variant="h4">
            Thank you for sending your report!
          </Typography>
        </Grid>
      
        <Grid item xs className={classes.textfield}>
          {/* <StyledInputLabel htmlFor="first_name"> 
            First Name
          </StyledInputLabel> */}
          <TextField id="filled-multiline-static" label="First Name" variant="outlined" name="first_name" style={stylesTextArea} type="text" rows={5}
          InputLabelProps={{
            shrink: true,
          }}/>
          <ErrorMessage name="first_name" />
        </Grid>
      

        <Grid item xs className={classes.textfield}>
          <TextField id="filled-multiline-static" variant="outlined" name="last_name" style={stylesTextArea} type="text" label="Last Name" rows={5} InputLabelProps={{shrink: true,}} />
          <ErrorMessage name="last_name" />
        </Grid>

        <Grid item xs className={classes.textfield}>
          <TextField id="filled-multiline-static" variant="outlined" name="horse" style={stylesTextArea} type="text" label="Horse Name" rows={5} InputLabelProps={{shrink: true,}} />
          <ErrorMessage name="horse" />
        </Grid>

        <Grid item xs className={classes.textfield}>
          <TextField id="filled-multiline-static" variant="outlined" name="activity_date" style={stylesTextArea} type="text" label="Date of your ride or other activity" rows={5} InputLabelProps={{shrink: true,}} />
          <ErrorMessage name="activity_date" />
        </Grid>

      <Grid item xs className={classes.textfield}>
        <FormLabel >
        <Field type="checkbox" name="answer1" /> 
          {"Did you warm-up with a 10 minutes walk on a loose rein?"}
        </FormLabel>
      </Grid>

      <Grid item xs className={classes.textfield}>  
      <InputLabel > Select the type of activity you did on that occasion</InputLabel>
        <Field name="answer2" as="select" className="answer2">
        <option value="lunge"></option>

        <option value="lunge">Lunge</option>
        <option value="free_lunge">Free lunge</option>
        <option value="trail_ride">Trail ride</option>
        <option value="ride">Ride in the ring</option>
        <option value="play">Structured play</option>
        <option value="handwalk">Handwalk</option>
      </Field>
      </Grid>
      
      <Grid item xs className={classes.textfield}>
      {/* <StyledInputLabel htmlFor="answer3">Please detail the exercises you worked on:</StyledInputLabel> */}
      <TextField id="filled-multiline-static" label="Please detail the exercises you worked on" variant="outlined" name="answer3" style={stylesTitle} type="text" rows={5}
      InputLabelProps={{
        shrink: true,
      }}/>
      <ErrorMessage name="answer3" />
      </Grid>
      
      <Grid item xs className={classes.textfield}>
      {/* <StyledInputLabel htmlFor="answer4">Any other comment you feel are relevant?</StyledInputLabel> */}
      <TextField id="filled-multiline-static" label="Any other comment you feel are relevant?" variant="outlined" name="answer4" style={stylesTextArea} type="text" rows={5}
      InputLabelProps={{
        shrink: true,
      }}/>
      <ErrorMessage name="answer4" />
      </Grid>

      <FormGroup>
      <StyledButton variant="contained" color="primary" type="submit">SUBMIT</StyledButton>
      </FormGroup>
      
    
    </Grid>
  </Formik>
  )};
