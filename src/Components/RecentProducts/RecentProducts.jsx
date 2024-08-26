import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import NotificationMessage from '../NotificationMessage/NotificationMessage';


export default function RecentProducts() {

const [message, setMessage] = useState('');

let {addToWishList} = useContext(WishListContext)
async function addWishList(id) {
  let response = await addToWishList(id)
  setMessage(response.data.message)
}


let {addToCart} = useContext(CartContext)
async function addCart(id) {
  let response = await addToCart(id)
  setMessage(response.data.message)
}

function getProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
}
let {data, isError, error, isLoading, isFetching} = useQuery({
    queryKey : "recentProduct",
    queryFn  :  getProducts,
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
let products = data?.data?.data;
 
  return (
    <>
    <NotificationMessage message={message} />
    <div className="row">
      {products?.map((product)=> (
          <div key={product.id} className='w-full md:w-1/3 xl:w-1/6'>
            <div className='product my-2 p-2 text-center'>
            <Link to={`/productDetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className='w-full' alt={product.title} />
              <h3 className='text-emerald-600'>{product.category.name}</h3>
              <h3 className='mb-1 font-semibold'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
              <div className="row justify-between">
                <span>{product.price} EGP</span>
                <span><i className="fa-solid fa-star text-yellow-400"></i>{product.ratingsAverage}</span>
              </div>
            </Link>
              <i onClick={()=>{addWishList(product.id)}} className="fa-solid fa-heart text-3xl text-emerald-600 cursor-pointer"></i>
              <button onClick={()=>{addCart(product.id)}} className='btn'>Add to cart</button>
            </div>
          </div>
          ))
       }
    </div>
    </>
  )
}
