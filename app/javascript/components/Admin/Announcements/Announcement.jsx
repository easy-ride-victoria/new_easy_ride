import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: "80vw"
  },
}));

const Announcement = () => {
  const classes = useStyles();
  const [announcements, setAnnouncements] = useState([]);

  const loadAnnouncements = () => {
    axios.get("/api/v1/announcements")
      .then(response => {
        setAnnouncements(response.data.data);
      });
  };
  useEffect(loadAnnouncements, []);

  console.log(announcements);
  let today = new Date().toLocaleDateString();

  console.log(announcements);

  const convertDate = (date) => {
    console.log("date", date);
    return moment.utc(date).format("MM/DD/yyyy").toString();
  };
  return (
    <>
      {announcements.map((announcement) => {
  
        const { title, start_date, end_date } = announcement.attributes;
        return (
          <Grid key={announcement.id} container direction="column">
            {(today === convertDate(start_date) || today === convertDate(end_date)) &&
              (<Button className={classes.margin} size="medium" variant="contained" color="secondary" fullWidth>
                {title}
              </Button>)}
          </Grid>
        );
      })}
    
    </>
  );
};

export default Announcement;