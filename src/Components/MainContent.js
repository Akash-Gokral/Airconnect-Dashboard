import React, { useEffect } from 'react'
import "./styles/maincontent.css"
import { useNavigate } from 'react-router-dom'

const MainContent = () => {

    const navigate=useNavigate();

    
    useEffect(()=>{
    if(!localStorage.getItem("token")){
        navigate("/signin")
    }
    
},[])



  return (
    <>
             <div className="div">
             <h2 className=""> Welcome To Dashboard</h2>
             </div>
    </>
  )
}

export default MainContent