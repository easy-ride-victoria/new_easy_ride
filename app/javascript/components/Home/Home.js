import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SignIn from "./SignIn";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LaunchIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <SignIn setCurrentUser={props.setCurrentUser} />
          <Box mt={5}>
            <Typography color="textSecondary" align="center">
              This Website is for the exclusive use of VTRA member. For more
              information about this organization, click{" "}
              <Link
                target="_blank"
                rel="noopener"
                rel="noreferrer"
                href="https://vtra.ca"
              >
                here. <LaunchIcon fontSize="inherit" />
              </Link>
            </Typography>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
