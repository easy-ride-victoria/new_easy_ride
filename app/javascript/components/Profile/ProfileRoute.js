import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import CssBaseline from "@material-ui/core/CssBaseline";
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from "@material-ui/core/styles";
import MenuAppBar from '../Layout/NavBar';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  // form: {
  //   width: "100%", // Fix IE 11 issue.
  //   marginTop: theme.spacing(1),
  // },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: '25ch',
  // }
}));



const ProfileRoute = (props) => {
  const classes = useStyles();
  const { currentUser, setCurrentUser } = props;
  const { first_name, last_name, email, password, hcbc_number } = props.currentUser.attributes;
  // const [user, setUser] = useState("props.currentUser");
  const [value, setValues] = useState({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    showPassword: false,
  });
  // console.log(value, "first");
  // console.log(props, "props");


  const handleSubmit = event => {
    event.preventDefault();
    console.log("values", value);
    // console.log(props);
    console.log(event);
    console.log("setValues", setValues);
    console.log("values", value);
  };


  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };
  // console.log(props);

  return (
    <div>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className={classes.paper}>
        <form className={classes.form} >
          <TextField id="standard-basic" label="First name" defaultValue={first_name} onChange={(e) => {
            setValues({...setValues, first_name: e.target.value});
          }}/>
        
          <TextField id="standard-basic" label="Last name" defaultValue={last_name} onChange={(e) => {
            setValues({...setValues, last_name: e.target.value});
          }}/>
     
          <TextField id="standard-basic" label="Email" defaultValue={email} onChange={(e) => {
            setValues({...setValues, email: e.target.value});
          }}/>
    
          <TextField id="standard-basic" label="Password" defaultValue="******"/>
          <FormHelperText id="my-helper-text">Forgot your password?</FormHelperText>
       
          <TextField id="standard-basic" label="HCBC Number" defaultValue={hcbc_number} onChange={(e) => {
            setValues({...setValues, hcbc_number: e.target.value});
          }}/>

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