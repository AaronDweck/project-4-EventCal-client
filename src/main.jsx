import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './contexts/UserContext.jsx'
import App from './App.jsx'
import './index.css'
import { EventProvider } from './contexts/EventContext.jsx'

createRoot(document.getElementById('root')).render(
  //   <StrictMode>
  <BrowserRouter>
    <UserProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </UserProvider>
  </BrowserRouter>
  //   </StrictMode>,
)
