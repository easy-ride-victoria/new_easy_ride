import React, { useState, useEffect } from "react";
import {
  TextField,
  makeStyles,
  Button,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { StyleSharp } from "@material-ui/icons";
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

/* eslint-disable */
const useStyles = makeStyles((theme) => ({
  form: {
    // position: "absolute",
    // width: 600,
    // backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: "10px 5px 5px black",
    // padding: "16px 32px 24px",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    color: theme.palette.primary.main,
  },
  textfield: {
    width: "100%",
    margin: "auto",
  },
  button: {
    textAlign: "right",
    justifyItems: "space-between",
    alignSelf: "right",
  },
  title: {
    textAlign: "center",
    width: "100%",
    fontSize: theme.typography.h4.fontSize,
  },
  formControl: {
    width: "100%",
    margin: theme.spacing(1, 0, 2),
  },
  dateTimePickerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  dateTimePicker: {
    margin: theme.spacing(2, 1, 2),
  },
}));

const RiderBookingForm = (props) => {
  const styles = useStyles();
  const { currentUser, start_time, end_time, errors } = props;
  const [bookingData, setBookingData] = useState({
    start_time,
    end_time,
    event_type: "ride",
  });
  const [rideData, setRideData] = useState({
    user_id: Number(currentUser.id),
    horse_id: 1,
    location: "outdoors",
  });

  // Axios call to get available horse list
  const [horses, setHorses] = useState([]);
  const loadHorses = () => {
    Axios.get("/api/v1/horses").then((response) => {
      // console.log(response);
      setHorses(response.data.data);
    });
  };
  useEffect(loadHorses, []);

  // on send button click
  const handleSubmit = () => {
    props.onSubmit({ bookingData, rideData });
  };

  // selecting the horse
  const handleHorseChange = (event) => {
    setRideData({ ...rideData, horse_id: event.target.value });
  };

  // changing the start time
  const handleStartTimeChange = (start_time) => {
    setBookingData({ ...bookingData, start_time });
  };

  // changing the end time
  const handleEndTimeChange = (end_time) => {
    setBookingData({ ...bookingData, end_time });
  };
  // selecting the location
  const handleLocationChange = (event) => {
    setRideData({ ...rideData, location: event.target.value });
  };

  return (
    <div className={styles.form}>
      <DialogTitle
        id="form-dialog-title"
        className={styles.title}
        disableTypography
      >
        Booking
      </DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <FormControl className={styles.formControl}>
            <InputLabel id="booking-type-label">Location</InputLabel>
            <Select
              labelId="location-label"
              name="location"
              value={rideData.location}
              onChange={handleLocationChange}
            >
              <MenuItem value="outdoors">Outdoors</MenuItem>
              <MenuItem value="indoors">Indoors: Arena</MenuItem>
            </Select>
          </FormControl>
          <div className={styles.dateTimePickerContainer}>
            <DateTimePicker
              label="Start Time"
              name="start_time"
              inputVariant="outlined"
              className={styles.dateTimePicker}
              autoOk
              openTo="hours"
              value={bookingData.start_time}
              onChange={handleStartTimeChange}
            />
            <DateTimePicker
              label="End Time"
              name="end_time"
              inputVariant="outlined"
              className={styles.dateTimePicker}
              autoOk
              openTo="hours"
              value={bookingData.end_time}
              onChange={handleEndTimeChange}
            />
          </div>
          <>
            <FormControl
              className={styles.formControl}
              error={errors && errors.horse ? true : false}
            >
              <InputLabel id="horse-select-label">Horse</InputLabel>
              <Select
                labelId="horse-select-label"
                id="horse-select"
                value={rideData.horse_id}
                onChange={handleHorseChange}
              >
                {horses.map((horse) => {
                  return (
                    <MenuItem value={horse.id}>
                      {horse.attributes.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{errors && errors.horse}</FormHelperText>
            </FormControl>
          </>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default RiderBookingForm;