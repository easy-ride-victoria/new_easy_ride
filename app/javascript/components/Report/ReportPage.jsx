import React from "react";
import ReportForm from "./ReportForm";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://photos.smugmug.com/photos/i-Tpvfv46/0/b8bb8820/X2/i-Tpvfv46-X2.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "130vh",
    marginTop: "15px",
  },
}));

export default function ReportPage() {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} className={classes.image} />
        <Grid item xs={12} md={6}>
          <ReportForm />
        </Grid>
      </Grid>
    </>
  );
}
