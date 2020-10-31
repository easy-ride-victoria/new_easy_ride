import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./AdminBooking";
import RiderBookingForm from "./RiderBooking";
import EditForm from "./EditForm";
import MenuAppBar from "../Layout/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { InputLabel, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { endOfDay } from "date-fns";

// TODO: location is missing from the ride part of the form ** Change location from ride to booking table
// TODO: display validation errors for all of the fields
// TODO: create form for rider to create a ride ** no choice of user **
// TODO: add lesson migration attributes from ERD to rides & booking tables
// TODO: create popout from lessons/rides to add more riders

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const useStyles = makeStyles({
  calendar: {
    fontFamily: "Roboto",
    border: 0,
    borderRadius: 3,
    padding: "0 30px",
    color: "#004578",
  },
});

const convertDate = (date) => {
  return moment.utc(date).toDate();
};

const updatedEv = (appointments) => {
  console.log(appointments);
  const newArr = appointments.map((item) => ({
    id: `${item.id}`,
    event_type: `${item.attributes.event_type}`,
    start_time: convertDate(item.attributes.start_time),
    end_time: convertDate(item.attributes.end_time),
  }));
  return newArr;
};

const MyCalendar = (props) => {
  const styles = useStyles();
  const { currentUser, setCurrentUser } = props;
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [errors, setErrors] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleSelectSlot = ({ start, end, resourceId }) => {
    setSelectedSlot({ start_time: moment(start), end_time: moment(end) });
    // console.log("called::", start_time);
    // console.log("called::", end_time);
    setModal(true);
  };

  const updateAllBookings = () => {
    const URLbookings = "/api/v1/bookings";
    axios.get(URLbookings).then((response) => {
      let bookingAppointments = response.data.data;
      // console.log("bookingAppointments:", bookingAppointments);
      let formattedBookings = updatedEv(bookingAppointments);
      console.log("formattedBookings:", formattedBookings);
      setEvents(formattedBookings);
    });
  };
  console.log("events rendered:", events);

  useEffect(updateAllBookings, []);
  //
  const doBooking = ({ bookingData, rideData }) => {
    if (bookingData.event_type === "ride") {
      axios
        .post("/api/v1/rides", { ...rideData, booking: bookingData })
        .then((response) => {
          updateAllBookings();
          setModal(false);
          console.log(response);
          setErrors(null);
        })
        .catch((error) => {
          setErrors(error.response.data.error);
        });
    } else {
      axios
        .post("/api/v1/bookings", bookingData)
        .then((response) => {
          updateAllBookings();
          setModal(false);
          console.log(response.data.data.id);
          bookingData = {...bookingData, id: response.data.data.id};

        })
        .catch((error) => console.log(error));
    }
  };

  // Setting start time and end time props for weeks days
  const minTime = new Date();
  minTime.setHours(8, 30, 0);
  const maxTime = new Date();
  maxTime.setHours(20, 30, 0);

  const [slotInfo, setSlotInfo ] = useState(0);
  // Opens edit form
  const handleSelectEvent = (e) => {
    setEdit(true);
    setSlotInfo(e);
    console.log(e);
  };
  
  const handleClickOpen = () => {
    setEdit(true);
  };

  const save = ({ horse }) => {
    console.log("slot info from calendar heey", slotInfo);
    console.log("horse info from calendar heey", horse);
    event.preventDefault();
    const ID = slotInfo.id;
    console.log(ID);
    console.log(slotInfo);
    axios.put(`/api/v1/bookings/${ID}`, slotInfo)
    // axios.put(`/api/v1/bookings/``)
      .then(response => {
        setSlotInfo(prev => ({...prev, slotInfo}));
      })
      .catch(error => console.log("OOPS", error));
  };

  const editChanges = (e) => {
    console.log("slot info from calendar heey", slotInfo);
    console.log(slotInfo);
    const ID = slotInfo.id;
    console.log(ID);
    console.log(slotInfo);
    setSlotInfo({...slotInfo, [e.target.name]: e.target.value});
    axios.put(`/api/v1/bookings/${ID}`, slotInfo)
    // axios.put(`/api/v1/bookings/``)
      .then(response => {
        console.log("changing");

        setSlotInfo(prev => ({...prev, slotInfo}));
      })
      .catch(error => console.log("OOPS", error));
  };
  return (
    <div>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Dialog
        open={modal}
        onClose={() => {
          setModal(false);
        }}
      >
        {errors && (
          <Alert severity="error">Ruh-roh! Something went wrong.</Alert>
        )}
        {currentUser.attributes.is_admin && (
          <BookingForm
            start_time={selectedSlot.start_time}
            end_time={selectedSlot.end_time}
            onSubmit={doBooking}
            currentUser={currentUser}
            errors={errors}
            onCancel={() => {
              setModal(false);
            }}
          />
        )}
        {currentUser.attributes.is_admin === false && (
          <RiderBookingForm
            start_time={selectedSlot.start_time}
            end_time={selectedSlot.end}
            onSubmit={doBooking}
            currentUser={currentUser}
            errors={errors}
            onCancel={() => {
              setModal(false);
            }}
          />
        )}
      </Dialog>
      <Dialog
        open={edit}
        onClose={()=>{
          setEdit(false);
        }}
      >
        <EditForm currentUser={currentUser} slotInfo={slotInfo} onChange={editChanges} onSubmit={save} onClose={()=>{
          setEdit(false);
        }}></EditForm>
      </Dialog>
      <Calendar
        className={styles.calendar}
        selectable
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 19, 0, 0)}
        localizer={localizer}
        events={events}
        startAccessor="start_time"
        endAccessor="end_time"
        defaultView="week"
        views={["week", "day"]}
        min={minTime}
        max={maxTime}
        // style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(e) => handleSelectEvent(e)}
      />
    </div>
  );
};

export default MyCalendar;
