import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import axios from 'axios'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"

// const DnDCalendar = withDragAndDrop(Calendar);

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})




const myEventsList= [
  {
    'title': 'Event 1',
    'startDate': new Date(2020,10,20,8),
    'endDate': new Date(2020,10,20,10)
  },
  {
    'title': 'Event 2',
    'startDate': new Date(2020,10,3,12),
    'endDate': new Date(2020,10,3,15)
  }];

const MyCalendar = () => {
  
  // Adding logic to retrieve data from api
  const [bookings, setBookings] = useState([])
  useEffect( ()=>{
    axios.get('http://localhost:3000/api/v1/bookings')
    .then(response => {
      console.log(response.data)
      setBookings(response.data.data)
    })
    .catch(response => (console.log(response)))
  },[bookings.length])

  const getEvents =() => {
    eventList = {}
    for (e in eventList){
      for (booking of bookings) {
        e.title = booking[event_type]
        e.startDate = booking[start_date]
        e.endDate = booking[end_date]
      }
    return eventList
  }
  
  


  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor='startDate'
        endAccessor='endDate'
        defaultView='week'
        views={['week']}
      />
    </div>
  );
};

export default MyCalendar;