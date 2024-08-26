import React from 'react'
import style from './ProtectedResetPassFinal.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedResetPassFinal(props) {
  if (localStorage.getItem("ResetCode")) {
    
    return props.children
  
  } else{
  
    return <Navigate to={"/login"}/>
  
  } 
}
