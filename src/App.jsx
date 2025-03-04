import { Routes, Route } from 'react-router'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import MainLayout from './components/MainLayout/MainLayout'
import CalendarComp from './components/CalendarComp/CalendarComp'
import SideBar from './components/SideBar/SideBar'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path='/calendar' element={<SideBar />} />
        <Route path='/calendar/:id' element={<SideBar />} />
      </Route>
    </Routes>
  )

}

export default App
