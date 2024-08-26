import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import { WishListContext } from '../../Context/WishListContext'




export default function WishList() {
 
const [WishListItems, setWishListItems] = useState([])

let {getWishList, deleteWishList} = useContext(WishListContext)

async function getItems() {
  let response = await getWishList();

  if (response.status == "success") {
    setWishListItems(response.data)
  }
}

async function deleteFromWishList(id) {
  let response = await deleteWishList(id)

 if (response.data.status == "success"){
  setWishListItems((prevItems) => prevItems.filter(item => item.id !== id));
 }
}
console.log(WishListItems.length);


useEffect(()=>{
  getItems()
},[])


 return (
    <>
{WishListItems?.length > 0 ? <>
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
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
  {WishListItems?.map((item)=><>
      <tr key={item.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.title?.split(' ').slice(0,2).join(' ')}
        </td>
      
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.price} EGP / Item
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>deleteFromWishList(item.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
        </td>
      </tr>
    </>)}
    </tbody>
  </table>
</div>
 </> : <>


<h3 className='text-center text-3xl mb-5 bg-emerald-100 text-emerald-600 py-5'>Your Wishlist is Empty </h3>



</>}
    </>
  )
}
