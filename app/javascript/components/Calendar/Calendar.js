import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingForm from "./AdminBooking";
import RiderBookingForm from "./RiderBooking";
import EditForm from "./EditForm";
import RiderEditForm from "./RiderEditForm";
import DeleteAlert from "./DeleteAlert";
import MenuAppBar from "../Layout/NavBar";
import { Dialog, Button, Grid } from "@material-ui/core";
import Weather from "./Weather/Weather";
import { useStyles } from "./styles";

// TODO: display validation errors for all of the fields
// TODO: create popout from lessons/rides to add more riders
const styledGrid = {
  marginRight: "45px",
}

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const convertDate = (date) => {
  return moment.utc(date).toDate();
};

const updatedEv = (appointments) => {
  const newArr = appointments.map((item) => ({
    title: item.attributes.event_type,
    id: `${item.id}`,
    ...item.attributes,
    start_time: convertDate(item.attributes.start_time),
    end_time: convertDate(item.attributes.end_time),
  }));
  return newArr;
};

const getEventStyle = (event) => {
  const colours = {
    ride: "#004578",
    lesson: "#a47638",
    other: "#780e0c",
  };
  return {
    style: {
      backgroundColor: colours[event.event_type],
    },
  };
};

const MyCalendar = (props) => {
  const styles = useStyles();
  const { currentUser, setCurrentUser } = props;
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [errors, setErrors] = useState(null);
  const [openWeather, setOpenWeather] = useState(false);
  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start_time: moment(start), end_time: moment(end) });
    setModal(true);
  };

  const updateAllBookings = () => {
    const URLbookings = "/api/v1/bookings";
    axios.get(URLbookings).then((response) => {
      let bookingAppointments = response.data.data;
      let formattedBookings = updatedEv(bookingAppointments);
      setEvents(formattedBookings);
    });
  };

  useEffect(updateAllBookings, []);

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
          bookingData = { ...bookingData, id: response.data.data.id };
        })
        .catch((error) => {
          setErrors(error.response.data.error);
        });
    }
  };

  // Setting start time and end time props for weeks days
  const minTime = new Date();
  minTime.setHours(8, 30, 0);
  const maxTime = new Date();
  maxTime.setHours(20, 30, 0);

  const save = (data) => {
    if (!data) {
      updateAllBookings();
      closeDialogs();
      return;
    }
    const { rideData } = data;
    const ID = selectedBooking.id;
    const updateSlot = {
      ...rideData,
      booking: selectedBooking,
    };
    //console.log(updateSlot);
    if (selectedBooking.event_type === "ride") {
      axios
        .put(`/api/v1/rides/${selectedBooking.rides[0].id}`, updateSlot)
        .then(() => {
          updateAllBookings();
          closeDialogs();
        })
        .catch((error) => {
          setErrors(error.response.data.error);
        });
    } else {
      axios
        .put(`/api/v1/bookings/${ID}`, selectedBooking)
        .then(() => {
          updateAllBookings();
          closeDialogs();
        })
        .catch((error) => {
          setErrors(error.response.data.error);
        });
    }
  };

  const [destroy, setDestroy] = useState(false);
  const handleDestroy = () => {
    setDestroy(true);
  };

  const handleDestroyFromAlert = () => {
    const ID = selectedBooking.id;
    axios.delete(`/api/v1/bookings/${ID}`, selectedBooking).then(() => {
      updateAllBookings();
      closeDialogs();
    });

    // const handleOpenWeather = () => {
    //   setOpenWeather(!openWeather);
    // };
  };

  const closeDialogs = () => {
    setDestroy(false);
    setModal(false);
    setErrors(null);
    setSelectedBooking(null);
  };

  return (
    <div>
      <MenuAppBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Dialog open={modal} onClose={closeDialogs}>
        {currentUser.attributes.is_admin && (
          <BookingForm
            start_time={selectedSlot.start_time}
            end_time={selectedSlot.end_time}
            onSubmit={doBooking}
            currentUser={currentUser}
            errors={errors}
            onCancel={closeDialogs}
          />
        )}
        {currentUser.attributes.is_admin === false && (
          <RiderBookingForm
            start_time={selectedSlot.start_time}
            end_time={selectedSlot.end_time}
            onSubmit={doBooking}
            currentUser={currentUser}
            errors={errors}
            onCancel={closeDialogs}
          />
        )}
      </Dialog>
      {currentUser.attributes.is_admin && selectedBooking && (
        <Dialog open={true} onClose={closeDialogs}>
          <Dialog open={destroy} onClose={closeDialogs}>
            <DeleteAlert
              onDelete={handleDestroyFromAlert}
              onClose={closeDialogs}
            ></DeleteAlert>
          </Dialog>
          <EditForm
            currentUser={currentUser}
            slotInfo={selectedBooking}
            setSlotInfo={setSelectedBooking}
            onSubmit={save}
            onDelete={handleDestroy}
            onClose={closeDialogs}
          ></EditForm>
        </Dialog>
      )}
      {currentUser.attributes.is_admin === false && selectedBooking && (
        <Dialog open={true} onClose={closeDialogs}>
          <RiderEditForm
            currentUser={currentUser}
            slotInfo={selectedBooking}
            setSlotInfo={setSelectedBooking}
            onSubmit={save}
            errors={errors}
            onClose={closeDialogs}
          ></RiderEditForm>
        </Dialog>
      )}
      <Grid container justify="flex-end" spacing={2} >
        <Button
          size="medium"
          color="primary"
          className={styles.weather}
          onClick={() => {
            setOpenWeather(!openWeather);
          }}
        >
          Show Weather Forecast
        </Button>
      </Grid>
      {openWeather && <Weather />}
      <Calendar
        eventPropGetter={getEventStyle}
        className={styles.calendar}
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start_time"
        endAccessor="end_time"
        defaultView="week"
        views={["week", "day"]}
        min={minTime}
        max={maxTime}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(e) => setSelectedBooking(e)}
      />
    </div>
  );
};

export default MyCalendar;
