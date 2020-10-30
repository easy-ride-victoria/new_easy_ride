import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  makeStyles,
  Button,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  DialogTitle, DialogContent, DialogActions
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

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

const EditForm = (props) => {
  const styles = useStyles();
  const { currentUser, setCurrentUser } = props;
  const { slotInfo, setSlotInfo } = props;
  const { events, setEvents } = props;

  const [values, setValues] = useState({
    id: "",
    event_type: "",
    start_time: "",
    title: ""
  });

  // load booking info
  const loadBooking = () => {
    axios.get("/api/v1/bookings")
      .then(response => (console.log("bookings from api = ", response)));
      
  };

  const loadRides = () => {
    axios.get("/api/v1/rides")
      .then(response => {
        const allRides = response.data.data;
        console.log("all rides from api = ", allRides);
        const userRides = allRides.map(ride => {
          const container = {};
          container[ride.id];
          return container;
        });
        console.log("User rides = ", userRides);
        console.log("current User = ", currentUser);
      });

  
  };
  // loadBooking();
  // loadRides();
  console.log(slotInfo, "<<< slot info");

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
              value={slotInfo.event_type}
              // onChange={handleBookingChange}
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
              value={slotInfo.start}
              // onChange={handleStartTimeChange}
            />
            <DateTimePicker
              label="End Time"
              name="end_time"
              inputVariant="outlined"
              className={styles.dateTimePicker}
              autoOk
              openTo="hours"
              value={slotInfo.end}
              // onChange={handleEndTimeChange}
            />
          </div>
          {slotInfo.title === "ride" && (
            <>
              <FormControl className={styles.formControl}>
                <InputLabel id="rider-select-label">Rider</InputLabel>
                <Select
                  labelId="rider-select-label"
                  id="rider-select"
                  // value={rideData.user_id}
                  // onChange={handleRiderChange}
                >
                  {/* {users.map((user) => {
                    return (
                      <MenuItem value={user.id}>
                        {user.attributes.first_name} {user.attributes.last_name}
                      </MenuItem>
                    );
                  })} */}
                </Select>
              </FormControl>
              <FormControl
                className={styles.formControl}
                // error={errors && errors.horse ? true : false}
              >
                <InputLabel id="horse-select-label">Horse</InputLabel>
                <Select
                  labelId="horse-select-label"
                  id="horse-select"
                  // value={rideData.horse_id}
                  // onChange={handleHorseChange}
                >
                  {/* {horses.map((horse) => {
                    return (
                      <MenuItem value={horse.id}>
                        {horse.attributes.name}
                      </MenuItem>
                    );
                  })} */}
                </Select>
                {/* <FormHelperText>{errors && errors.horse}</FormHelperText> */}
              </FormControl>
            </>
          )}
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button
        // onClick={props.onCancel}
          color="primary">
          Cancel
        </Button>
        <Button
        // onClick={handleSubmit}
          color="primary">
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default EditForm;