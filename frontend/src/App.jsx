
import React, { useEffect } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LogInPage from "./pages/LogInPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import SettingPage from "./pages/SettingPage.jsx"
import Navbar from "./components/Navbar.jsx"
import { useAuthStore } from './store/useAuthStore.js'
import{ Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemesStore.js'


const App = () => {
  
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );


  

  return (

    <>
    <div data-theme = {theme}>
      
    
  <Navbar/>
          <Routes>
            <Route path='/' element={authUser?<HomePage/>:<Navigate to="/login"/>}/>
            <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
            <Route path='/login' element={!authUser?<LogInPage />:<Navigate to="/"/>}/>
            <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
            <Route path='/setting' element={<SettingPage/>}/>
          </Routes>
    <Toaster/>
    </div>
    </>
  )
}

export default App