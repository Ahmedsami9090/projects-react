import React from 'react'
import NotFound from '../NotFound/NotFound'


export default function Guard({children}) {
    if(localStorage.getItem('tkn') == null){
        return <>
            <NotFound />
        </>
    }
  return (
    <>
        {children}
    </>
  )
}
