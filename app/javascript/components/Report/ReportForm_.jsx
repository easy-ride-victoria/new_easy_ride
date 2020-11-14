import React, { useState } from "react";
import { Button, TextField, TextareaAutosize, InputLabel, Container, Checkbox, FormGroup, FormLabel } from '@material-ui/core';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Field, Form, ErrorMessage, Formik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import Axios from "axios";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";

const StyledInputLabel = styled.p`
  margin-top: 30px;
  font-size: 1.5rem;
  font-family: "Roboto";
  font-weight: 400;
  `;

const StyledFormLabel = styled.p`
  margin-top: 30px;
  font-size: 1.5rem;
  font-family: "Roboto";
  font-weight: 400;
  `;

  const StyledButton = withStyles({
    root: {
      background: '#004578',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      marginTop: '50px'
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);




export default function AddReportForm() {
  const stylesTextArea = {
    height: "200px",
    width: "550px" 
  }
  const stylesInputField = {
    height: "35px",
    width: "550px" 
  }
  const stylesTitle = {
    textAlign: "center",
    fontSize: "2rem" 
  }
  
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
<Container maxWidth="sm">
    <Form>
      <FormLabel style={stylesTitle} >Thank you for sending your report!</FormLabel>
      <StyledInputLabel htmlFor="first_name"> First Name</StyledInputLabel>
      <Field name="first_name" type="text" style={stylesInputField} />
      <ErrorMessage name="first_name" />
      
      <StyledInputLabel htmlFor="last_name"> Last Name</StyledInputLabel>
      <Field name="last_name" type="text" style={stylesInputField} />
      <ErrorMessage name="last_name" />

      <StyledInputLabel htmlFor="horse"> Horse</StyledInputLabel>
      <Field name="horse" type="text" style={stylesInputField} />
      <ErrorMessage name="horse" />

      <StyledInputLabel htmlFor="activity_date"> Date of your ride or other activity</StyledInputLabel>
      <Field name="activity_date" type="text" style={stylesInputField} />
      <ErrorMessage name="activity_date" />

      <StyledFormLabel >
      <Field type="checkbox" name="answer1" /> 
      {"Did you warm-up with a 10 minutes walk on a loose rein?"}
      </StyledFormLabel>

      <StyledInputLabel htmlFor="answer2"> Select the type of activity you did on that occasion</StyledInputLabel>
      <Field name="answer2" as="select" style={stylesInputField} className="answer2">
      <option value="lunge"></option>

        <option value="lunge">Lunge</option>
        <option value="free_lunge">Free lunge</option>
        <option value="trail_ride">Trail ride</option>
        <option value="ride">Ride in the ring</option>
        <option value="play">Structured play</option>
        <option value="handwalk">Handwalk</option>
      </Field>

      <StyledInputLabel htmlFor="answer3">Please detail the exercises you worked on:</StyledInputLabel>
      <Field name="answer3" style={stylesTextArea} type="text" />
      <ErrorMessage name="answer3" />
    
      <StyledInputLabel htmlFor="answer4">Any other comment you feel are relevant?</StyledInputLabel>
      <Field name="answer4" style={stylesTextArea} type="text" />
      <ErrorMessage name="answer4" />
      
      <FormGroup>
      <StyledButton variant="contained" color="secondary" type="submit">Submit</StyledButton>
      </FormGroup>
    </Form>
    </Container>
  </Formik>
  )};