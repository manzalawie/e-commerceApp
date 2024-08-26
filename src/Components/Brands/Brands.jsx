import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Brands() {

function getbrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
}
let {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey : "getbrands",
    queryFn  :  getbrands,
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
let brands = data?.data?.data;
 


  return (
    <>
<div className="tittle text-center text-2xl font-semibold my-5 text-emerald-600">
        <h2>All Brands</h2> 
</div>
<div className="row p-4 justify-between">
{brands.map((brand)=> (
  <div key={brand._id} className="w-full md:w-[32%] mb-8 border border-gray-300 rounded-md hover:shadow-emerald-300 hover:shadow-lg transition-shadow duration-300">
    <img src={brand.image} className='w-full object-cover mb-5' alt={brand.name} />
    <div className="p-10">
      <h3 className='text-2xl text-center text-emerald-600 font-semibold'>{brand.name}</h3>
    </div>
  </div>

))
 }
</div>
</>
  )
}

