import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { AuthPage } from "./pages/AuthPage"
import { NavBar } from "./components/NavBar"


function App() {
  const userName = sessionStorage.getItem('userName')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userName && location.pathname !== '/auth') {
      navigate('/auth')
    } else if (userName && location.pathname !== '/') {
      navigate('')
    }
  })
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="" element={<HomePage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
      </Routes>
    </>
  )
}

export default App
