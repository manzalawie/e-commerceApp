import React from 'react'
import style from './CheckOut.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';


export default function CheckOut() {
 let {checkOut, myCartId} = useContext(CartContext)
  const navigate = useNavigate()
  const [ApiError, setApiError] = useState('')
  const [isLoading, setisLoading] = useState(false)

async function handleCheckOut(cartId, url){
  setisLoading(true)
let {data} = await checkOut(cartId, url, formik.values)
  window.location.href = data.session.url
console.log(formik.values);
  
}

let formik = useFormik({
  initialValues:{
    details: "",
    phone: "",
    city: "",
  },
  onSubmit: ()=>handleCheckOut(myCartId, "http://localhost:5173")
})

  return (
    <>
    <div className='my-5 text-center font-semibold text-2xl text-emerald-600 mb-3'>
      Checkout Now
    </div>
<form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
    <input 
      type="text"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.details}
      id="details"
      name="details"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" "
      required 
    />
    <label 
      htmlFor="details" 
      className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Enter your address details
    </label>
  </div>
  
<div className="relative z-0 w-full mb-5 group">
    <input 
      type="tel"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.phone}
      id="phone"
      name="phone"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" "
      required 
    />
    <label 
      htmlFor="phone" 
      className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Enter your phone number
    </label>
  </div>

<div className="relative z-0 w-full mb-5 group">
    <input 
      type="text"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.city}
      id="city"
      name="city"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" "
      required 
    />
    <label 
      htmlFor="city" 
      className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Enter your city
    </label>
  </div>
 
  <button
   type="submit" 
   className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
  disabled={isLoading}
   >
    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Checkout"}
  </button>
</form>

 
    </>
  )
}
