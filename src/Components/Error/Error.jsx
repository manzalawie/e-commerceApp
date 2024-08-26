import React from 'react'
import notFound from '../../assets/error.svg'


export default function Error() {
  return (
    <div className='flex justify-center pt-20'>
      <img src={notFound} alt="" />
    </div>
  )
}
