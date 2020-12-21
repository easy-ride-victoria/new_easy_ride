import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SignInForm from "./SignInForm";
import ResetPasswordForm from "./ResetPasswordForm";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://photos.smugmug.com/2016-Annual-Horse-Show/Gabriela-Prep-Day/i-mTcWhd4/0/c79e9e4b/L/IMG_4766-L.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(4, 4),
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

export default function SignInPage() {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Router basename="/sign_in">
            <Route path="/" exact>
              <SignInForm classes={classes} />
            </Route>
            <Route path="/reset-password">
              <ResetPasswordForm classes={classes} />
            </Route>
          </Router>
          <Box mt={5}>
            <Typography color="textSecondary" align="center">
              This Website is for the exclusive use of VTRA member. For more
              information about this organization, click{" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://vtra.ca"
              >
                here.
              </Link>
            </Typography>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}