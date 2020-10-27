import React from 'react';
import { useState , useEffect } from "react";
import { Router } from 'react-router-dom'
import axios from "axios";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"

// const DnDCalendar = withDragAndDrop(Calendar);
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const convertDate = (date) => {
  return moment.utc(date).toDate()
}

const updatedEv = (appointments) => {
  const newArr = appointments.map(item => ({
      title: `${item.attributes.event_type}`,
      start: convertDate(item.attributes.start_time),
      end: convertDate(item.attributes.end_time),
    })
  );
  return newArr
}

// const handleSelectSlot = ({start,end,resourceId}) => {
//   const title = window.prompt('New Event name')
// }

const MyCalendar = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const URLbookings = "http://localhost:3000/api/v1/bookings"
    axios.get(URLbookings)
    .then((response) => {
      let bookingAppointments = response.data.data;
      console.log("bookingAppointments:", bookingAppointments)
      let formattedBookings = updatedEv(bookingAppointments)
      console.log("formattedBookings:", formattedBookings)
      setEvents(prev => ([...prev, ...formattedBookings]))
    })}, [])
    console.log("events rendered:", events)

    return (
      <div>
        <Calendar
        // selectable
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          defaultView='week'
          views={['week']}
          // style={{ height: 500 }}
          // onSelectSlot={ handleSelectSlot }
        />
      </div>
    );
};

export default MyCalendar;