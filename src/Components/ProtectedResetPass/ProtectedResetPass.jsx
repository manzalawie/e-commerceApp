import React from 'react'
import style from './ProtectedResetPass.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedResetPass(props) {
  if (localStorage.getItem("ForgotPass")) {
    
    return props.children
  
  } else{
  
    return <Navigate to={"/login"}/>
  
  } 
}
