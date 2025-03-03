import { Calendar, momentLocalizer } from "react-big-calendar"
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from "moment"
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from "react"

const DnDCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

export default function CalendarComp() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Meeting with Client",
      start: new Date(2025, 2, 25, 10, 0), // March 25, 2025, 10:00 AM
      end: new Date(2025, 2, 25, 11, 0),   // March 25, 2025, 11:00 AM
    },
    {
      id: 2,
      title: "Lunch Break",
      start: new Date(2025, 2, 25, 13, 0),
      end: new Date(2025, 2, 25, 14, 0),
      allDay: true,
    },
  ])

  function add() {
    setEvents([ ...events, {
      id: 3,
      title: "Lunch test",
      start: new Date(2025, 2, 26, 13, 0),
      end: new Date(2025, 2, 26, 14, 0),
      allDay: false,
    }])
  }

  return (
    <div>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
      />
      <button onClick={add}>add</button>
    </div>
  )
}