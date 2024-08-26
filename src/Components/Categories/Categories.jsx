import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import slide4 from "../../assets/slider-image-3.jpeg"
import axios from "axios";
import { useQuery } from '@tanstack/react-query';

export default function Categories() {
 
function getCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
}
let {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey : "getCategories",
    queryFn  :  getCategories,
    staleTime : 30000,
    // retry : 4,
    // retryDelay : 4000,
    // refetchInterval : 4000,
    // refetchIntervalInBackground : true,
    // refetchOnWindowFocus : true,
  })

if(isError){
  return <h3>{error}</h3>
}
if(isLoading){
  return <div className="spinner"></div>
}
let categories = data?.data?.data;
 

  return (
    <>
<div className="tittle text-center text-3xl font-semibold my-5 text-emerald-600">
        <h2>All Categories</h2> 
</div>
<div className="row p-4 justify-between">
{categories.map((category)=> (
  <div key={category._id} className="w-full md:w-[32%] mb-8 border border-gray-300 rounded-md hover:shadow-emerald-300 hover:shadow-lg transition-shadow duration-300">
    <img src={category.image} className='w-full object-cover mb-5 h-[300px]' alt={category.name} />
    <div className="py-7">
      <h3 className='text-2xl text-center text-emerald-600 font-bold'>{category.name}</h3>
    </div>
  </div>

))
 }
</div>
</>
  )
}
