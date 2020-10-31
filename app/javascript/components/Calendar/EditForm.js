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
  const { currentUser, setCurrentUser, errors } = props;
  const { slotInfo, setSlotInfo } = props;
  const { events, setEvents } = props;


  const [ user, setUser ] = useState({
    first_name: " ",
    last_name: "",
    id: "0"
  });

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/users")
      .then(response => {
        console.log(response);
        setUsers(response.data.data);
      });
  }, []);

  const [ horse, setHorse ] = useState({
    name: "",
    id: 0
  });

  // get user id and horse id according to slot selected
  useEffect(() => {
    axios.get("/api/v1/rides")
      .then(response => {
        console.log(response);
        console.log(slotInfo);
        const listOfRides = response.data.data;
        console.log(listOfRides);
        const userDataRidesTable = listOfRides.find(i => i.attributes.booking_id == slotInfo.id);
        const userDataRidesTable2 = listOfRides.map(i => i.attributes.booking_id);
        // console.log(userDataRidesTable2);
        console.log(userDataRidesTable);
        setHorse(userDataRidesTable.attributes.horse);
        setUser(userDataRidesTable.attributes.user);
        console.log(userDataRidesTable.attributes.horse);
        // setUser(userDataRidesTable.attributes.user_id);
      });
  }, []);

  const [horses, setHorses] = useState([]);
  const loadHorses = () => {
    axios.get("/api/v1/horses")
      .then(response => {
        const listOfHorses = response.data.data;
        setHorses(listOfHorses);
      });
  };
  useEffect(loadHorses, []);

  const [bookings, setBookings] = useState([]);
  const loadBookings = () => {
    axios.get("/api/v1/bookings")
      .then(response => {
        setBookings(response.data.data);
      });
  };
  useEffect(loadBookings, []);
  
  console.log(slotInfo, "<<< slot info");
  
  const [rideData, setRideData] = useState({
    user_id: Number(currentUser.id),
    horse_id: 1,
    location: "outdoors",
  });
  
  // selecting the event type
  const handleBookingChange = (e) => {
    console.log("changeeee event:,", e);
    console.log("changeeee event:,", e.target.value);
    console.log("changeeee event:,", slotInfo);
    setSlotInfo(prev => ({...prev,[e.target.name]: e.target.value }));
  };
  
  // changing the start time
  const handleStartTimeChange = (start_time) => {
    setSlotInfo(prev => ({...prev, start_time }));
  };

  // changing the end time
  const handleEndTimeChange = (end_time) => {
    // console.log(end_time[Moment]);
    setSlotInfo(prev => ({...prev, end_time}));
  };
  
  const handleEdit = (e) => {
    console.log(slotInfo, horse, user, rideData);
    props.onSubmit({slotInfo, horse, user, rideData });
  };

  const handleDelete = (e) => {
    props.onDelete({slotInfo, horse, user, rideData });
  };

  
  // props.onChange(e);
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
              onChange={handleBookingChange}
            >
              <MenuItem value={"lesson"}>Lesson</MenuItem>
              <MenuItem value={"ride"}>Ride</MenuItem>
              <MenuItem value={"other"}>Other Arena Booking</MenuItem>
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
              value={slotInfo.start_time}
              onChange={handleStartTimeChange}
            />
            <DateTimePicker
              label="End Time"
              name="end_time"
              inputVariant="outlined"
              className={styles.dateTimePicker}
              autoOk
              openTo="hours"
              value={slotInfo.end_time}
              onChange={handleEndTimeChange}
            />
          </div>
          {slotInfo.event_type === "ride" && (
            <>
              <FormControl className={styles.formControl}>
                <InputLabel id="rider-select-label">Rider</InputLabel>
                <Select
                  labelId="rider-select-label"
                  id="rider-select"
                  value={user.id}
                  onChange={(e) => setUser({...user, id: e.target.value })}
                >
                  {users.map((user) => {
                    return (
                      <MenuItem value={user.id} key={user.id}>
                        {user.attributes.first_name} {user.attributes.value}
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
                  value={horse.id}
                  onChange={(e) => setHorse({...horse, id: e.target.value })}
                >
                  {horses.map((horse) => {
                    return (
                      <MenuItem value={horse.id} key={horse.id}>
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
        <Button
          onClick={handleDelete}
          color="secondary">
          Delete
        </Button>
        <Button onClick={handleEdit} color="primary">
          Edit
        </Button>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </div>
  );
};

export default EditForm;