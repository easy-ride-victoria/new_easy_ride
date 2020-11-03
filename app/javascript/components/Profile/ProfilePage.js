import React from 'react';
import { useState, useEffect } from "react";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import MenuAppBar from '../Layout/NavBar';
import Link from "@material-ui/core/Link";
import axios from "axios";

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
  
  const [state, setState] = useState(currentUser.attributes);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/users")
      .then((response) => {
        // console.log("response:", response);
        const listOfUsersDb = response.data.data;
        const userId = listOfUsersDb.find(i => i.id == currentUser.id);
        const userAttributes = userId.attributes;
        setState(userAttributes);
        // console.log("userAtr", userAttributes);
      });
  },[]);

  const handleSubmit = () => {
    // event.preventDefault();
    const id = currentUser.id;
    console.log(state);
    axios.put(`http://localhost:3000/api/v1/users/${id}`, state)
      .then(() => {
        setState(prev => ({...prev, state}));
      })
      .catch(error => console.log(error));
  };

  console.log(currentUser);
  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  console.log(state);
  
  return (
    <div>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className={classes.paper}>
        <form className={classes.form} >
          <Typography component="h3" variant="h3">
            My Profile
          </Typography>
          <br></br><br></br>
          <TextField variant="outlined" label="First name" name="first_name" value={state.first_name} onChange={handleChange}/>
          <br></br><br></br>
          <TextField variant="outlined" label="Last name" name="last_name" value={state.last_name} onChange={handleChange}/>
          <br></br><br></br>
          <TextField variant="outlined" label="Email" name="last_name" value={state.email} onChange={handleChange}/>
          <br></br><br></br>
          <TextField variant="outlined" label="Password" name="password" value="******" disabled />
          <Link href="#" variant="subtitle1">
            <FormHelperText id="my-helper-text">Forgot your password?</FormHelperText>
          </Link>
          <br></br>
          <TextField variant="outlined" label="HCBC Number" name="hcbc_number" value={state.hcbc_number} onChange={handleChange}/>
          <br></br><br></br>
          <FormControlLabel
            control={
              <Switch
                checked={state.hcbc_active}
                name="hcbc_active"
                onChange={(e) => {
                  setState({ ...state, hcbc_active: e.target.checked });
                }}
                color="secondary"
              />
            }
            label="Active HCBC"
          />
          <br></br><br></br>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
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
