import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { useStyles } from "./styles";
import HorseSelect from "./HorseSelect";

// TODO: Admin adding or removing particular people from lessons (including themselves)

const EditForm = (props) => {
  const styles = useStyles();
  const { errors } = props;
  const { slotInfo, setSlotInfo } = props;
  console.log("slotInfo", slotInfo);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/users").then((response) => {
      setUsers(response.data.data);
    });
  }, []);

  const [horses, setHorses] = useState([]);
  const loadHorses = () => {
    axios.get("/api/v1/horses").then((response) => {
      const listOfHorses = response.data.data;
      setHorses(listOfHorses);
    });
  };
  useEffect(loadHorses, []);

  const [rideData, setRideData] = useState({
    ...slotInfo.rides[0],
  });

  // selecting the event type
  const handleBookingChange = (e) => {
    setSlotInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // changing the start time
  const handleStartTimeChange = (start_time) => {
    setSlotInfo((prev) => ({ ...prev, start_time }));
  };

  // changing the end time
  const handleEndTimeChange = (end_time) => {
    setSlotInfo((prev) => ({ ...prev, end_time }));
  };

  const handleEdit = () => {
    console.log(slotInfo, rideData);
    props.onSubmit({ slotInfo, rideData });
  };

  const handleDelete = () => {
    props.onDelete({ slotInfo, rideData });
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
          <>
            <FormControl className={styles.formControl}>
              <InputLabel id="booking-type-label">Booking Type</InputLabel>
              <Select
                readOnly
                disabled
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
                disablePast
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
                disablePast
              />
            </div>
            {slotInfo.event_type === "lesson" && (
              <>
                <TextField
                  margin="dense"
                  name="lesson_price_cad"
                  label="Lesson Price"
                  type="number"
                  onChange={handleBookingChange}
                  value={slotInfo.lesson_price_cad}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  name="lesson_total_spots"
                  label="Lesson Spots"
                  type="number"
                  onChange={handleBookingChange}
                  value={slotInfo.lesson_total_spots}
                  fullWidth
                />
                <List>
                  {slotInfo.rides.map((ride) => {
                    const user = users.find(
                      (u) => Number(u.id) === ride.user_id
                    );
                    const horse = horses.find(
                      (h) => Number(h.id) === ride.horse_id
                    );
                    console.log(ride, user, horse, users, horses);
                    if (!user || !horse) return null;
                    const { first_name, last_name } = user.attributes;
                    const { name, profile_picture } = horse.attributes;
                    return (
                      <ListItem key={ride.id}>
                        <ListItemAvatar>
                          <Avatar src={profile_picture} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${first_name} ${last_name}`}
                          secondary={name}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </>
            )}
            {slotInfo.event_type === "ride" && (
              <>
                <FormControl className={styles.formControl}>
                  <InputLabel id="rider-select-label">Rider</InputLabel>
                  <Select
                    labelId="rider-select-label"
                    id="rider-select"
                    value={rideData.user_id}
                    onChange={(e) =>
                      setRideData({
                        ...rideData,
                        user_id: Number(e.target.value),
                      })
                    }
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
                <HorseSelect
                  rideData={rideData}
                  setRideData={setRideData}
                  errors={errors}
                  horses={horses}
                />
              </>
            )}
          </>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEdit} color="primary">
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default EditForm;
