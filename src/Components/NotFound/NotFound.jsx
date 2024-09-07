import React from 'react'
import errImg from '../../assets/images/error.svg'

export default function NotFound() {
  return (
    <div className='container flex justify-center items-center'>
        <div className='py-32'>
            <img src={errImg} className='w-full' alt="not found" />
        </div>
        </div>
  )
}
