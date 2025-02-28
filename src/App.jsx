import { Routes, Route } from 'react-router'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import Calendar from './components/Calendar/Calendar'
import Register from './components/Register/Register'
import Login from './components/Login/Login'

function App() {
    return(
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/calendar' element={<Calendar />} />
        </Routes>
    )
  
}

export default App
