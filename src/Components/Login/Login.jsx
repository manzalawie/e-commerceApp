import React from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './../../Context/UserContext';


export default function Login() {

  let {userLogin, setuserLogin} = useContext(UserContext)
  const navigate = useNavigate()
  const [ApiError, setApiError] = useState('')
  const [isLoading, setisLoading] = useState(false)

function handleLogin(values){
  setisLoading(true)
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
  .then((res)=>{
    if(res.data.message == "success"){
      localStorage.setItem("userToken", res.data.token)
      setuserLogin(res.data.token)
      navigate("/")
    }
    setisLoading(false)
  })
  .catch((res)=>{
    setApiError(res.response.data.message)    
    setisLoading(false)
  })
}

let schema = Yup.object().shape({
    email: Yup.string()
    .email("invalid Email")
    .required("E-mail is required"),
    password: Yup.string()
    .matches(/^[A-Za-z0-9]{6,10}$/, "Password should be between 6 and 10 chars")
    .required("Password is required"),
    })

let formik = useFormik({
  initialValues:{
    email: "",
    password: "",
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
      Login Now
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
      value={formik.values.password}
      id="password"
      name="password"
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" 
      placeholder=" "
      required 
    />
    <label 
      htmlFor="password" 
      className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Enter your password
    </label>
    {formik.errors.password && formik.touched.password ? <div className="p-2 mt-1 bg-red-300 text-left mb-4">
    <span className='text-sm text-red-950 '>{formik.errors.password}</span>
  </div> : null}
  </div>
  <div className="mb-4">
  <Link to={"/forgotPassword"} className='p-1 underline underline-offset-4 text-blue-600'>Forgot Password</Link>
  </div>
  <button
   type="submit" 
   className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
  disabled={isLoading}
   >
    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}
  </button>
  <span className='ml-3'> Have no account yet<Link to={"/register"} className='p-1 underline underline-offset-4 text-blue-600'>Register</Link> now</span>
</form>

 
    </>
  )
}
