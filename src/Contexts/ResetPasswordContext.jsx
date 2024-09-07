import axios from 'axios';
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast';
export const myResetPassContext = createContext();
export default function ResetPasswordContext({ children }) {
    const [userMail, setuserMail] = useState(null)
    function sendResetCode(val) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', val)
            .then((resp) => {
                toast.success(resp.data.message)
                setuserMail(val.email)
                console.log('usermail 1', userMail)
                return true
            }).catch((err) => {
                toast.error(err.response.data.message)
                return false
            })
    }
    function validateCode(val) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
            'resetCode': val.resetCode
        })
            .then(async (resp) => {
                const flag = await newPassSet(val)
                if(flag){
                    return true
                }else{
                    return false
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                return false
            })
    }
    function newPassSet(val) {
        return axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
            'email': userMail,
            'newPassword': val.newPass
        }).then((res) => {
            toast.success('Password changed successfully')
            return true
        }).catch((error) => {
            toast.error('Please try again')
            return false
        })
    }




    return (

        <myResetPassContext.Provider value={{ userMail, sendResetCode, validateCode }}>
            {children}
        </myResetPassContext.Provider>
    )
}
