import React from "react";
import ReportForm from "./ReportForm";

import MenuAppBar from "../Layout/NavBar";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://photos.smugmug.com/photos/i-Tpvfv46/0/b8bb8820/X2/i-Tpvfv46-X2.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "130vh",
    
  },
}));

export default function ReportPage(props) {
  const { currentUser, setCurrentUser } = props;
  const classes = useStyles();
  

  return (
    <>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Grid container spacing={1} >
        <Grid item xs={5} className={classes.image} />
        <Grid item xs={7}>
          <ReportForm />
        </Grid>
      </Grid>
    </>
  );
}
