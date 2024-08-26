import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import NotificationMessage from './../NotificationMessage/NotificationMessage';

export default function ProductDetails() {

const [message, setMessage] = useState('');

let {addToWishList} = useContext(WishListContext)
async function addWishList(id) {
  let response = await addToWishList(id)
  setMessage(response.data.message)
console.log(response);

}


  let {addToCart} = useContext(CartContext)

  const [product, setproduct] = useState()
  const [allProduct, setallProduct] = useState([])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  let {id, category} = useParams()

  function getPrdouct(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
      setproduct(res.data.data)
    })
    .catch((res)=>{
    })
  }

  function getAllPrdouct(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
      let relatedProducts = res.data.data.filter((product)=> product.category.name == category)
      setallProduct(relatedProducts)
    })
    .catch((res)=>{
    })
  }

  useEffect(()=>{
    getPrdouct()
    getAllPrdouct()
  }, [id, category])

async function addCart(id) {
  let response = await addToCart(id)
  setMessage(response.data.message)
}

  return (
    <>
    <NotificationMessage message={message} />
        <div className="row items-center">
          <div className='w-1/4'>
          <Slider {...settings}>
            {product?.images.map((img)=><>
              <img src={img} className='w=full' alt={product?.title} />
              </>)}</Slider>
          </div>
          <div className='w-3/4 p-4'>
              <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
              <h4 className='text-gray-700 my-4'>{product?.description}</h4>
              <h4 className='text-gray-700 my-4 font-semibold'>{product?.category.name}</h4>
              <div className="row justify-between p-3 my-5">
                <span>{product?.price} EGP</span>
                <span><i className="fa-solid fa-star text-yellow-400"></i>{product?.ratingsAverage}</span>
              </div>
              <div className="flex gap-4">
                <button onClick={()=>{addCart(product.id)}} className='btn'>Add to cart</button>
                <i onClick={()=>{addWishList(product.id)}} className="fa-solid fa-heart text-3xl text-emerald-600 cursor-pointer"></i>
              </div>
          </div>
        </div> 
        <h3 className='text-3xl text-center mt-10 font-semibold text-gray-700'>Related Products</h3>
        <div className="row">
      {allProduct.length > 0 ? allProduct.map((product)=> (
          <div key={product.id} className='w-1/6'>
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
       : <div className="spinner"></div>}
    </div>
    </>
  )
}
