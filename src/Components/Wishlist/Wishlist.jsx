import { useContext } from 'react';
import { mywishlistContext } from '../../Contexts/WishlistContext';
import { Link } from 'react-router-dom';
import { myCartContext } from '../../Contexts/CartContext';
import toast from 'react-hot-toast';

export default function Wishlist() {
    const { wishlistItem, deleteFromWishlist, getWishlist } = useContext(mywishlistContext);
    const { addToCart } = useContext(myCartContext)
    const options = { maximumFractionDigits: 2 }
    async function handleAddToCart(id) {
        const flag = await addToCart(id)
        if (flag) {
            toast.success('Item added to cart successfully')
            deleteFromWishlist(id)
            getWishlist()
        } else {
            toast.error('Error adding item to cart')
        }
    }
    async function handleDeleteFromWishlist(id) {
        const flag = await deleteFromWishlist(id)
        if(flag){
            toast.success('Item deleted from wishlist successfully')
        }else{
            toast.error('Error delete item from wishlist')
        }
    }

    return (
        <div className='grid md:grid-cols-4 lg:grid-cols-6 gap-4 px-5 py-10'>
            {wishlistItem?.map((item) => {
                return <div className='flex flex-col px-3 relative group overflow-hidden'>
                    <Link to={`/details/${item.id}`}>
                        <div className='h-fit'>
                            <div key={item.id} className='px-3'>
                                <img src={item.imageCover} className='w-full h-full' alt="" />
                            </div>
                            <div className='ps-3 pt-2'>
                                <h1 className='text-base'>{item.category.name}</h1>
                                <h2 className='truncate text-xl'>{item.title}</h2>
                                <div className='flex justify-between pe-3 pb-2'>
                                    <h3 className='font-semibold'>{Intl.NumberFormat('en-US', options).format(item.price)}</h3>
                                    <h3 className='font-semibold'><i className='fa-solid fa-star text-yellow-400 me-2'></i>{item.ratingsAverage}</h3>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className='absolute space-y-2 -bottom-24 left-1/2 -translate-x-1/2 group-hover:bottom-1/2 group-hover:translate-y-1/2 duration-500 flex flex-col'>
                    <button onClick={() => { handleAddToCart(item.id) }} className='bg-green-400 px-2 w-full mx-auto py-2 rounded-md hover:bg-green-500 duration-500 '>Add to Cart</button>
                    <button onClick={() => { deleteFromWishlist(item.id) }} className='bg-red-400 px-2 w-full mx-auto py-2 rounded-md hover:bg-red-500 duration-500 '>Remove</button>
                    </div>
                </div>
            })}
        </div>
    )
}
