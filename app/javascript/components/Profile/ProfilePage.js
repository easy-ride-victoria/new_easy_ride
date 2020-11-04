import React, { useState, useEffect } from "react";
import MenuAppBar from "../Layout/NavBar";
import axios from "axios";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
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

const ProfilePage = (props) => {
  const classes = useStyles();
  const { currentUser, setCurrentUser } = props;
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    hcbc_active: false,
    hcbc_number: "",
  });
 
  const userId = currentUser.id;

  useEffect(() => {
    axios.get(`/api/v1/users/${userId}`)
      .then((response) => {
        const data = response.data.data.attributes;
        setUser(data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = ((e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser({
      [name]: value
    });
  });

  const handleSubmit = (() => {
    axios.put(`/api/v1/users/${userId}`, user)
      .then(() => {
        setUser(prev => ({...prev, user}));
      })
      .catch(error => console.log(error));
  });
  
  return (
    <div>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className={classes.paper}>
        <form className={classes.form} >
          <Typography component="h3" variant="h3">
        My Profile
          </Typography>
          <br></br><br></br>
          <TextField
            variant="outlined"
            label="First name"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
          />
          <br></br><br></br>
          <TextField variant="outlined" label="Last name" name="last_name" value={user.last_name}
            onChange={handleChange}
          />
          <br></br><br></br>
          <TextField variant="outlined" label="Email" name="last_name" value={user.email}
            onChange={handleChange}
          />
          <br></br><br></br>
          <TextField variant="outlined" label="Password" name="password" value="******" disabled />
          <Link href="#" variant="subtitle1">
            <FormHelperText id="my-helper-text">Forgot your password?</FormHelperText>
          </Link>
          <br></br>
          <TextField variant="outlined" label="HCBC Number" name="hcbc_number" value={user.hcbc_number}
            onChange={handleChange}
          />
          <br></br><br></br>
          <FormControlLabel
            control={
              <Switch
                checked={user.hcbc_active}
                onChange={(e) => {
                  setUser({ ...user, hcbc_active: e.target.checked});
                }}
                name="hcbc_active"
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

export default ProfilePage;