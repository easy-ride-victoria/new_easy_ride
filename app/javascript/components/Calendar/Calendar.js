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
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Button, Grid } from "@material-ui/core";
import Weather from "./Weather/Weather";
import Alert from "@material-ui/lab/Alert";
// import LessonPaymentForm from "./LessonPaymentForm";

// TODO: display validation errors for all of the fields
// TODO: create popout from lessons/rides to add more riders

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const useStyles = makeStyles({
  calendar: {
    fontFamily: "Roboto",
    border: 0,
    borderRadius: 3,
    paddingTop: "30px",
    color: "#004578",
  },
  weather: {
    // paddingTop: "20px",
    margin: "10px",
  }
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
    rides: item.attributes.rides,
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
  const [openWeather, setOpenWeather] = useState(false);
  const handleSelectSlot = ({ start, end }) => {
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
          bookingData = { ...bookingData, id: response.data.data.id };
        })
        .catch((error) => console.log(error));
    }
  };

  // Setting start time and end time props for weeks days
  const minTime = new Date();
  minTime.setHours(8, 30, 0);
  const maxTime = new Date();
  maxTime.setHours(20, 30, 0);

  const [slotInfo, setSlotInfo] = useState(0);
  // Opens edit form
  const handleSelectEvent = (e) => {
    setEdit(true);
    setSlotInfo(e);
    console.log(e);
  };

  const save = ({ rideData }) => {
    const ID = slotInfo.id;
    const updateSlot = {
      ...rideData,
      booking: slotInfo,
    };
    //console.log(updateSlot);
    if (slotInfo.event_type === "ride") {
      console.log("right id? => ", ID);
      axios
        .put(`/api/v1/rides/${slotInfo.rides[0].id}`, updateSlot)
        .then(() => {
          console.log("passing here...");
          updateAllBookings();
          setEdit(false);
        });
    } else {
      axios
        .put(`/api/v1/bookings/${ID}`, slotInfo)
        .then(() => {
          updateAllBookings();
          setEdit(false);
          setSlotInfo((prev) => ({ ...prev, slotInfo }));
        })
        .catch((error) => console.log("OOPS", error));
    }
  };

  const [destroy, setDestroy] = useState(false);
  const handleDestroy = () => {
    setDestroy(true);
  };

  const handleDestroyFromAlert = () => {
    const ID = slotInfo.id;
    console.log("here");
    setDestroy(false);
    console.log(slotInfo);
    axios.delete(`/api/v1/bookings/${ID}`, slotInfo).then((response) => {
      console.log(response);
      console.log("DELETING");
      updateAllBookings();
      setEdit(false);
      setSlotInfo((prev) => ({ ...prev, slotInfo }));
    });




    // const handleOpenWeather = () => {
    //   setOpenWeather(!openWeather);
    // };
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
      {currentUser.attributes.is_admin && (
        <Dialog
          open={edit}
          onClose={() => {
            setEdit(false);
          }}
        >
          <Dialog
            open={destroy}
            onClose={() => {
              setDestroy(false);
            }}
          >
            <DeleteAlert
              onDelete={handleDestroyFromAlert}
              onClose={() => {
                setDestroy(false);
              }}
            ></DeleteAlert>
          </Dialog>
          <EditForm
            currentUser={currentUser}
            slotInfo={slotInfo}
            setSlotInfo={setSlotInfo}
            onSubmit={save}
            onDelete={handleDestroy}
            onClose={() => {
              setEdit(false);
            }}
          ></EditForm>
        </Dialog>
      )}
      {currentUser.attributes.is_admin === false && (
        <Dialog
          open={edit}
          onClose={() => {
            setEdit(false);
          }}
        >
          <Dialog
            open={destroy}
            onClose={() => {
              setDestroy(false);
            }}
          >
            <DeleteAlert
              onDelete={handleDestroyFromAlert}
              onClose={() => {
                setDestroy(false);
              }}
            ></DeleteAlert>
          </Dialog>
          <RiderEditForm
            currentUser={currentUser}
            slotInfo={slotInfo}
            setSlotInfo={setSlotInfo}
            onSubmit={save}
            onClose={() => {
              setEdit(false);
            }}
          ></RiderEditForm>
        </Dialog>
      )}
      <Grid container justify="flex-end" spacing={2}>
        <Button size="medium" color="primary" className={styles.weather} onClick={() => {
          setOpenWeather(!openWeather);
        }}>
        Show Weather Forecast
        </Button>
      </Grid>
      {openWeather && (
        <Weather/>
      )}
      <Calendar
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
        onSelectEvent={(e) => handleSelectEvent(e)}
      />
    </div>
  );
};

export default MyCalendar;
