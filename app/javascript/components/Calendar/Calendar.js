import React from 'react';
import { useState , useEffect } from "react";
import { Router } from 'react-router-dom'
import axios from "axios";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"

// const DnDCalendar = withDragAndDrop(Calendar);
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const myEventsList= [
  {
    'title': 'Event 1',
    'start': new Date(2020,10,20,8),
    'end': new Date(2020,10,20,10)
  },
  {
    'title': 'Event 2',
    'start': new Date(2020,10,3,12),
    'end': new Date(2020,10,3,15)
  }];

  const convertDate = (date) => {
    return moment.utc(date).toDate()
  }

const updatedEv = (appointments) => {
  const newArr = appointments.map(item => 
    ({
      title: `${item.attributes.event_type}`,
      start: convertDate(item.attributes.start_time),
      end: convertDate(item.attributes.end_time),
  }))
    console.log("newArr1", newArr)
    return newArr
}

const MyCalendar = () => {
  const [events, setEvents] = useState([])
  // console.log(events)

useEffect(() => {
  const URLbookings = "http://localhost:3000/api/v1/bookings"
  axios.get(URLbookings)
  .then((response) => {
    let appointmentsHere = response.data.data;
    console.log("type of this:", appointmentsHere)
    let x = updatedEv(appointmentsHere)
    // let y = x.reduce((ac, cu) => (ac, cu))
    // console.log("yyyy:", y)
    setEvents(prev => ([...prev, ...x]))
  })}, [])
  console.log(events)

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        defaultView='week'
        views={['week']}
        // style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;