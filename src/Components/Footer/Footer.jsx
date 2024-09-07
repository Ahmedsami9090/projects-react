import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className='bg-green-400 px-3 py-20 flex flex-col items-center '>
        <div>
          <h1 className='text-3xl text-center'>Get the FreshCart app</h1>
          <h2 className='text-xl mt-3'>We will send a link to Your phone to download the app</h2>
        </div>
        <form className=" w-full mt-4 flex justify-center">
          <div className="relative w-full md:w-1/4">
            <span className="absolute start-0 bottom-3 text-black">
              <svg className="w-4 h-4 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
              </svg>
            </span>
            <input type="text" id="floating-phone-number" className="block py-2.5 ps-6 pe-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder="" />
            <label htmlFor="floating-phone-number" className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3  origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Phone number</label>
          </div>
        </form>
      </footer>
    </>
  )
}
