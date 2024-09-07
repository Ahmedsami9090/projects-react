import React, { useContext, useState } from 'react'
import { Field, useFormik, FormikProvider } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { myCartContext } from '../../Contexts/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Order() {
    const { cartId, totalPrice, displayCartItems, cartItems, deleteAllItems } = useContext(myCartContext)
    const [isClicked, setisClicked] = useState(false)
    const navigate = useNavigate()
    const options = { maximumFractionDigits: 2 }
    const orderFormik = useFormik({
        initialValues: {
            address: '',
            phone: '',
            city: '',
            paymentMethod: ''
        },
        onSubmit: (val) => {
            if (val.paymentMethod == 'cash') {
                console.log('cash');
                axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
                    'shippingAddress': {
                        'details': val.address,
                        'phone': val.phone,
                        'city': val.city
                    }
                }, {
                    headers: {
                        token: localStorage.getItem('tkn')
                    }
                }).then((resp) => {
                    console.log('cash resp ', resp);

                    toast.success('Order created Successfully');
                    orderFormik.resetForm()
                    displayCartItems()
                    console.log(cartItems);
                    setTimeout(() => {
                        navigate('/home')
                    }, 2000)
                }).catch((err) => {
                })
            }
            if (val.paymentMethod == 'online') {
                console.log('visa');
                axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {
                    'shippingAddress': {
                        'details': val.address,
                        'phone': val.phone,
                        'city': val.city
                    }
                }, {
                    headers: {
                        token: localStorage.getItem('tkn')
                    },
                    params: {
                        url: 'http://localhost:5173'
                    }
                }
                ).then((resp) => {
                    setisClicked(false)
                    orderFormik.resetForm()
                    console.log(resp);
                    setTimeout(() => {
                        window.open(resp.data.session.url, '_self')
                    }, 2000)
                    deleteAllItems()

                }).catch((err) => {
                    setisClicked(false)
                    toast.error(err.message)
                    //
                })
            }
        },
        validationSchema: yup.object().shape({
            address: yup.string().min(3, 'name should be more than three letters').matches(/^[a-z A-Z 0-9 .-]{3,}$/, 'special char allowed only (- .)').required('name is required'),
            phone: yup.string().matches(/^(20)?01[0125][0-9]{8}$/, 'Egyptian numbers only').required('phone is required'),
            city: yup.string().matches(/^[a-zA-Z]{3,25}$/, 'letters only allowed').required('city is required')
        })
    })
    return (
        <FormikProvider value={orderFormik}>
            <div className='py-20'>
                <h1 className='text-center font-semibold text-5xl'>Shipping details</h1>
                <h2 className='mt-3 text-center text-xl'>Total Cart: <span className='font-semibold'>{Intl.NumberFormat('en-US', options).format(totalPrice)}</span> EGP</h2>
                <form className="max-w-md mx-auto" onSubmit={orderFormik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" onBlur={orderFormik.handleBlur} onChange={orderFormik.handleChange} value={orderFormik.values.address} name="address" id="address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                        <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">shipping address</label>
                        {orderFormik.errors.address && orderFormik.touched.address ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-400 " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {orderFormik.errors.address}
                            </div>
                        </div> : ''}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="tel" name="phone" onBlur={orderFormik.handleBlur} onChange={orderFormik.handleChange} value={orderFormik.values.phone} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                        {orderFormik.errors.phone && orderFormik.touched.phone ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-400 " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {orderFormik.errors.phone}
                            </div>
                        </div> : ''}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="city" id="city" onBlur={orderFormik.handleBlur} onChange={orderFormik.handleChange} value={orderFormik.values.city} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                        {orderFormik.errors.city && orderFormik.touched.city ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-400 " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {orderFormik.errors.city}
                            </div>
                        </div> : ''}
                    </div>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <div>
                            <Field id='cashOnDelivery' type='radio' name='paymentMethod' value='cash' defaultChecked />
                            <label className='ms-1' htmlFor='cashOnDelivery'>Cash on Delivery</label>
                        </div>
                        <div>
                            <Field id='onlinePayment' type='radio' name='paymentMethod' value='online' />
                            <label className='ms-1' htmlFor='onlinePayment'>Online Payment</label>
                        </div>
                    </div>
                    <button type="submit" onClick={() => { setisClicked(true) }} className="text-white bg-green-500 hover:bg-green-600 duration-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3 ">{isClicked ?
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        : 'Proceed'}</button>
                </form>
            </div>
        </FormikProvider>


    )
}
