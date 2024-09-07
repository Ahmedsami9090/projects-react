import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export const myCartContext = createContext()

export default function CartContext({ children }) {
  const [cartItemNum, setcartItemNum] = useState(0)
  const [cartItems, setcartItems] = useState(null)
  const [totalPrice, settotalPrice] = useState(0)
  const [cartId, setcartId] = useState(null)


  function addToCart(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
      'productId': productId
    }, {
      headers: {
        token: localStorage.getItem('tkn')
      }
    }
    ).then((res) => {
      displayCartItems()
      return true
    })
      .catch((err) => {
        return false
      })
  }

  function displayCartItems() {
    console.log('called');

    axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem('tkn')
      }
    })
      .then((res) => {
        console.log('display ', res);
        setcartId(res.data.data._id)
        setcartItemNum(res.data.numOfCartItems);
        setcartItems(res.data.data.products)
        settotalPrice(res.data.data.totalCartPrice)
      })
      .catch((err) => {
        console.log(err);
        setcartId(null)
        setcartItemNum(0);
        setcartItems(null)
        settotalPrice(0)
      })
  }
  useEffect(() => {
    displayCartItems()
  }, [])

  function updateCount(productId, newCount) {
    axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      'count': newCount
    }, {
      headers: {
        token: localStorage.getItem('tkn')
      }
    }).then((res) => {
      console.log(res)
      setcartItems(res.data.data.products)
      settotalPrice(res.data.data.totalCartPrice)
      setcartItemNum(res.data.numOfCartItems);
      toast.success('Count updated successfully')
    }).catch((err) => {
      console.log(err);
      toast.error('Error updating count')

    })
  }
  function deleteItem(productId) {
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: {
        token: localStorage.getItem('tkn')
      }
    }).then((res) => {
      setcartItems(res.data.data.products)
      settotalPrice(res.data.data.totalCartPrice)
      setcartItemNum(res.data.numOfCartItems);
      toast.success('Item removed successfully')
    }).catch((err) => {
      console.log(err);
      toast.error('Error Removing Item')

    })
  }
  function deleteAllItems(){
    axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
      headers: {
        token: localStorage.getItem('tkn')
      }
    }).then((resp)=>{
        console.log(resp.message);
        
    }).catch((err)=>{
      console.log(err.message);
      
    })
  }

  return (
    <myCartContext.Provider value={{
      addToCart,
      displayCartItems,
      updateCount,
      deleteItem,
      deleteAllItems,
      cartId,
      cartItemNum,
      cartItems,
      totalPrice
    }}>
      {children}
    </myCartContext.Provider>
  )
}

