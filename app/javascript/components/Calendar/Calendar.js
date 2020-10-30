import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./Modal";
import MenuAppBar from "../Layout/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Alert from "@material-ui/lab/Alert";

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
  const newArr = appointments.map((item) => ({
    title: `${item.attributes.event_type}`,
    start: convertDate(item.attributes.start_time),
    end: convertDate(item.attributes.end_time),
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

  const handleSelectSlot = ({ start, end, resourceId }) => {
    setSelectedSlot({ start: moment(start), end: moment(end) });
    console.log("called::", start);
    console.log("called::", end);
    setModal(true);
  };

  const updateAllBookings = () => {
    const URLbookings = "/api/v1/bookings";
    axios.get(URLbookings).then((response) => {
      let bookingAppointments = response.data.data;
      // console.log("bookingAppointments:", bookingAppointments);
      let formattedBookings = updatedEv(bookingAppointments);
      // console.log("formattedBookings:", formattedBookings);
      setEvents(() => formattedBookings);
    });
  };
  console.log("events rendered:", events);

  useEffect(updateAllBookings, []);

  const doBooking = ({ bookingData, rideData }) => {
    if (bookingData.event_type === "ride") {
      axios
        .post("/api/v1/rides", { ...rideData, booking: bookingData })
        .then((response) => {
          updateAllBookings();
          setModal(false);
          // console.log(response);
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
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  };

  // Setting start time and end time props for weeks days
  const minTime = new Date();
  minTime.setHours(8, 30, 0);
  const maxTime = new Date();
  maxTime.setHours(20, 30, 0);

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
        <BookingForm
          start_time={selectedSlot.start}
          end_time={selectedSlot.end}
          onSubmit={doBooking}
          currentUser={currentUser}
          errors={errors}
          onCancel={() => {
            setModal(false);
          }}
        />
      </Dialog>

      <Calendar
        className={styles.calendar}
        selectable
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 19, 0, 0)}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week", "day"]}
        min={minTime}
        max={maxTime}
        // style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
};

export default MyCalendar;
