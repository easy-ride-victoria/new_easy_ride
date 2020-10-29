import React from 'react';
import { useState } from "react";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import MenuAppBar from '../Layout/NavBar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
}));

const ProfileRoute = (props) => {
  const classes = useStyles();
  const { currentUser, setCurrentUser } = props;
  const { first_name, last_name, email, password, hcbc_number, hcbc_active } = props.currentUser.attributes;

  const [values, setValues] = useState({
    first_name: first_name,
    last_name: last_name,
    email: email,
    hcbc_number: hcbc_number,
    hcbc_active: hcbc_active
  });
  


  const handleSubmit = event => {
    event.preventDefault();
    console.log("values", values);
    console.log(event);
    console.log("setValues", setValues);
    console.log("values", values);
  };

  return (
    <div>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className={classes.paper}>
        <form className={classes.form} >
          <TextField id="standard-basic" label="First name" value={values.first_name} onChange={(e) => {
            setValues({...values, first_name: e.target.value});
          }}/>
          <br></br>
          <TextField id="standard-basic" label="Last name" value={values.last_name} onChange={(e) => {
            setValues({...values, last_name: e.target.value});
          }}/>
          <br></br>
          <TextField id="standard-basic" label="Email" value={values.email} onChange={(e) => {
            setValues({...values, email: e.target.value});
          }}/>
          <br></br>
          <TextField id="standard-basic" label="Password" value="******"/>
          <FormHelperText id="my-helper-text">Forgot your password?</FormHelperText>
       
          <TextField id="standard-basic" label="HCBC Number" value={values.hcbc_number} onChange={(e) => {
            setValues({...values, hcbc_number: e.target.value});
          }}/>
          <br></br>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.hcbc_active}
                onChange={(e) => {
                  setValues({...values, hcbc_active: (!values.hcbc_active)});
                }}
                name="active"
                color="primary"
              />
            }
            label="Active HCBC"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
          Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileRoute;