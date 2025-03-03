import { Routes, Route } from 'react-router'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import MainLayout from './components/MainLayout/MainLayout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/calendar' element={<MainLayout />} />
    </Routes>
  )

}

export default App
