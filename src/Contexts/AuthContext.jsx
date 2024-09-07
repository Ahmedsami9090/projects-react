import React, { createContext, useEffect, useState } from 'react'

export const myAuthContext = createContext()
export default function AuthContext({ children }) {
    const [isRegistered, setisRegistered] = useState(false)
    const [isAuthUser, setisAuthUser] = useState(false)
    const [token, setToken] = useState(null)
    const [btnLoader, setbtnLoader] = useState(false)

    useEffect(()=>{
        const userTkn = localStorage.getItem('tkn');
        if(userTkn != null){
            setToken(userTkn)
        }
        
        
    }, [])
    return (
        <myAuthContext.Provider value={{isRegistered, setisRegistered, isAuthUser, setisAuthUser, token, setToken, btnLoader, setbtnLoader}}>
            {children}
        </myAuthContext.Provider>

    )
}
