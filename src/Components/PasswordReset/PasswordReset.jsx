import React from 'react'
import style from './PasswordReset.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './../../Context/UserContext';

export default function PasswordReset() {
  let {userLogin, setuserLogin, resetPass} = useContext(UserContext)
  const navigate = useNavigate()
  const [ApiError, setApiError] = useState('')
  const [isLoading, setisLoading] = useState(false)

async function handleLogin(values){
  setisLoading(true)

  let response = await resetPass(values)
  if(response.data.token){
    localStorage.setItem("userToken", response.data.token)
    setuserLogin(response.data.token)
    setisLoading(false)
    navigate("/")
  }
}

let schema = Yup.object().shape({
    email: Yup.string()
    .email("invalid Email")
    .required("E-mail is required"),
    newPassword: Yup.string()
    .matches(/^[A-Za-z0-9]{6,10}$/, "newPassword should be between 6 and 10 chars")
    .required("newPassword is required"),
    })

let formik = useFormik({
  initialValues:{
    email: "",
    newPassword: "",
  },
  validationSchema: schema,
  onSubmit: handleLogin
})

  return (
    <>
    {ApiError ? <div className='w-1/2 mx-auto bg-red-300 p-3 rounded-lg font-semibold'>
    <span className='text-red-950'>{ApiError}</span>
    </div> : null}
    <div className='my-5 text-center font-semibold text-2xl text-emerald-600 mb-3'>
      Reset your password
    </div>
<form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
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
  
  <div className="relative z-0 w-full mb-5 group">
    <input 
      type="password"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.newPassword}
      id="newPassword"
      name="newPassword"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" "
      required 
    />
    <label 
      htmlFor="newPassword" 
      className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Enter your new password
    </label>
    {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-2 mt-1 bg-red-300 text-left mb-4">
    <span className='text-sm text-red-950 '>{formik.errors.newPassword}</span>
  </div> : null}
  </div>
  <button
   type="submit" 
   className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
  disabled={isLoading}
   >
    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Reset Password"}
  </button>
</form>

 
    </>
  )
}