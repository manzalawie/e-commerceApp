import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";

export default function CategoriesSlider() {

  const [categories, setCategories] = useState([])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
  };

  function getCategories(){
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    .then((res)=>{
      setCategories(res.data.data)
    })
    .catch((res)=>{
    })
  }

  useEffect(()=>{
    getCategories()
  }, [])

  return (
    <>
    <h2 className='text-gray-600 font-medium my-3 capitalize'>Shop popular categories</h2>
    <Slider {...settings}>

      {categories.map((category)=><div key={category._id}>
        <img src={category.image} className='w-full h-[200px] object-cover' alt={category.name} />
        <h3>{category.name}</h3>
      </div>)}
    </Slider>
    </>
  )
}
