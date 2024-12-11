
import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LogInPage from "./pages/LogInPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import SettingPage from "./pages/SettingPage.jsx"
import Navbar from "./components/Navbar.jsx"
import { useAuthStore } from './store/useAuthStore.js'

const App = () => {
  const {authUser,checkAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  console.log({authUser})

  return (

    <>

  <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/login' element={<LogInPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/setting' element={<SettingPage/>}/>
    </Routes>
    </>
  )
}

export default App