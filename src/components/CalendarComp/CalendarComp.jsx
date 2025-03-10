import { Calendar, momentLocalizer } from "react-big-calendar"
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from "moment"
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useContext, useEffect } from "react"
import { UserContext } from '../../contexts/UserContext'
import { useNavigate, useParams } from "react-router"
import { eventIndex, eventUpdate } from "../../services/eventService"
import { EventContext } from "../../contexts/EventContext"

const DnDCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

export default function CalendarComp() {

  const { user } = useContext(UserContext)
  const { events, setEvents } = useContext(EventContext)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }

    async function fetchingEvents() {
      try {
        const data = await eventIndex()
        setEvents(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchingEvents()

  }, [user])

  async function updateEvent({ event, start, end, isAllDay }) {
    try {
      const updatedEvents = events.map(existingEvent => {
        if (existingEvent !== event) {
          return existingEvent
        }
        return ({
          ...event,
          start_date: start,
          end_date: end,
          all_day: Boolean(isAllDay)
        })
      })

      setEvents(updatedEvents)

      const data = {
        start_date: start.toISOString().slice(0, 16),
        end_date: end.toISOString().slice(0, 16),
        all_day: Boolean(isAllDay)
      }

      await eventUpdate(event.id, data)

      if (id) navigate('/calendar')
    } catch (error) {
      console.log(error)
      alert('could not update event at this time.')

      // if there was an error updating the db reset the event on the calendar
      const updatedEvents = events.map(existingEvent => {
        if (existingEvent !== event) {
          return existingEvent
        }
        return ({
          ...event,
          start_date: event.start_date,
          end_date: event.end_date,
          all_day: event.all_day
        })
      })

      setEvents(updatedEvents)
    }
  }

  return (
    <div>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor='start_date'
        endAccessor='end_date'
        allDayAccessor='all_day'
        onSelectEvent={(event) => navigate(`/calendar/${event.id}`)}
        eventPropGetter={(event) => ({ style: { background: event.color } })}
        onEventDrop={updateEvent}
        onEventResize={updateEvent}
      />
    </div>
  )
}