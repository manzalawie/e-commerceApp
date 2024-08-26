import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {

const [CartItems, setCartItems] = useState([])

let {getCartItems, deleteCart, updateCount, deleteAllCart} = useContext(CartContext)

async function getItems() {
  let response = await getCartItems();

  if (response.status == "success") {
    setCartItems(response.data)
  }

}

async function updateProductCount(id, count){

if(count == 0){

deleteFromCart(id)
}else{

  let response = await updateCount(id, count);
  
  if (response.data.status == "success"){
    setCartItems(response.data.data)
  }
}
}

async function deleteFromCart(id) {
  let response = await deleteCart(id)
console.log(response);

 if (response.data.status == "success"){
  setCartItems(response.data.data)
 }
}

async function deleteFromCartAll() {
  let response = await deleteAllCart()
  console.log(response);
  
 if (response.data.message == "success"){
  setCartItems([])
 }
}

useEffect(()=>{
  getItems()
},[])

  return (
    <>
         {CartItems.products?.length > 0 ? <>
<h3 className='text-center text-3xl mb-5 bg-emerald-100 text-emerald-600 py-5'>Total Cart Price : <strong>{CartItems.totalCartPrice}</strong> EGP </h3>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
  {CartItems.products?.map((item)=><>
      <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.product.title.split(' ').slice(0,2).join(' ')}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateProductCount(item.product.id, item.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={item.count} required />
            </div>
            <button onClick={()=>updateProductCount(item.product.id, item.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.price} EGP / Item
        </td>
        <td className="px-6 py-4">
          <a onClick={()=>{deleteFromCart(item.product.id)}} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>
    </>)}
    </tbody>
  </table>
</div>
<div className="mt-8">
    <Link to={'/checkOut'} className="cursor-pointer font-medium text-emerald-900 p-3 hover:bg-emerald-200 rounded-lg bg-emerald-300 mr-9">Checkout</Link>
    <span onClick={deleteFromCartAll} className="cursor-pointer font-medium text-red-900 p-3 hover:bg-red-200 rounded-lg bg-red-300">Remove All items</span>
</div>
</> : <>


<h3 className='text-center text-3xl mb-5 bg-emerald-100 text-emerald-600 py-5'>Your Cart is Empty </h3>



</>}
    </>
  )
}
