import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid } from "@material-ui/core";
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

  let today = new Date().toLocaleDateString('en-CA');

  const isActive = (start, end) => {
    return moment(today).isBetween(start, end) || today === start || today === end;
  };

  return (
    <>
      {announcements.map((announcement) => {
        const { title, start_date, end_date } = announcement.attributes;
        return (
          <Grid key={announcement.id} container direction="column">
            {isActive(start_date, end_date) &&
            <Button className={classes.margin} size="medium" variant="contained" color="secondary" fullWidth>
              {title}
            </Button>}
          </Grid>
        );
      })}
    
    </>
  );
};

export default Announcement;