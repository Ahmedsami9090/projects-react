import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export const mywishlistContext = createContext();
export default function WishlistContext({ children }) {
    const [wishlistItem, setWishlistItem] = useState(null)
    function getWishlist() {
        axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }).then((resp) => {
            // console.log(resp.data.data);
            setWishlistItem(resp.data.data);
        }).catch((err) => {
            console.log(err);
            // toast.error('Error loading wishlist')
        })
    }
    useEffect(() => {
        getWishlist()
    }, [])
    function deleteFromWishlist(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }).then((resp) => {
            console.log(resp);
            getWishlist()
            return true

        }).catch((err) => {
            console.log(err);
            return false
        })
    }
    function addToWishlist(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist/`, {
            "productId": id
        }, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }).then((resp) => {
            console.log(resp);
            getWishlist()
            return true

        }).catch((err) => {
            console.log();
            return false
        })
    }
    function handleWishlistIcon(id) {
        let flag = false;
        if(wishlistItem){
            for (let j = 0; j < wishlistItem.length; j++) {
                if (wishlistItem[j].id == id) {
                    flag = true
                }
            }
            return flag
        }
        
    }


    return (
        <mywishlistContext.Provider value={{ wishlistItem, deleteFromWishlist, getWishlist, addToWishlist, handleWishlistIcon }}>
            {children}
        </mywishlistContext.Provider>
    )
}
