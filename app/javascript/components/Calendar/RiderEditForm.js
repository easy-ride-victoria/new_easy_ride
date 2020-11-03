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
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import JoinLessonAlert from "./JoinLessonAlert";
import { useStyles } from "./styles";
import HorseSelect from "./HorseSelect";

const RiderEditForm = (props) => {
  const styles = useStyles();
  const { slotInfo, setSlotInfo, currentUser, errors } = props;

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

  // const handleDelete = () => {
  //   props.onDelete({ slotInfo, rideData });
  // };

  const [showJoinLessonAlert, setShowJoinLessonAlert] = useState(false);
  const handleJoinLesson = () => {
    setShowJoinLessonAlert(true);
  };

  const handleJoinLessonSubmit = () => {
    setShowJoinLessonAlert(false);
    props.onSubmit();
  };

  const remainingLessonSpots =
    slotInfo.lesson_total_spots - slotInfo.rides.length;

  const showJoinLessonButton =
    slotInfo.event_type === "lesson" &&
    slotInfo.lesson_total_spots - slotInfo.rides.length > 0;

  const canEditBooking =
    slotInfo.event_type === "ride" && rideData.user_id === currentUser.id;
  const titles = {
    ride: "Edit Ride",
    lesson: "Join Lesson",
    other: "Indoor Arena Booking",
  };
  return (
    <div className={styles.form}>
      <DialogTitle
        id="form-dialog-title"
        className={styles.title}
        disableTypography
      >
        {titles[slotInfo.event_type]}
      </DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div className={styles.dateTimePickerContainer}>
            <DateTimePicker
              readOnly={!canEditBooking}
              disabled={!canEditBooking}
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
              readOnly={!canEditBooking}
              disabled={!canEditBooking}
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
          {slotInfo.event_type === "lesson" && (
            <>
              <TextField
                readOnly
                disabled
                margin="dense"
                name="lesson_price_cad"
                label="Lesson Price"
                type="number"
                onChange={handleBookingChange}
                value={slotInfo.lesson_price_cad}
                fullWidth
              />
              <TextField
                readOnly
                disabled
                margin="dense"
                name="lesson_total_spots"
                label="Lesson Spots Remaining"
                type="number"
                // onChange={handleBookingChange}
                value={remainingLessonSpots}
                fullWidth
              />
              <List>
                {slotInfo.rides.map((ride) => {
                  const user = users.find((u) => Number(u.id) === ride.user_id);
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
              <FormControl className={styles.formControl} readOnly disabled>
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
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        {/* {canEditBooking && (
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        )} */}

        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        {canEditBooking && (
          <Button onClick={handleEdit} color="primary">
            Save
          </Button>
        )}
        {showJoinLessonButton && (
          <Button
            disabled={
              slotInfo.rides.some((r) => r.user_id === currentUser.id) ||
              remainingLessonSpots === 0
            }
            onClick={handleJoinLesson}
            color="secondary"
          >
            Join Lesson
          </Button>
        )}
      </DialogActions>
      {showJoinLessonAlert && (
        <JoinLessonAlert
          onClose={() => {
            setShowJoinLessonAlert(false);
          }}
          onSubmit={handleJoinLessonSubmit}
          horses={horses}
          currentUser={currentUser}
          booking_id={slotInfo.id}
          lesson_price_cad={slotInfo.lesson_price_cad}
        />
      )}
    </div>
  );
};

export default RiderEditForm;
