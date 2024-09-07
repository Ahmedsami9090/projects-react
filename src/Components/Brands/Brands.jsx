import React from 'react'
import { FallingLines } from 'react-loader-spinner'
import useBrands from '../../CustomHooks/useBrands'

export default function Brands() {
    const { data, isLoading, isError, error } = useBrands()
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
    console.log(data.data.data);
    const brands = data.data.data;
    return (
        <div className='grid md:grid-cols-4 lg:grid-cols-6 gap-4 px-5 py-10'>
            {brands.map((brand) => {
                return <>
                    <div key={brand._id} className='flex flex-col px-3 relative group overflow-hidden'>
                        <div className='h-fit'>
                            <div key={brand._id} className='px-3'>
                                <img src={brand.image} className='w-full h-full' alt="" />
                            </div>
                            <div className='ps-3 pt-2 text-center'>
                                <h1 className='text-base'>{brand.name}</h1>
                            </div>
                        </div>
                    </div>
                </>
            })}
        </div>
    )
}
