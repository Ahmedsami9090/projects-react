import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { myCartContext } from '../../Contexts/CartContext'
import toast from 'react-hot-toast';
import { mywishlistContext } from '../../Contexts/WishlistContext'

export default function ProductDetails() {
    const { addToCart } = useContext(myCartContext);
    const { addToWishlist, handleWishlistIcon } = useContext(mywishlistContext);
    const { id } = useParams()
    useEffect(() => {
        handleWishlistIcon(id)
    }, [])
    function handleAddToWishlist(id) {
        addToWishlist(id);

    }
    async function handleAddToCart(id) {
        const flag = await addToCart(id)
        console.log(flag);

        if (flag) {
            toast.success('Item added successfully')
        } else {
            toast.error('Error adding item')
        }

    }

    function getProdDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: getProdDetails,


    })


    if (isError) {
        return <>
            <div className='flex justify-center items-center'>
                <h1>Error displaying data</h1>
                <h3>{error.message}</h3>
            </div>
        </>
    }
    if (isLoading) {
        return <>
            <div className='flex justify-center'>
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </>
    }
    const prodDetails = data.data.data;

    return (
        <>
            <div className='flex flex-col md:flex-row justify-between items-center px-7 py-10'>
                <div className='p-2  w-72 h-72'>
                    <img src={prodDetails.imageCover} className='w-full h-full' alt={prodDetails.title} />
                </div>
                <div className='md:w-2/3 w-full px-3 py-3'>
                    <h1 className='text-2xl'>{prodDetails.title} <i onClick={() => { handleAddToWishlist(prodDetails.id) }} className={handleWishlistIcon(prodDetails.id) ? 'fa-solid fa-heart cursor-pointer text-red-500'
                        : 'fa-solid text-gray-300 fa-heart  cursor-pointer'}></i></h1>
                    <h1>{prodDetails.description}</h1>
                    <div>
                        <h3 className='text-lg'>{prodDetails.category.name}</h3>
                        <div className='flex justify-between items-center'>
                            <h4>{prodDetails.price}</h4>
                            <h4><i className='fa-solid fa-star me-1 text-yellow-400'></i>{prodDetails.ratingsAverage}</h4>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button onClick={() => { handleAddToCart(prodDetails.id) }} className='bg-green-500 w-2/3 rounded-md hover:bg-green-600 duration-700'>add to cart</button>
                    </div>
                </div>
            </div>
        </>

    )
}
