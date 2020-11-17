import React, { useState } from "react";
import { Button, Grid, TextField, InputLabel,  FormControlLabel, Typography, Checkbox } from '@material-ui/core';
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
  }
}));

// Set State
const initialState = { 
  first_name: "", 
  last_name: "", 
  horse: "", 
  activity_date: "", 
  answer1: "true", 
  answer2: "", 
  answer3: "", 
  answer4: ""
}

export default function AddReportForm(props) {
  
  // styles
  const classes = useStyles();
  
  const stylesTextArea = {
    width: "500px" 
  }

  const stylesTitle = {
    width: "500px",
    marginTop: "40px" 
  }
  
  // form functionality
  const [open, setopen] = useState(false)
  const [state, setstate] = useState(initialState)


  const handleSubmit = event => {
    event.preventDefault();
    // Axios.post("/api/v1/reports", values)
    //     .then( () => {
    //       console.log ("sent!")
        setOpen(true);
      // })
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChecked = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  
  console.log ("props are:", props)
  
  // rendering
  return (
    
    <Grid container 
    alignItems="stretch" justify="space-around" direction="column" >

      <Grid item xs className={classes.title}>
        <Typography gutterBottom variant="h4">
          Please fill your report here.
        </Typography>
      </Grid>
      
      <form>

        <Grid item xs className={classes.textfield}>
          <TextField id="filled-multiline-static" label="First Name" variant="outlined" name="first_name" style={stylesTextArea} type="text" rows={5}
          InputLabelProps={{
            shrink: true,
          }}/>
          
        </Grid>
      

        <Grid item xs className={classes.textfield}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" name="last_name" style={stylesTextArea} type="text" label="Last Name" InputLabelProps={{shrink: true,}} />
         
        </Grid>

        <Grid item xs className={classes.textfield}>
          <TextField id="filled-multiline-static" variant="outlined" name="horse" style={stylesTextArea} type="text" label="Horse Name" rows={5} InputLabelProps={{shrink: true,}} />
       
        </Grid>

        <Grid item xs className={classes.textfield}>
          <TextField id="filled-multiline-static" variant="outlined" name="activity_date" style={stylesTextArea} type="text" label="Date of your ride or other activity" rows={5} InputLabelProps={{shrink: true,}} />
      
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
  
      <TextField id="filled-multiline-static" label="Please detail the exercises you worked on" variant="outlined" name="answer3" style={stylesTitle} type="text" rows={5}
      InputLabelProps={{
        shrink: true,
      }}/>
 
      </Grid>
      
      <Grid item xs className={classes.textfield}>
      {/* <StyledInputLabel htmlFor="answer4">Any other comment you feel are relevant?</StyledInputLabel> */}
      <TextField id="filled-multiline-static" label="Any other comment you feel are relevant?" variant="outlined" name="answer4" style={stylesTextArea} type="text" rows={5}
      InputLabelProps={{
        shrink: true,
      }}/>
     
      </Grid>

      <Grid item xs className={classes.textfield}>
      <Button variant="contained" color="secondary" type="submit">SUBMIT</Button>
      </Grid>
      
    </form>
    
  </Grid>
 
  )};
