import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"

const DnDCalendar = withDragAndDrop(Calendar);
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

const MyCalendar = props => (
  <div>
    <DnDCalendar
      localizer={localizer}
      events={myEventsList}
      startAccessor='startDate'
      endAccessor='endDate'
      defaultView='week'
      views={['week']}

    />
  </div>
);


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MyCalendar name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})