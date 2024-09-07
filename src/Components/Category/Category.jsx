import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import useAllCat from '../../CustomHooks/useAllCat'

export default function Category() {
  const {data, isError, isLoading, error} = useAllCat()
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
  if (isError) {
    return <>
      <div className='flex justify-center items-center'>
        <h1>Error displaying data</h1>
        <h3>{error.message}</h3>
      </div>
    </>
  }
  return (

    <div className='grid md:grid-cols-4 lg:grid-cols-6 gap-4 px-5 py-10'>
      {data.data.data.map((cat) => {
        return <>
        <div className=''>
          <div key={cat._id} className='px-3 h-2/3'>
            <img src={cat.image} className='w-full h-full' alt="" />
          </div>
          <div className='ps-3 pt-2 h-1/3'>
            <h1 className='text-base'>{cat.name}</h1>
          </div>
        </div>
      </>
      })}
    </div>
  )
}



