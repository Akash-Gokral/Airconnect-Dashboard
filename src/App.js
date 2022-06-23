import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import Signin from './Components/Signin'
import Forgetpass from './Components/Forgetpass';
import Admintable from './Components/Admintable';
import Airporttable from "./Components/Airporttable"

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={  <Home/>}/>
      <Route path="/home" element={  <Home/>}/>
      <Route path="/admintable" element={  <Admintable/>}/>
      <Route path="/airporttable" element={  <Airporttable/>}/>
      <Route path="/signin" element={  <Signin/>} />
      <Route path="/signin/password" element={  <Forgetpass/>} />
      </Routes> 
   </BrowserRouter>


         
    </>
  )
}

export default App