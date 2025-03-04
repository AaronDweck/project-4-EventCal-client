import { Calendar, momentLocalizer } from "react-big-calendar"
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from "moment"
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useContext, useEffect, useState } from "react"
import {UserContext} from '../../contexts/UserContext'
import { useNavigate } from "react-router"
import { eventIndex } from "../../services/eventService"
import { EventContext } from "../../contexts/EventContext"

const DnDCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

export default function CalendarComp() {

  const {user} = useContext(UserContext)

  const {events, setEvents} = useContext(EventContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
    
    async function testing() {
      try {
        const data = await eventIndex()
        setEvents(data)
      } catch (error) {
        console.log(error)
      }
    }
    
    testing()

  }, [user, navigate])

  return (
    <div>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor='start_date'
        endAccessor='end_date'
        allDayAccessor='all_day'
      />
    </div>
  )
}