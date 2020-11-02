import React, { useState } from "react";
import { Button, TextField, TextareaAutosize, InputLabel, Container, Checkbox, FormGroup, FormLabel } from '@material-ui/core';
import { Field, Form, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import Axios from "axios";




export default function AddReportForm() {


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
      <InputLabel htmlFor="first_name"> First Name</InputLabel>
      <Field name="first_name" type="text" />
      <ErrorMessage name="first_name" />

      <InputLabel htmlFor="last_name"> Last Name</InputLabel>
      <Field name="last_name" type="text" />
      <ErrorMessage name="last_name" />

      <InputLabel htmlFor="horse"> Horse</InputLabel>
      <Field name="horse" type="text" />
      <ErrorMessage name="horse" />

      <InputLabel htmlFor="activity_date"> Date of your ride or other activity</InputLabel>
      <Field name="activity_date" type="text" />
      <ErrorMessage name="activity_date" />

      <FormLabel >
      <Field type="checkbox" name="answer1" /> 
      {"Did you warm-up with a 10 minutes walk on a loose rein?"}
      </FormLabel>

      <InputLabel htmlFor="answer2"> Select the type of activity you did on that occasion</InputLabel>
      <Field name="answer2" as="select" className="answer2">
      <option value="lunge"></option>
        <option value="lunge">Lunge</option>
        <option value="free_lunge">Free lunge</option>
        <option value="trail_ride">Trail ride</option>
        <option value="ride">Ride in the ring</option>
        <option value="play">Structured play</option>
        <option value="handwalk">Handwalk</option>
      </Field>

      <InputLabel htmlFor="answer3">Please detail the exercises you worked on:</InputLabel>
      <Field name="answer3" as={TextareaAutosize} type="text" />
      <ErrorMessage name="answer3" />
    
      <InputLabel htmlFor="answer4">Any other comment you feel are relevant?</InputLabel>
      <Field name="answer4" as={TextareaAutosize} type="text" />
      <ErrorMessage name="answer4" />
      <FormGroup>
      <Button variant="contained" color="secondary" type="submit">Submit</Button>
      </FormGroup>
    </Form>
    </Container>
  </Formik>
  )};

//   const classes = useStyles();
//   // const { currentUser, setCurrentUser } = props;
//   const defaultValues = {
//     first_name: "",
//     last_name: "",
//     horse: "",
//     date: "",
//     activity_type: "",
//     answer1: true,
//     answer2: "",
//     answer3: "",
//     answer4: ""
//   };

//   const [values, setValues]= useState(defaultValues)
//   // const handleSubmit = () => {
//   //   Axios.post("/api/v1/reports", state).then(() => {
//   //     handleClose();
//   //     if (props.onSubmit) {
//   //       props.onSubmit();
//   //     }
//   //   });
//   // };

//   const handleClose = () => {
//     setState(defaultValues);
//     <Link to={"/"} /> 
//   };

//   return (

//     <div className={classes.root}>
//       <h3>Fill in this form and press save to send your report</h3>
//       <FormControl className="formControl">
//       <Grid container spacing={3}>
//         <Grid item xs={6}>
//           <TextField
          
//             autoFocus
//             margin="normal"
//             name="first_name"
//             label="First Name"
//             type="text"
//             value={values.first_name}
//             onChange={(e) => {
//               setValues({ ...values, first_name: e.target.value})
//             }}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
          
//             margin="normal"
//             name="last_name"
//             label="Last Name"
//             type="text"
//             value={values.last_name}
//             onChange={(e) => {
//               setValues({ ...values, last_name: e.target.value})
//             }}
//           />
//           </Grid></Grid>
//           <TextField
//             margin="normal"
//             name="horse"
//             label="Horse you worked with"
//             type="text"
//             value={values.horse}
//             onChange= {(e) => {
//               setValues({ ...values, horse: e.target.value})
//             }}
//           />
//           <TextField
//             margin="normal"
//             name="activity_date"
//             label="Date of the activity"
//             type="text"
//             value={values.date}
//             onChange= {(e) => {
//               setValues({ ...values, date: e.target.value})
//             }}
//           />
//           <FormControlLabel
//             control={
//               <Checkbox 
//                 checked={values.question1} 
                 
//                 onChange={() => {
//                   setValues({ ...values, answer1: !values.answer1 });
//                 }}
//               />}
//             label="Did you warm-up with a 10 minutes walk on a loose rein?"
//           />

//           <FormControl className={classes.formControl}>
//             <InputLabel id="demo-simple-select-label">Select what type of activity you did:</InputLabel>
//               <Select
//                 name="activity"
//                 variant="outlined"
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={values.answer2}
//                 onChange= {(e) => {setValues({...values, answer2: e.target.value})
//                 }}
//               >
//                 <MenuItem value={"lunge"}>Lunge</MenuItem>
//                 <MenuItem value={"free-lunge"}>Free Lunge</MenuItem>
//                 <MenuItem value={"trail-ride"}>Trail Ride</MenuItem>
//                 <MenuItem value={"ring-ride"}>Ride in the Ring</MenuItem>
//                 <MenuItem value={"play"}>Structured Play</MenuItem>
//                 <MenuItem value={"hand-walk"}>Hand Walk</MenuItem>
//               </Select>
//           </FormControl>

//           <TextField
//             margin="normal"
//             name="exercises"
//             label="Please detail the exercises you worked on:"
//             multiline
//             rows={10}
//             variant="outlined"
//             value={values.answer3}
//             onChange= {(e) => {
//               setValues({ ...values, answer3: e.target.value})
//             }}
//           />
          
//           <TextField
//             margin="normal"
//             name="comments"
//             label="Any other comment you feel are relevant?"
//             multiline
//             rows={10}
//             variant="outlined"
//             value={values.answer4}
//             onChange= {(e) => {
//               setValues({ ...values, answer4: e.target.value})
//             }}
//           />
        
//           <Button className="saveButton" onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button className="saveButton" onClick={handleClose} color="primary">
//             Send
//           </Button>
      
//         </FormControl>
      
//     </div>
//   );
//  }
