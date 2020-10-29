import React from 'react';
import { useState } from "react";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import MenuAppBar from '../Layout/NavBar';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: 'wrap'
  },
  form: {
    width: "100%",
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(8),
    width: '15ch',
  },
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
          <Typography component="h3" variant="h3">
            My Profile
          </Typography>
          <br></br><br></br>
          <TextField variant="outlined" label="First name" value={values.first_name} onChange={(e) => {
            setValues({...values, first_name: e.target.value});
          }}/>
          <br></br><br></br>
          <TextField variant="outlined" label="Last name" value={values.last_name} onChange={(e) => {
            setValues({...values, last_name: e.target.value});
          }}/>
          <br></br><br></br>
          <TextField variant="outlined" label="Email" value={values.email} onChange={(e) => {
            setValues({...values, email: e.target.value});
          }}/>
          <br></br><br></br>
          <TextField variant="outlined" label="Password" value="******"/>
          <Link href="#" variant="subtitle1">
            <FormHelperText id="my-helper-text">Forgot your password?</FormHelperText>
          </Link>
          <br></br>
          <TextField variant="outlined" label="HCBC Number" value={values.hcbc_number} onChange={(e) => {
            setValues({...values, hcbc_number: e.target.value});
          }}/>
          <br></br><br></br>
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
          <br></br><br></br>
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