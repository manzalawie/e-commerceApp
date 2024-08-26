import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import style from './Navbar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import { UserContext } from './../../Context/UserContext';
import { WishListContext } from '../../Context/WishListContext'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {

const [CartItemsCount, setCartItemsCount] = useState(0)

let {getCartItems} = useContext(CartContext)

async function getCartCount() {
  let response = await getCartItems();

  if (response.status == "success") {
    setCartItemsCount(response.data.products.length)
  }
}


const [WishListItemsCount, setWishListItemsCount] = useState(0)

let {getWishList} = useContext(WishListContext)

async function getItems() {
  let response = await getWishList();

  if (response.status == "success") {
    setWishListItemsCount(response.data.length)
    console.log();

  }

}
useEffect(()=>{
  getItems()
  getCartCount()
},[])

  let {userLogin, setuserLogin} = useContext(UserContext)
  
  let navigate = useNavigate();
  
  function signOut(){
    localStorage.removeItem("userToken");
    setuserLogin(null)
    navigate('/login')
  }
  return (
    <>
      

  <nav className="bg-slate-200 border-gray-200 fixed top-0 right-0 left-0 z-50">
    <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4">
      <div className="flex items-center gap-5">
      <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-8" alt="Fresh cart logo" width="130px"/>
        
      </Link>
      {userLogin != null ?<><ul className="flex gap-4">
        <li><Link to="">Home</Link></li>
        <li><Link to="products">Products</Link></li>
        <li><Link to="categories">Categories</Link></li>
        <li><Link to="brands">Brands</Link></li>
              
      </ul>
      <div className="ms-8 row gap-5 text-xl">
          <Link to="cart" className="relative inline-block">
            Cart 
            <i className="fa-solid text-emerald-600 fa-cart-shopping"></i>
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {CartItemsCount}
            </span>
          </Link>
          <Link to="wishList" className="relative inline-block">
            Wish List 
            <i className="fa-solid text-emerald-600 fa-heart cursor-pointer"></i>
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {WishListItemsCount}
            </span>
          </Link>
        </div>
 </> : null}
      </div>
      <div className="flex items-center space-x-6 rtl:space-x-reverse">
        <div className="icons flex gap-4">
          <i className="fab fa-facebook cursor-pointer"></i>
          <i className="fab fa-linkedin cursor-pointer"></i>
          <i className="fab fa-youtube cursor-pointer"></i>
          <i className="fab fa-tiktok cursor-pointer"></i>
          <i className="fab fa-twitter cursor-pointer"></i>
        </div>
        <div className="links flex gap-4">
          {userLogin != null 
          ? <span onClick={signOut} className="text-sm cursor-pointer">Sign out</span> :
          <> <Link to="login" className="text-sm">Login</Link>
          <Link to="register" className="text-sm">Register</Link></>
          }
          
          
        </div>
      </div>
    </div>
  </nav>
 


    </>
  );
}
