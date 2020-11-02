import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import { useStyles } from "./styles";

/* eslint-disable */
const BookingForm = (props) => {
  const styles = useStyles();
  const {
    currentUser,
    start_time,
    end_time,
    event_type = "lesson",
    errors,
    lesson_price_cad = 32,
    lesson_total_spots = 4,
  } = props;

  const [bookingData, setBookingData] = useState({
    start_time,
    end_time,
    event_type,
    lesson_price_cad,
    lesson_total_spots,
  });
  const [rideData, setRideData] = useState({
    user_id: Number(currentUser.id),
    horse_id: 1,
    location: "outdoor",
  });

  const [users, setUsers] = useState([]);
  const loadUsers = () => {
    Axios.get("/api/v1/users").then((response) => {
      // console.log(response);
      setUsers(response.data.data);
    });
  };
  useEffect(loadUsers, []);

  const [horses, setHorses] = useState([]);
  const loadHorses = () => {
    Axios.get("/api/v1/horses").then((response) => {
      // console.log(response);
      setHorses(response.data.data);
    });
  };
  useEffect(loadHorses, []);

  // on send button click
  const handleSubmit = (e) => {
    props.onSubmit({ bookingData, rideData });
  };

  // selecting the horse
  const handleHorseChange = (event) => {
    setRideData({ ...rideData, horse_id: event.target.value });
  };

  // selecting the event type
  const handleBookingChange = (event) => {
    setBookingData({ ...bookingData, [event.target.name]: event.target.value });
  };

  // changing the start time
  const handleStartTimeChange = (start_time) => {
    setBookingData({ ...bookingData, start_time });
  };

  // changing the end time
  const handleEndTimeChange = (end_time) => {
    setBookingData({ ...bookingData, end_time });
  };

  const handleRiderChange = (event) => {
    setRideData({ ...rideData, user_id: event.target.value });
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
            <InputLabel id="booking-type-label">Booking Type</InputLabel>
            <Select
              labelId="booking-type-label"
              name="event_type"
              value={bookingData.event_type}
              onChange={handleBookingChange}
            >
              <MenuItem value={"lesson"}>Lesson</MenuItem>
              <MenuItem value={"ride"}>Ride</MenuItem>
              <MenuItem value={"other_arena"}>Other Arena Booking</MenuItem>
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
          {bookingData.event_type === "lesson" && (
            <>
              <TextField
                margin="dense"
                name="lesson_price_cad"
                label="Lesson Price"
                type="number"
                onChange={handleBookingChange}
                value={bookingData.lesson_price_cad}
                fullWidth
              />
              <TextField
                margin="dense"
                name="lesson_total_spots"
                label="Lesson Spots"
                type="number"
                onChange={handleBookingChange}
                value={bookingData.lesson_total_spots}
                fullWidth
              />
            </>
          )}
          {bookingData.event_type === "ride" && (
            <>
              <FormControl className={styles.formControl}>
                <InputLabel id="rider-select-label">Rider</InputLabel>
                <Select
                  labelId="rider-select-label"
                  id="rider-select"
                  value={rideData.user_id}
                  onChange={handleRiderChange}
                >
                  {users.map((user) => {
                    return (
                      <MenuItem value={user.id}>
                        {user.attributes.first_name} {user.attributes.last_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
          )}
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

export default BookingForm;
