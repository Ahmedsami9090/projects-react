import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { myAuthContext } from './../../Contexts/AuthContext';




export default function Register() {
  const [respMessage, setrespMessage] = useState(null)
  const registerInfo = useContext(myAuthContext);
  const navigate = useNavigate()
  const myFormik = useFormik({
    initialValues: {
      name: '',
      password: '',
      rePassword: '',
      email: '',
      phone: ''
    },
    onSubmit: (val) => {
      setbtnLoader(true)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', val)
        .then((data) => {
          setrespMessage(data.data.message)
          setisRegistered(true)
          setbtnLoader(false)
          console.log(data);
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }
        ).catch((err) => {
          console.log(err);
          setrespMessage(err.response.data.message)
          console.log(err.response.data.message);
          setbtnLoader(false)
          setisRegistered(true)

        })
    },

    validationSchema: yup.object().shape({
      name: yup.string().max(20, 'name should not exceed 20 letters').min(3, 'name should be at least 3 letters').required('name is required'),
      password: yup.string().max(12, 'password should be maximum 12 characters').min(6, 'password should be minimum 6 characters').required('password is required'),
      rePassword: yup.string().required('please type password again').oneOf([yup.ref('password')]),
      email: yup.string().matches(/^[a-zA-Z0-9._%+-]{1,}@[a-z]{1,}\.[a-z]{2,}$/, 'invalid email format').required('mail is required'),
      phone: yup.string().required('phone is required').matches(/^(20)?01[0125][0-9]{8}$/, 'invalid phone format (01xx xxxx xxx')
    })
  })
  const { setisRegistered, btnLoader, setbtnLoader } = registerInfo

  return (
    <>
      <div className='py-10 px-3 '>
        {respMessage ? <h1 className='bg-red-300 text-lg py-2 mb-3 px-3 rounded-md font-semibold'>{respMessage}</h1> : ''}
        <h1 className='text-5xl text-center font-semibold mt-24'>Register</h1>
        <form className="max-w-md mx-auto mt-16" onSubmit={myFormik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input type="email" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
            {myFormik.errors.email && myFormik.touched.email ? <div>
              <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{myFormik.errors.email}</span></p>
            </div> : ''}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="password" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {myFormik.errors.password && myFormik.touched.password ? <div>
              <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{myFormik.errors.password}</span></p>
            </div> : ''}

          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="password" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
            {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div>
              <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{myFormik.errors.rePassword}</span></p>
            </div> : ''}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
              {myFormik.errors.name && myFormik.touched.name ? <div>
                <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{myFormik.errors.name}</span></p>
              </div> : ''}
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <div className="relative z-0 w-full mb-5 group">
              <input type="tel" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
              {myFormik.errors.phone && myFormik.touched.phone ? <div>
                <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{myFormik.errors.phone}</span></p>
              </div> : ''}
            </div>
          </div>
          <button type="submit" className="text-white bg-green-400 hover:bg-green-600 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-600 hover:transition hover:duration-300">
            {btnLoader ?
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </div>
              : 'Register'}</button>
        </form>
      </div>
    </>
  )
}
