import { Calendar, momentLocalizer } from "react-big-calendar"
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from "moment"
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useContext, useEffect, useState } from "react"
import {UserContext} from '../../contexts/UserContext'
// import { useNavigate } from "react-router"
import { eventIndex } from "../../services/eventService"

const DnDCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

export default function CalendarComp() {

  const {user} = useContext(UserContext)

  const [events, setEvents] = useState([])

  // const navigate = useNavigate()

  useEffect(() => {
    if(!user) {
      console.log('no user')
      // navigate('/login')
    }
    
    async function testing() {
      try {
        const data = await eventIndex()
        // console.log(data)
        setEvents(data)
      } catch (error) {
        console.log(error)
      }
    }
    
    testing()

  }, [user])

  function add() {
    setEvents([ ...events, {
      id: 3,
      title: "Lunch test",
      start_date: new Date(2025, 2, 26, 13, 0),
      end_date: new Date(2025, 2, 27, 15, 0),
      all_day: true,
      description: '',
      color: '#D0021B',
      category: null,
      user: 1,
    }])
  }

  return (
    <div>
      <button onClick={add} className="button">add</button>
      <DnDCalendar
        key={window.location.pathname + events.length}
        localizer={localizer}
        events={events}
        startAccessor='start_date'
        endAccessor='end_date'
        allDayAccessor='all_day'
        draggableAccessor={() => false} // Disable dragging
        resizable={false} // Disable resizing
      />
    </div>
  )
}