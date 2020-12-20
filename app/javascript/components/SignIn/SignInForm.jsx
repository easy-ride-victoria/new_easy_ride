import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import { getHeaders } from "../Utils/requests";

export default function SignInForm({ classes }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async function (event) {
    event.preventDefault();
    try {
      // console.log(token);
      await Axios.post(
        "/users/sign_in",
        {
          user: { email, password },
        },
        { headers: getHeaders() }
      );
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h2" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/reset-password">Forgot password?</Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
