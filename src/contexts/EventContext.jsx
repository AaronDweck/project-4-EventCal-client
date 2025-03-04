import { createContext, useState } from "react"

const EventContext = createContext(null)

function EventProvider({ children }) {
  const [events, setEvents] = useState([])

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  )
}

export { EventContext, EventProvider }