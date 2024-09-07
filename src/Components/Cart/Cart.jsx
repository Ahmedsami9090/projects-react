import React, { useContext } from 'react'
import { myCartContext } from '../../Contexts/CartContext'
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, totalPrice, updateCount, deleteItem, cartItemNum, cartId } = useContext(myCartContext);
  function handleCountUpdate(id, count) {
    if (count > 0) {
      updateCount(id, count);
      console.log('count ', count);
    } else {
      deleteItem(id)
    }
  }
  function handleDeleteItem(id) {
    deleteItem(id);
  
  }
  const options = { maximumFractionDigits: 2 }

  return (
    <div className='container bg-gray-100 py-20 px-10 mx-auto'>
      <div className='flex justify-between'>
        <div className='w-5/6'>
          <h1 className='text-3xl font-semibold'>Shopping Cart:</h1>
          <h2 className='mt-2 text-lg'>Total Items in Cart: <span className='text-green-500 font-semibold text-xl'>{cartItemNum}</span></h2>
          <h2 className='mt-2 text-lg'>Total Cart: <span className='font-semibold text-xl'>{Intl.NumberFormat('en-US', options).format(totalPrice)}</span> EGP</h2>
        </div>
        <div className='flex flex-col justify-center w-1/6 gap-y-4 items-end'>
          {totalPrice ? <>
            <Link to={`/order/${cartId}`}>
              <button className='bg-green-500 w-full hover:bg-green-600 hover:text-white duration-500 rounded-md py-1 px-2'>Checkout</button>
            </Link>
          </> : ''}
        </div>
      </div>

      <div className='grid grid-cols-1'>
        {cartItems?.map((item) => {
          return <>
            <div className='flex justify-between items-center mt-4 px-3'>
              <div className='flex justify-center space-x-4 items-center'>
                <div className=' p-1 w-[160px] h-full]'>
                  <img src={item.product.imageCover} className='w-full h-full' alt="" />
                </div>
                <div>
                  <h3>{item.product.title}</h3>
                  <h3>price: <span>{item.price}</span> EGP</h3>
                  <h3 className='cursor-pointer text-red-500 hover:text-red-700 duration-500' onClick={() => handleDeleteItem(item.product._id)}><i className='fa-solid fa-trash'></i> Remove</h3>
                </div>
              </div>
              <div className='flex justify-around items-center w-1/12'>
                <button onClick={() => { handleCountUpdate(item.product._id, item.count + 1) }} className='border border-green-400 p-2 rounded-md hover:bg-green-400 duration-500 hover:text-white font-semibold text-lg' >+</button>
                <h3 className='text-lg'>{item.count > 0 ? item.count : 0}</h3>
                <button onClick={() => { handleCountUpdate(item.product._id, item.count - 1) }} className='border border-green-400 p-2 rounded-md hover:bg-green-400 duration-500 hover:text-white font-semibold text-lg'>-</button>
              </div>
            </div>
          </>
        })}
      </div>
    </div>
  )
}
