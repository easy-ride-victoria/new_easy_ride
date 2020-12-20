import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { getHeaders } from "../Utils/requests";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: "70px",
    height: "70px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const classes = useStyles();

  const handleSubmit = async function (event) {
    event.preventDefault();
    try {
      // console.log(token);
      await Axios.post(
        "/users/password",
        {
          user: { email },
        },
        { headers: getHeaders() }
      );
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
        Reset Password
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Send Password Reset Instructions
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/">Back</Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
