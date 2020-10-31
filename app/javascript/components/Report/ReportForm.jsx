import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";



// Material ui customization
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "65%",
    margin: "auto",
  },
  
  saveButton: {
    marginBottom: "40px",
    marginLeft: "63px",
    display: "inline",
  },

});


export default function AddReportForm(props) {
  
  const classes = useStyles();
  const { currentUser, setCurrentUser } = props;
  const [values, setValues]= useState({
    first_name: "",
    last_name: "",
    horse: "",
    date: "",
    activity_type: "",
    question1: true,
    question2: "",
    question3: "",
    question4: ""
  });

  // const handleSubmit = () => {
  //   Axios.post("/api/v1/horses", state).then(() => {
  //     handleClose();
  //     if (props.onSubmit) {
  //       props.onSubmit();
  //     }
  //   });
  // };

  const handleClose = () => {
    setState(defaultState);
    <Link to={"/"} /> 
  };

  return (
    <div className={classes.root}>
      <h3>Fill in this form and press save to send your report</h3>
      <FormControl className="formControl">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
          
            autoFocus
            margin="normal"
            name="first_name"
            label="First Name"
            type="text"
            value={values.first_name}
            onChange={(e) => {
              setValues({ ...values, first_name: e.target.value})
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
          
            margin="normal"
            name="last_name"
            label="Last Name"
            type="text"
            value={values.last_name}
            onChange={(e) => {
              setValues({ ...values, last_name: e.target.value})
            }}
          />
          </Grid></Grid>
          <TextField
            margin="normal"
            name="horse"
            label="Horse you worked with"
            type="text"
            value={values.horse}
            onChange= {(e) => {
              setValues({ ...values, horse: e.target.value})
            }}
          />
          <TextField
            margin="normal"
            name="activity_date"
            label="Date of the activity"
            type="text"
            value={values.date}
            onChange= {(e) => {
              setValues({ ...values, date: e.target.value})
            }}
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={values.question1} 
                 
                onChange={() => {
                  setValues({ ...values, question1: !values.question1 });
                }}
              />}
            label="Did you warm-up with a 10 minutes walk on a loose rein?"
          />

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select what type of activity you did:</InputLabel>
              <Select
                name="activity"
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.question2}
                onChange= {(e) => {setValues({...values, question2: e.target.value})
                }}
              >
                <MenuItem value={"lunge"}>Lunge</MenuItem>
                <MenuItem value={"free-lunge"}>Free Lunge</MenuItem>
                <MenuItem value={"trail-ride"}>Trail Ride</MenuItem>
                <MenuItem value={"ring-ride"}>Ride in the Ring</MenuItem>
                <MenuItem value={"play"}>Structured Play</MenuItem>
                <MenuItem value={"hand-walk"}>Hand Walk</MenuItem>
              </Select>
          </FormControl>

          <TextField
            margin="normal"
            name="exercises"
            label="Please detail the exercises you worked on:"
            multiline
            rows={10}
            variant="outlined"
            value={values.question3}
            onChange= {(e) => {
              setValues({ ...values, question3: e.target.value})
            }}
          />
          
          <TextField
            margin="normal"
            name="comments"
            label="Any other comment you feel are relevant?"
            multiline
            rows={10}
            variant="outlined"
            value={values.question4}
            onChange= {(e) => {
              setValues({ ...values, question4: e.target.value})
            }}
          />
        
          <Button className="saveButton" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button className="saveButton" onClick={handleClose} color="primary">
            Send
          </Button>
      
        </FormControl>
      
    </div>
  );
}
