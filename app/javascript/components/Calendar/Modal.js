import React from "react";
import { useState } from "react";
import {
  TextField,
  makeStyles,
  Button,
  Select,
  FormControl,
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
import axios from "axios";

/* eslint-disable */
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 600,
    backgroundColor: "white",
    border: "2px solid #000",
    boxSadow: "10px 5px 5px black",
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#004578",
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
  },
  formControl: {
    width: "100%",
  },
}));

const BookingForm = (props) => {
  const styles = useStyles();
  const {
    modal,
    setModal,
    currentUser,
    start_time,
    end_time,
    event_type = "lesson",
  } = props;
  const [bookingData, setBookingData] = useState({
    start_time,
    end_time,
    event_type,
  });

  // Adding state for the dropdown pickers
  const [horse, setHorse] = useState("");
  const [email, setEmail] = useState("");

  // on send button click
  const handleSubmit = () => {
    props.onSubmit({ bookingData });

    // doBooking({ bookingData });

    // console.log(horse)
    // console.log(bookingType)
    // console.log(email)
    // const info = {horse, email, eventType: bookingType}
    // console.log(JSON.stringify(info))
    // axios.post('http://localhost:3000/api/v1/rides', info)
    // .then (response => console.log(response))
    // .catch(error => console.log(error))
  };

  // selecting the horse
  const handleChangeHorse = (event) => {
    setHorse(event.target.value);
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

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">Booking</DialogTitle>
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
          <DateTimePicker
            label="Start Time"
            name="start_time"
            inputVariant="outlined"
            autoOk
            openTo="hours"
            value={bookingData.start_time}
            onChange={handleStartTimeChange}
          />
          <DateTimePicker
            label="End Time"
            name="end_time"
            inputVariant="outlined"
            autoOk
            openTo="hours"
            value={bookingData.end_time}
            onChange={handleEndTimeChange}
          />
          {/* <TextField label="First Name" className={styles.textfield} />
      <br />
      <TextField label="Last Name" className={styles.textfield} />
      <br />
      <FormControl className={styles.formControl}>
        <TextField
          label="Email"
          className={styles.textfield}
          onChange={handleChangeEmail}
        />
      </FormControl>
      <FormControl className={styles.formControl}>
        <InputLabel id="demo-simple-select-label">Horse</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={horse}
          onChange={handleChangeHorse}
        >
          <MenuItem value={"Cisco"}>Cisco</MenuItem>
          <MenuItem value={"Danny"}>Danny</MenuItem>
          <MenuItem value={"Trigger"}>Trigger</MenuItem>
        </Select>
      </FormControl> */}
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
    </>
  );
};

export default BookingForm;
