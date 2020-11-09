import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleSubmit = function (event) {
    event.preventDefault();
    if (email === "nicole@easyride.ca") {
      props.setCurrentUser({
        id: 1,
        type: "user",
        attributes: {
          first_name: "Nicole",
          last_name: "Woodcock",
          hcbc_number: "12",
          hcbc_active: false,
          is_admin: true,
          active: true,
          email: "nicole@easyride.ca",
        },
        relationships: { rides: { data: [{ id: "1", type: "ride" }] } },
      });
    } else {
      props.setCurrentUser({
        id: 2,
        type: "user",
        attributes: {
          first_name: "Iyris",
          last_name: "Vigil",
          hcbc_number: "123",
          hcbc_active: false,
          is_admin: false,
          active: true,
          email: "iyris@easyride.ca",
        },
        relationships: { rides: { data: [{ id: "2", type: "ride" }] } },
      });
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
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
