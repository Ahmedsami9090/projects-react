import React, { useContext } from 'react'
import logoImage from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { myAuthContext } from '../../Contexts/AuthContext'
import {myCartContext} from '../../Contexts/CartContext';

export default function Navbar() {
  const {token, setToken} = useContext(myAuthContext);
  const {cartItemNum} = useContext(myCartContext);
  const navigate = useNavigate()

  function loggingOut() {
    setToken(null);
    localStorage.removeItem('tkn');
    navigate('/login')
  }
  return (
    <>
      <nav className='p-5 flex flex-col md:flex-row space-y-4 md:space-y-0 bg-green-400 items-center justify-between font-semibold'>
        <div className='flex flex-col md:flex-row  space-x-3'>
          <div>
            <img src={logoImage} className='w-full' alt="freshcart" />
          </div>
          <div className='flex items-center'>
            {token ? <ul className='space-x-3'>
              <NavLink to='/home'>Home</NavLink>
              <NavLink to='/products'>Products</NavLink>
              <NavLink to='/category'>Category</NavLink>
              <NavLink to='/brands'>Brands</NavLink>
              <NavLink to='/wishlist'>Wishlist</NavLink>
            </ul> : ''}
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-3'>
          <div className='flex items-center space-x-3 me-4'>
            <i className='fa-brands fa-facebook cursor-pointer'></i>
            <i className='fa-brands fa-twitter cursor-pointer'></i>
            <i className='fa-brands fa-instagram cursor-pointer'></i>
            <i className='fa-brands fa-youtube cursor-pointer'></i>
            <i className='fa-brands fa-tiktok cursor-pointer'></i>
            <i className='fa-brands fa-linkedin cursor-pointer'></i>
          </div>
          <div className='flex items-center justify-center space-x-3'>
            {token ? '' : <>
              <span className='cursor-pointer' onClick={() => { navigate('/login') }}>Login</span>
              <span className='cursor-pointer' onClick={() => { navigate('/register') }}>Register</span>
            </>}

            {token ? <>
              <Link to='/cart' className='me-3 relative'>
                <i className='fa-solid fa-cart-shopping text-xl'></i>
                {cartItemNum > 0? <div className='px-3 py-3  rounded-full bg-red-500 absolute top-0 -translate-y-2/3 left-1/2 -translate-x-1/2 w-1/2 h-1/2 flex justify-center items-center text-white'>
                  <h4 className='text-xl'>{cartItemNum}</h4>
                </div> :'' }
              </Link>
              <span onClick={loggingOut} className='cursor-pointer'>Logout</span>
            </> : ''}
          </div>
        </div>
      </nav>
    </>
  )
}
