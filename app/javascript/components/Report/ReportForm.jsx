import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { TextareaAutosize } from "@material-ui/core";


// Material ui customization
const useStyles = makeStyles({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },
  saveButton: {
    marginBottom: "40px",
    marginLeft: "63px",
    alignContent: "centre"
  },
  wholeForm: {
    width: "90%",
    margin: "auto",
  }
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
    <div >
      <FormControl >
        
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
        
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
      
        </FormControl>
      
    </div>
  );
}
