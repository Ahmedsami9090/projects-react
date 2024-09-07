import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from '@tanstack/react-query';
import { myCartContext } from '../../Contexts/CartContext';
import toast from 'react-hot-toast';
import { mywishlistContext } from '../../Contexts/WishlistContext';


export default function Products() {
  const { addToWishlist, handleWishlistIcon } = useContext(mywishlistContext);
  const { addToCart } = useContext(myCartContext)

  async function handleAddToWishlist(id) {
    const flag = await addToWishlist(id)
    if(flag){
      toast.success('Item added to wishlist successfully')
    }else{
      toast.error('Error adding item to wishlist')
    }
  }
  async function handleAddToCart(id) {
    const flag = await addToCart(id)
    if (flag) {
      toast.success('Item added to cart successfully')
    } else {
      toast.error('Error adding item to cart')
    }
  }
  const options = { maximumFractionDigits: 2 }
  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['allProducts'],
    queryFn: getAllProducts
  })
  if (isError) {
    return <>
      <div className='flex justify-center items-center'>
        <h1>Error displaying data</h1>
        <h3>{error}</h3>
      </div>
    </>
  }

  if (isLoading) {
    return <>
      <div className='flex justify-center items-center'>
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    </>
  }

  



  return (
    <>
      <div className='grid md:grid-cols-4 lg:grid-cols-6 gap-4 px-5 py-10'>
        {data.data.data.map((product) => {
          return <div className='flex flex-col px-3 relative group overflow-hidden'>
            <i onClick={() => { handleAddToWishlist(product.id) }} className={handleWishlistIcon(product.id) ? 'fa-solid fa-heart absolute bottom-16 right-8 cursor-pointer text-red-500'
              : 'fa-solid text-gray-300 fa-heart absolute bottom-16 right-8 cursor-pointer'
            }></i>
            <Link to={`/details/${product.id}`}>
              <div key={product.id} className='h-fit'>
                <div className='px-3'>
                  <img src={product.imageCover} className='w-full h-full' alt="" />
                </div>
                <div className='ps-3 pt-2'>
                  <h1 className='text-base'>{product.category.name}</h1>
                  <h2 className='truncate text-xl'>{product.title}</h2>
                  <div className='flex justify-between pe-3 pb-2'>
                    <h3 className='font-semibold'>{Intl.NumberFormat('en-US', options).format(product.price)}</h3>
                    <h3 className='font-semibold'><i className='fa-solid fa-star text-yellow-400 me-2'></i>{product.ratingsAverage}</h3>
                  </div>
                </div>
              </div>
            </Link>
            <button onClick={() => { handleAddToCart(product.id) }} className='bg-green-400 w-1/2 mx-auto py-2 rounded-md hover:bg-green-500 duration-500 absolute -bottom-10 left-1/2 -translate-x-1/2 group-hover:bottom-1'>Add to Cart</button>
          </div>
        })}
      </div>
    </>
  )
}
