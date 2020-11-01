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

const RiderEditForm = (props) => {
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
  
  const [rideData, setRideData] = useState({
    user_id: Number(currentUser.id),
    horse_id: 1,
    location: "outdoors",
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
  

  // get user id and horse id according to slot selected
  useEffect(() => {
    const ID = slotInfo.id;
    axios.get(`/api/v1/rides/${ID}`)
      .then(response => {
        console.log(response);
        console.log(slotInfo);
        const rideInfo = response.data.data.attributes;
        console.log(rideInfo);
        setRideData(rideInfo);
      });
  }, []);

  // selecting the event type
  const handleLocationChange = (event) => {
    setRideData({ ...rideData, location: event.target.value });
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

  console.log("RIDE DATA LOCATION", rideData.location);
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
              <MenuItem value={"outdoors"}>Outdoors</MenuItem>
              <MenuItem value={"indoors"}>Indoors: Arena</MenuItem>
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
          <>
            <FormControl
              className={styles.formControl}
              error={errors && errors.horse ? true : false}
            >
              <InputLabel id="horse-select-label">Horse</InputLabel>
              <Select
                labelId="horse-select-label"
                id="horse-select"
                value={horse.id}
                onChange={(e) => setRideData({ ...rideData, horse_id: e.target.value })}
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
       
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEdit} color="primary">
          Save
        </Button>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </div>
  );
};

export default RiderEditForm;