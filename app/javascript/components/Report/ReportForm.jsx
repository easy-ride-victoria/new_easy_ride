import React, { useState } from "react";
import { Button, Grid, TextField, InputLabel,  FormControlLabel, Typography, Checkbox, FormControl, Select, MenuItem, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { SettingsPowerRounded } from "@material-ui/icons";

// Material ui styles overide
const useStyles = makeStyles((theme) => ({
  textfield: {
    marginTop: "30px",
    marginLeft: "25px",
    marginRight: "25px",
  },
  title: {
    marginLeft: "25px",
    marginRight: "25px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    maxWidth:500,
  },
}));

// Set State
const initialState = { 
  first_name: "", 
  last_name: "", 
  horse: "", 
  activity_date: "", 
  answer1: true, 
  answer2: "", 
  answer3: "", 
  answer4: ""
}

export default function AddReportForm(props) {
  
  // styles
  const classes = useStyles();

  const stylesTextArea = {
    minWidth: "300px",
    maxWidth:"55px"
  }

  const stylesTitle = {
    width: "500px",
    marginTop: "40px" 
  }
  
  // form functionality
  const [open, setOpen] = useState(false)
  const [state, setState] = useState(initialState)



  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("/api/v1/reports", state)
    .then( () => {
        console.log ("sent!")
      })
      .catch ((error) => {
        console.log(error)
      })
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChecked = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleSelect = (event => {
    setState({...state, answer2: event.target.value})
  })
  const handleClose = () => {
    setOpen(false);
    };
  
  const handleOpen = () => {
    setOpen(true);
    };
  
  console.log ("state:", state)
  
  // rendering
  return (
    <div>
      <Grid container 
      alignItems="stretch" justify="space-around" direction="column" >

        <Grid item xs className={classes.title}>
          <Typography gutterBottom variant="h4">
            Please fill your report here.
          </Typography>
        </Grid>
        
        <form >

          <Grid item xs className={classes.textfield}>
            <TextField id="filled-multiline-static" label="First Name" variant="outlined" name="first_name" 
            onChange={handleChange}
            value={state.first_name}
            style={stylesTextArea} 
            type="text"
            InputLabelProps={{
              shrink: true,
            }}/>
            
          </Grid>
        

          <Grid item xs className={classes.textfield}>
            <TextField 
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              name="last_name" 
              style={stylesTextArea} 
              type="text" 
              label="Last Name"
              onChange={handleChange}
              value={state.last_name} 
              InputLabelProps={{shrink: true,}} />
          </Grid>

          <Grid item xs className={classes.textfield}>
            <TextField 
              id="filled-multiline-static"
              variant="outlined" 
              name="horse" 
              style={stylesTextArea} 
              type="text" 
              label="Horse Name"
              autoCapitalize = 'none'
              onChange={handleChange}
              value={state.horse}
              InputLabelProps={{shrink: true,}} 
            />        
          </Grid>

          <Grid item xs className={classes.textfield}>
            <TextField 
              id="filled-multiline-static"
              variant="outlined" 
              name="activity_date" 
              style={stylesTextArea} 
              type="text" 
              label="Date of your ride or other activity" 
              onChange={handleChange}
              value={state.activity_date}
              InputLabelProps={{shrink: true,}} 
            />
          </Grid>

        <Grid item xs className={classes.textfield}>
          <FormControlLabel 
            control = {
              <Checkbox
                checked={state.answer1}
                onChange={handleChecked}
                name="answer1"
                color="secondary" 
              />
            }
            label="Did you warm-up with a 10 minutes walk on a loose rein?"
          />
        </Grid>

        <Grid item xs className={classes.textfield}>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select an activity type:</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={state.answer2}
            onChange={handleSelect}
          >
            <MenuItem value=""> </MenuItem>
            <MenuItem value={"lunge"}>Lunge</MenuItem>
            <MenuItem value={"free-lunge"}>Free Lunge</MenuItem>
            <MenuItem value={"lesson"}>Lesson</MenuItem>
            <MenuItem value={"ride"}>Ride</MenuItem>
            <MenuItem value={"play"}>Structured Play</MenuItem>
            <MenuItem value={"handwalk"}>Handwalk</MenuItem>
          </Select>
          </FormControl>  
        </Grid>
        
        <Grid item xs className={classes.textfield}>
          <TextField 
            id="filled-multiline-static"
            label="Please detail the exercises you worked on"
            variant="outlined"
            name="answer3" onChange={handleChange}
            value={state.answer3} 
            style={stylesTitle} 
            type="text" 
            rows={5}
            InputLabelProps={{shrink: true}}
          /> 
        </Grid>
        
        <Grid item xs className={classes.textfield}>
          <TextField 
            id="filled-multiline-static" 
            label="Any other comment you feel are relevant?"
            variant="outlined"
            name="answer4"
            style={stylesTextArea}
            type="text"
            rows={5}
            onChange={handleChange}
            value={state.answer4}
            InputLabelProps={{shrink: true,}}
          />     
        </Grid>

        <Grid item xs className={classes.textfield}>
        <Button variant="contained" color="secondary" type="submit" onClick={handleSubmit}>SUBMIT</Button>
        </Grid>
        
      </form>
      
    </Grid>

  </div>
    )};
