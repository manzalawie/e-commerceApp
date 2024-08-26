import React, { useContext, useState } from 'react'
import style from './ForgotPassword.module.css'
import { UserContext } from './../../Context/UserContext';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
const [isLoading, setisLoading] = useState(false)
const [ApiRes, setApiRes] = useState('')
let {forgotPass} = useContext(UserContext)
  const navigate = useNavigate()


async function sendRequest(email) {
  setisLoading(true)
  let response = await forgotPass(email)

if(response.data.statusMsg == "success"){
  setApiRes(response.data.message);
  localStorage.setItem("ForgotPass", "success")
  navigate('/verify-code')
}
  setisLoading(false)
}



let schema = Yup.object().shape({
    email: Yup.string()
    .email("invalid Email")
    .required("E-mail is required"),
    })

let formik = useFormik({
  initialValues:{
    email: "",
  },
  validationSchema: schema,
  onSubmit: sendRequest
})

  return (
    <>

    {ApiRes ? <div className='w-1/2 mx-auto bg-emerald-300 p-3 rounded-lg font-semibold'>
    <span className='text-emerald-950'>{ApiRes}</span>
    </div> : null}
    <div className='my-5 text-center font-semibold text-2xl text-emerald-600 mb-3'>
      Reset Your Password
    </div>

<form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}> 

<div className="relative z-0 w-full mb-5 group">
    <input 
      type="email"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email}
      id="email"
      name="email"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" "
      required 
    />
    <label 
      htmlFor="email" 
      className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Enter your E-mail address
    </label>
    {formik.errors.email && formik.touched.email ? <div className="p-2 bg-red-300 text-left mb-4 mt-1">
    <span className='text-sm text-red-950 '>{formik.errors.email}</span>
  </div> : null}
  </div>  


<button
   type="submit" 
   className="text-white mt-5 bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
  disabled={isLoading}
   >
      {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Reset Password"}
  </button>
</form>

 
    </>
  )
}
