import React, { useState, useEffect } from "react";
import MenuAppBar from "../Layout/NavBar";
import axios from "axios";
import { Button, FormHelperText, Grid, FormControlLabel, TextField, Switch, Typography, Link } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: "20px",
  },
  title: {
    margin: "30px",
  },
  button: {
    margin: "20px",
    alignItems: "center",
    textAlign: 'start',
  },
  link: {
    marginBottom: "10px",
    marginTop: "0px",
    marginLeft: "25px",

  },
  switch: {
    marginBottom: "10px",
    marginTop: "0px",
    marginLeft: "12px",
  },
  textfield: {
    margingLeft: "60px",
    margin: "20px",
    marginTop: "20px",
    width: "20vw",
  },
  password: {
    margingLeft: "60px",
    marginBottom: "5px",
    margin: "20px",
    marginTop: "20px",
    width: "20vw",
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
      <Grid className={classes.container} container alignItems="start" justify="space-around" direction="column" >
        <Grid item xs className={classes.titles}>
          <Typography gutterBottom variant="h3" marginLeft="20px">
              My profile
          </Typography>
        </Grid>

        <Grid container alignItems="start" justify="space-around" direction="column">
          <Grid item xs>
            <TextField id="filled-multiline-static" className={classes.textfield} type="text" variant="outlined" label="First name" name="first_name" value={user.first_name} onChange={handleChange} />
          </Grid>

          <Grid item xs>
            <TextField id="filled-multiline-static" className={classes.textfield} variant="outlined" label="Last name" name="last_name" value={user.last_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs>
            <TextField id="filled-multiline-static" className={classes.textfield} variant="outlined" label="Email" name="last_name" value={user.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs>
            <TextField id="filled-multiline-static" className={classes.password} variant="outlined" label="Password" name="password" value="******" disabled />
            <Link href="#" variant="subtitle1" >
              <FormHelperText className={classes.link} id="my-helper-text">Forgot your password?</FormHelperText>
            </Link>
          </Grid>

          <Grid item xs>
            <TextField id="filled-multiline-static" className={classes.textfield} variant="outlined" label="HCBC Number" name="hcbc_number" value={user.hcbc_number}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs>
            <FormControlLabel
              className={classes.switch}
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
          </Grid>

          <Grid item xs className={classes.button}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleSubmit}
            >
        Save
            </Button>
          </Grid>

        </Grid>
      </Grid>

    </div>
  );
};

export default ProfilePage;