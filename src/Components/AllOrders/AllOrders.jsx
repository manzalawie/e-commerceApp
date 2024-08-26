import React from 'react'
import style from './AllOrders.module.css'
import axios from 'axios'


export default function AllOrders() {

function getAllOrders(id){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
.then((res)=>res)
.catch((err)=>err)
}

  return (
    <>
         
    </>
  )
}
